import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Card = ({ motorName, location, status }) => {
	const nav = useNavigation();

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={() => nav.navigate("MotorView")}
		>
			<View style={styles.card}>
				<Text style={styles.title}>Motor Name</Text>
				<Text style={styles.content}>Location: Sector A</Text>
				<Text style={styles.content}>Status: Good</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		// paddingHorizontal: 24,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 16,
		margin: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	content: {
		fontSize: 16,
		marginBottom: 12,
	},
});

export default Card;
