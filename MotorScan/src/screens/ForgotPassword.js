import React, { useState } from "react";
import { Alert, StyleSheet, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { sendPasswordResetEmail } from "@firebase/auth";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const auth = FIREBASE_AUTH;

const ForgotPassword = () => {
	const { control, handleSubmit } = useForm();
	const nav = useNavigation();
	const [loading, setLoading] = useState(false);

	const onSendPressed = async (data) => {
		if (loading) {
			return;
		}

		setLoading(true);
		try {
			await sendPasswordResetEmail(auth, data.email);
			Alert.alert("Password reset email sent!");
		} catch (error) {
			Alert.alert("Error:", error.message);
		} finally {
			setLoading(false);
		}
	};

	const onResendPressed = async (data) => {
		if (loading) {
			return;
		}

		setLoading(true);
		try {
			await sendPasswordResetEmail(auth, data.email);
			Alert.alert("Password reset email sent!");
		} catch (error) {
			Alert.alert("Error:", error.message);
		} finally {
			setLoading(false);
		}
	};

	const onSignInPressed = () => {
		nav.navigate("SignIn");
	};

	return (
		<View style={styles.root}>
			<Text style={styles.title}>Reset Password</Text>

			<CustomInput
				name="email"
				placeholder="Email"
				control={control}
				rules={{ required: "Email is required" }}
			/>

			<View style={{ marginBottom: 5 }}>
				<Text></Text>
			</View>

			<CustomButton text={loading ? "Loading..." : "Send"} onPress={handleSubmit(onSendPressed)} />
			<CustomButton
				text={loading ? "Loading..." : "Resend Link"}
				onPress={handleSubmit(onResendPressed)}
				type="SECONDARY"
			/>
			<CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#051C60",
		margin: 15,
	},
	text: {
		color: "gray",
		marginVertical: 20,
	},
	link: {
		color: "#FDB075",
	},
});

export default ForgotPassword;
