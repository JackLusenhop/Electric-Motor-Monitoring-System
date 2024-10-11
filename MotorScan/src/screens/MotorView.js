import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { doc, setDoc, collection, getDocs, onSnapshot } from "firebase/firestore";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const MotorView = ({ route }) => {
	//make this display created values

	const motorid = route.params.id;
	const [motorData, setMotorData] = useState({});

	useEffect(() => {
        // Create a listener for the motors collection
        const unsubscribe = onSnapshot(collection(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid, "motors", motorid, "data"), (dataSnap) => {
            if (dataSnap.docs.length === 0)
			{
				setMotorData({airflow: "N/A", humidity: "N/A", power: "N/A", temp: "N/A", vibration: "N/A"});

			}
			else
			{
				console.log(dataSnap.docs);
				const data = dataSnap.docs[0].data();
				setMotorData({airflow: data.Airflow + " CFM", humidity: data.Humidity + "%", power: data.Power + "W", temp: data.Temperature + "°C", vibration: data.Vibration});
			}
			
        }, (error) => {
            console.error("Error fetching data: ", error);
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);


	return (
		<View style={styles.container}>
				<Text style={styles.text}>Power: {motorData.power}</Text>
				<Text style={styles.text}>Temperature: {motorData.temp}</Text>
				<Text style={styles.text}>Humidity: {motorData.humidity}</Text>
				<Text style={styles.text}>Airflow: {motorData.airflow}</Text>
				<Text style={styles.text}>Vibration: {motorData.vibration}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingTop: 80,
	},
	text: {
		fontSize: 24,
		marginVertical: 5,
	},
});

export default MotorView;
