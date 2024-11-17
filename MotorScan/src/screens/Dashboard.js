import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { Power, AlertTriangle } from 'lucide-react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config/FirebaseConfig';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [motorList, setMotorList] = useState([]);
  const [motorStats, setMotorStats] = useState({
	total: 0,
	warnings: 0,
	errors: 0
  });
  const nav = useNavigation();

  // Get greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Fetch user data and motors
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const docRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().firstName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();

// Set up real-time listener for motors and their data
const unsubscribe = onSnapshot(
	collection(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid, "motors"), 
	async (motorSnap) => {
	  const motors = [];
	  let warnings = 0;
	  let errors = 0;

	  // Process each motor
	  for (const doc of motorSnap.docs) {
		const motor = doc.data();
		
		// Get the latest data for this motor
		const dataSnap = await getDocs(
		  collection(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid, "motors", doc.id, "data")
		);

		let status = "Operational";
		
		if (dataSnap.docs.length > 0) {
		  const data = dataSnap.docs[0].data();
		  
		  // Check temperature threshold (example thresholds)
		  if (data.Temperature > 50) {
			status = "Error";
			errors++;
		  } else if (data.Temperature > 40) {
			status = "Warning";
			warnings++;
		  }
		  
		  // Check vibration threshold
		  if (data.Vibration > 50) {
			status = "Error";
			errors++;
		  } else if (data.Vibration > 40) {
			status = "Warning";
			warnings++;
		  }
		}

		motors.push({
		  id: doc.id,
		  location: motor.location,
		  name: motor.motorName,
		  serial: motor.motorSerial,
		  status: status
		});
	  }

	  setMotorList(motors);
	  setMotorStats({
		total: motors.length,
		warnings: warnings,
		errors: errors
	  });
	}
  );

  return () => unsubscribe();
}, []);


  const MotorCard = ({ id, motorName, location, serialNumber, status  }) => {
    const isWarning = status === "Warning";
    const isError = status === "Error";
    
    return (
      <TouchableOpacity
        style={styles.motorCard}
        onPress={() => nav.navigate("MotorView", { id, status })}
        activeOpacity={0.7}
      >
        <View style={styles.motorCardHeader}>
          <View style={styles.motorIcon}>
            <Power size={20} color="#3b82f6" />
          </View>
          <View style={[
            styles.statusIndicator,
            isWarning && styles.statusWarning,
            isError && styles.statusError
          ]} />
        </View>
        
        <Text style={styles.motorName}>{motorName}</Text>
        <Text style={styles.motorLocation}>{location}</Text>
        <Text style={styles.motorLocation}>Serial: {serialNumber}</Text>
        
        <View style={styles.motorFooter}>
          <Text style={[
            styles.statusText,
            isWarning && styles.statusTextWarning,
            isError && styles.statusTextError
          ]}>
            {status}
          </Text>
          {(isWarning || isError) && (
            <AlertTriangle 
              size={16} 
              color={isError ? "#ef4444" : "#f59e0b"}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const QuickStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{motorStats.total}</Text>
        <Text style={styles.statLabel}>Total Motors</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={[styles.statValue, motorStats.warnings > 0 && styles.warningText]}>
          {motorStats.warnings}
        </Text>
        <Text style={styles.statLabel}>Warnings</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={[styles.statValue, motorStats.errors > 0 && styles.errorText]}>
          {motorStats.errors}
        </Text>
        <Text style={styles.statLabel}>Errors</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
        </View>

        <QuickStats />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Motors</Text>
        </View>

        <View style={styles.motorGrid}>
          {motorList.map((motor) => (
            <MotorCard
              key={motor.id}
              id={motor.id}
              motorName={motor.name}
              location={motor.location}
              serialNumber={motor.serial}
              status={motor.status}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1D',
  },
  motorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  motorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: Dimensions.get('window').width > 600 ? '30%' : '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  motorCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  motorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  statusWarning: {
    backgroundColor: '#f59e0b',
  },
  statusError: {
    backgroundColor: '#ef4444',
  },
  motorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1D',
    marginBottom: 4,
  },
  motorLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  motorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#22C55E',
    marginRight: 4,
  },
  statusTextWarning: {
    color: '#f59e0b',
  },
  statusTextError: {
    color: '#ef4444',
  },
  warningText: {
    color: '#f59e0b',
  },
  errorText: {
    color: '#ef4444',
  },
});

export default Dashboard;