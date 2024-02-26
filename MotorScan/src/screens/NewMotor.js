import React, { useState } from "react";
import { Alert, View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const NewMotor = () => {
	const { control, handleSubmit, setValue } = useForm();
	const [loading, setLoading] = useState(false);

	const nav = useNavigation();

	const onAddPressed = async (data) => {
		const motorName = data.motorName;
		const motorSerial = data.motorSerial;
		const location = data.location;

		if (loading) {
			return;
		}

		setLoading(true);
		try {
			const user = auth.currentUser;

			if (user) {
				const motorsCollectionRef = collection(db, "users", user.uid, "motors");

				// Check if the motor name already exists in the 'motors' subcollection
				const querySnapshot = await getDocs(
					query(motorsCollectionRef, where("motorName", "==", data.motorName))
				);

				if (!querySnapshot.empty) {
					// Motor name already exists
					Alert.alert(
						"Error",
						"Motor with this name already exists. Please choose a different name."
					);
					return;
				}

				// Add the motor details to the 'motors' subcollection
				await addDoc(motorsCollectionRef, {
					motorName,
					motorSerial,
					location,
				});

				Alert.alert("Motor Added", "Motor details added successfully!");

				// Manually clear the form fields
				setValue("motorName", "");
				setValue("motorSerial", "");
				setValue("location", "");

				nav.goBack();
			} else {
				Alert.alert("Error", "User not authenticated. Please sign in.");
			}
		} catch (error) {
			console.error("Error adding motor details:", error);
			Alert.alert("Error", "Failed to add motor details. Please try again.");
		} finally {
			setLoading(false);
		}
	};

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
		<ScrollView
			contentContainerStyle={[
				styles.root,
				{ paddingVertical: containerPadding(), paddingHorizontal: 24 },
			]}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.header}>
				<Text style={styles.title}>Add New Motor</Text>
			</View>

			<CustomInput
				name="motorName"
				placeholder="Motor Name"
				control={control}
				rules={{ required: "Motor Name is required" }}
			/>

			<CustomInput name="motorSerial" placeholder="Motor Serial Number" control={control} />

			<CustomInput name="location" placeholder="Location" control={control} />

			<View style={{ marginBottom: 5 }}>
				<Text></Text>
			</View>

			<CustomButton
				text={loading ? "Loading..." : "Add Motor"}
				onPress={handleSubmit(onAddPressed)}
			/>
		</ScrollView>
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
});

export default NewMotor;
