import React, { useState, useEffect } from "react";
import { Alert, View, TextInput, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import MotorCardTemp from "../navigation/MotorCardTemp";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const NewMotor = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [name, setName] = useState("");

	const nav = useNavigation();

	const ontempbuttonpressed = () => {
		// nav.navigate("MotorCardTemp");
		nav.navigate("MotorView");
	};

	useEffect(() => {
		const fetchUserName = async () => {
			const docRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setName(docSnap.data().firstName);
				console.log("Document data:", docSnap.data());
			} else {
				console.log("No such document!");
			}
		};

		const fetchMotors = async () => {};

		fetchUserName();
		fetchMotors();
	}, []);
	const containerPadding = () => {
		const screenWidth = Dimensions.get("window").width;

		if (Platform.OS === "ios") {
			if (Platform.isPad) {
				return 40; // For iPad
			} else if (screenWidth <= 375) {
				return 30; // For small iOS screens
			} else {
				return 60; // For other iOS screens
			}
		} else {
			return 20; // For Android
		}
	};

	return (
		<View
			style={[styles.root, { paddingVertical: containerPadding(), paddingHorizontal: 24 }]}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.header}>
				<Text style={styles.title}>Dashboard</Text>
			</View>

			<Text>Motors List</Text>

			{/* <View style={styles.searchBar}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search"
					placeholderTextColor="#A9A9A9"
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View> */}

			{/* ScrollView & render all the motors list */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<MotorCardTemp />
				<MotorCardTemp />
				<MotorCardTemp />
				<MotorCardTemp />
				<MotorCardTemp />
				<MotorCardTemp />
				<MotorCardTemp />
			</ScrollView>

			{/* <CustomButton text="Temp motor card" onPress={ontempbuttonpressed} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 24,
	},
	header: {
		marginBottom: 12,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		color: "#1D1D1D",
		marginBottom: 6,
	},
	searchBar: {
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		marginTop: 20,
		marginBottom: 10,
		width: "100%",
	},
	searchInput: {
		flex: 1,
		height: 40,
		marginLeft: 10,
		textAlign: "left",
	},
});

export default NewMotor;
