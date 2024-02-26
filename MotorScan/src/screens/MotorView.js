import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MotorView = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Power: 150W</Text>
			<Text style={styles.text}>Temperature: 25°C</Text>
			<Text style={styles.text}>Humidity: 50%</Text>
			<Text style={styles.text}>Airflow: 120 CFM</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	text: {
		fontSize: 18,
		marginVertical: 5,
	},
});

export default MotorView;
