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
import { LineChart } from "react-native-chart-kit";
import { Dropdown } from 'react-native-element-dropdown';

const MotorView = ({ route }) => {
  const motorId = route.params.id;
  const status = route.params.status;
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

  // dummy graph data 
  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const temps = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  const powers = [300, 301, 302, 303, 304, 305, 306, 307, 308, 309];
  const humidities = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79];
  const airflows = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139];
  const vibrations = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

  const [dropValy, setDropValy] = useState(null);
  const [dropValx, setDropValx] = useState(null);
  const [unit, setUnit] = useState('°C"');
  const [datay, setDatay] = useState(temps);
  const [datax, setDatax] = useState(times);

  useEffect(() => {
    if (dropValx === "Temperature") {
      setDatax(temps);
    } else if (dropValx === "Power") {
      setDatax(powers);
    } else if (dropValx === "Humidity") {
      setDatax(humidities);
    } else if (dropValx === "Airflow") {
      setDatax(airflows);
    } else if (dropValx === "Vibration") {
      setDatax(vibrations);
    } else if (dropValx === "Time") {
      setDatax(times);
    }
  }, [dropValx]);

  useEffect(() => {
    if (dropValy === "Temperature") {
      setUnit("°C");
      setDatay(temps);
    } else if (dropValy === "Power") {
      setUnit("W");
      setDatay(powers);
    } else if (dropValy === "Humidity") {
      setUnit("%");
      setDatay(humidities);
    } else if (dropValy === "Airflow") {
      setUnit("CFM");
      setDatay(airflows);
    } else if (dropValy === "Vibration") {
      setUnit("Hz");
      setDatay(vibrations);
    } else if (dropValy === "Time") {
      setUnit("s");
      setDatay(times);
    }else {
      setUnit("");
    }
  }, [dropValy]);
  //const [isFocus, setIsFocus] = useState(false);
  const dropdownItems = [
    {label: "Time", value: 'Time'},
    {label: "Temperature", value: 'Temperature'},
    {label: "Power", value: 'Power'},
    {label: "Humidity", value: 'Humidity'},
    {label: "Airflow", value: 'Airflow'},
    {label: "Vibration", value: 'Vibration'},
  ];

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
              <Text style={(status === "Operational" ? styles.infoValueSuccess : (status === "Warning" ? styles.infoValueWarning : styles.infoValueError))}>{status}</Text>
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

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Graph</Text>
        

        <View style={styles.infoContent}>

          <View style={{padding: 10}}>
            <Text style={{textDecorationLine: "underline", marginBottom: 10}}>X-axis</Text>
            <Dropdown
              style={styles.dropdown}
              itemContainerStyle={styles.itemContainerStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={dropdownItems}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Time"
              value={dropValx}
              onChange={item => {
                setDropValx(item.value);
              }}
            />
          </View>
          
          <View style={{padding: 10, marginBottom: 10}}>
            <Text style={{textDecorationLine: "underline", marginBottom: 10}}>Y-axis</Text>
            <Dropdown
            style={styles.dropdown}
            itemContainerStyle={styles.itemContainerStyle}
            itemTextStyle={styles.itemTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownItems}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Temperature"
            value={dropValy}
            onChange={item => {
              setDropValy(item.value);
            }}
          />
          </View>

          <LineChart
            data={{
              labels: datax,
              datasets: [
                {
                  data: datay
                }
              ]
            }}
            width={Dimensions.get("window").width * 0.8}
            height={200}
            yAxisSuffix={unit} //units
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              //decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              /*style: {
                borderRadius: 16
              },
              }
              /*propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }*/
            }}
          />
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
  infoValueWarning: {
    fontSize: 14,
	  color: '#f59e0b',
	  fontWeight: '500',
  },
  infoValueError: {
    fontSize: 14,
	  color: '#ef4444',
	  fontWeight: '500',
  },
  dropdown: {
    height: 30,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  itemContainerStyle: {
    height: 50,
    padding: 1,
  },
  itemTextStyle: {
    fontSize: 10,
  }
  });

export default MotorView;