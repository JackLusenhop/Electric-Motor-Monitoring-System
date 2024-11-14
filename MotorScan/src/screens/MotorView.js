import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity 
} from 'lucide-react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const MotorView = ({ route }) => {
  const motorId = route.params.id;
  const [motorData, setMotorData] = useState({
    power: 'N/A',
    temp: 'N/A',
    humidity: 'N/A',
    airflow: 'N/A',
    vibration: 'N/A'
  });

  useEffect(() => {
    // Set up real-time listener for motor data
    const unsubscribe = onSnapshot(
      collection(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid, "motors", motorId, "data"),
      (dataSnap) => {
        if (dataSnap.docs.length === 0) {
          setMotorData({
            power: 'N/A',
            temp: 'N/A',
            humidity: 'N/A',
            airflow: 'N/A',
            vibration: 'N/A'
          });
        } else {
          const data = dataSnap.docs[0].data();
          setMotorData({
            power: data.Power + " W",
            temp: data.Temperature + " °C",
            humidity: data.Humidity + " %",
            airflow: data.Airflow + " CFM",
            vibration: data.Vibration
          });
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, [motorId]);

  const MetricCard = ({ title, value, unit, Icon, color }) => (
    <View style={[styles.card, { flex: 1, minWidth: Dimensions.get('window').width > 600 ? '30%' : '45%' }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Icon size={20} color={color} />
        </View>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );

  // Extract numerical values for display
  const powerValue = motorData.power.split(' ')[0];
  const tempValue = motorData.temp.split(' ')[0];
  const humidityValue = motorData.humidity.split(' ')[0];
  const airflowValue = motorData.airflow.split(' ')[0];
  const vibrationValue = motorData.vibration;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Motor Status</Text>
          <Text style={styles.subtitle}>Real-time performance metrics</Text>
        </View>
        
        <View style={styles.metricsContainer}>
          <MetricCard
            title="Power Output"
            value={powerValue}
            unit="W"
            Icon={Zap}
            color="#3b82f6"
          />
          
          <MetricCard
            title="Temperature"
            value={tempValue}
            unit="°C"
            Icon={Thermometer}
            color="#ef4444"
          />
          
          <MetricCard
            title="Humidity"
            value={humidityValue}
            unit="%"
            Icon={Droplets}
            color="#06b6d4"
          />
          
          <MetricCard
            title="Airflow"
            value={airflowValue}
            unit="CFM"
            Icon={Wind}
            color="#8b5cf6"
          />
          
          <MetricCard
            title="Vibration"
            value={vibrationValue}
            unit="Hz"
            Icon={Activity}
            color="#f59e0b"
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Motor Information</Text>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValueSuccess}>Operational</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Runtime</Text>
              <Text style={styles.infoValue}>127 hours</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Maintenance</Text>
              <Text style={styles.infoValue}>2024-03-15</Text>
            </View>
            <View style={[styles.infoRow, styles.noBorder]}>
              <Text style={styles.infoLabel}>Serial Number</Text>
              <Text style={styles.infoValue}>PEM-2024-0892</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#F5F5F5',
	},
	content: {
	  padding: 16,
	},
	header: {
	  marginBottom: 24,
	},
	title: {
	  fontSize: 28,
	  fontWeight: 'bold',
	  color: '#1D1D1D',
	  marginBottom: 8,
	},
	subtitle: {
	  fontSize: 16,
	  color: '#666666',
	},
	metricsContainer: {
	  flexDirection: 'row',
	  flexWrap: 'wrap',
	  marginHorizontal: -8,
	},
	card: {
	  backgroundColor: 'white',
	  borderRadius: 12,
	  padding: 16,
	  margin: 8,
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 2,
	  },
	  shadowOpacity: 0.1,
	  shadowRadius: 3,
	  elevation: 3,
	},
	cardHeader: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  alignItems: 'center',
	  marginBottom: 16,
	},
	cardTitle: {
	  fontSize: 14,
	  color: '#666666',
	  fontWeight: '500',
	},
	iconContainer: {
	  width: 32,
	  height: 32,
	  borderRadius: 8,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	valueContainer: {
	  flexDirection: 'row',
	  alignItems: 'baseline',
	},
	value: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  color: '#1D1D1D',
	},
	unit: {
	  fontSize: 14,
	  color: '#666666',
	  marginLeft: 4,
	},
	infoCard: {
	  backgroundColor: 'white',
	  borderRadius: 12,
	  padding: 24,
	  marginTop: 24,
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 2,
	  },
	  shadowOpacity: 0.1,
	  shadowRadius: 3,
	  elevation: 3,
	},
	infoTitle: {
	  fontSize: 18,
	  fontWeight: '600',
	  color: '#1D1D1D',
	  marginBottom: 16,
	},
	infoContent: {
	  gap: 16,
	},
	infoRow: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  paddingBottom: 12,
	  borderBottomWidth: 1,
	  borderBottomColor: '#F0F0F0',
	},
	noBorder: {
	  borderBottomWidth: 0,
	  paddingBottom: 0,
	},
	infoLabel: {
	  fontSize: 14,
	  color: '#666666',
	},
	infoValue: {
	  fontSize: 14,
	  color: '#1D1D1D',
	  fontWeight: '500',
	},
	infoValueSuccess: {
	  fontSize: 14,
	  color: '#22C55E',
	  fontWeight: '500',
	},
  });

export default MotorView;