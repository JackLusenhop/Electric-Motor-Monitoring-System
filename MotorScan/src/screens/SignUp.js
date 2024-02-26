import React, { useState } from "react";
import { Alert, StyleSheet, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const SignUp = () => {
	const { control, handleSubmit, watch } = useForm();
	const pwd = watch("password");
	const nav = useNavigation();
	const [loading, setLoading] = useState(false);

	const onRegisterPressed = async (data) => {
		console.log(data);
		const email = data.email;
		const password = data.password;
		const firstName = data.firstName;
		const lastName = data.lastName;

		if (loading) {
			return;
		}

		setLoading(true);
		try {
			const current_user = await createUserWithEmailAndPassword(auth, email, password);
			await sendEmailVerification(current_user.user);

			await setDoc(doc(db, "users", current_user.user.uid), {
				email,
				firstName,
				lastName,
			});
		} catch (error) {
			Alert.alert("Something went wrong", error.message);
		} finally {
			setLoading(false);
		}
	};

	const registerUser = async (email, password, firstName, lastName) => {
		await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firebase
					.auth()
					.currentUser.sendEmailVerification({
						handleCodeInApp: true,
						url: "",
					})
					.then(() => {
						alert("Verification email sent");
					})
					.catch((error) => {
						alert(error.message);
					})
					.then(() => {
						firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
							firstName,
							lastName,
							email,
						});
					})
					.catch((error) => {
						alert(error.message);
					});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const onSignInPressed = () => {
		nav.navigate("SignIn");
	};

	const onTOUPressed = () => {
		nav.navigate("TermsOfUse");
	};

	const onPrivacyPressed = () => {
		nav.navigate("PrivacyPolicy");
	};

	return (
		<ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
			<Text style={styles.title}>Create an Account</Text>

			<CustomInput
				name="firstName"
				placeholder="First Name"
				autoCapitalize={true}
				control={control}
				rules={{ required: "First Name is required" }}
			/>

			<CustomInput
				name="lastName"
				placeholder="Last Name"
				autoCapitalize={true}
				control={control}
				rules={{ required: "Last Name is required" }}
			/>

			<CustomInput
				name="email"
				placeholder="Email"
				control={control}
				rules={{
					required: "Email is required",
					pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
				}}
			/>

			<CustomInput
				name="password"
				placeholder="Password"
				control={control}
				secureTextEntry={true}
				rules={{
					required: "Password is required",
					minLength: { value: 6, message: "Password should at least be 6 characters long" },
				}}
			/>

			<CustomInput
				name="password-repeat"
				placeholder="Repeat Password"
				control={control}
				secureTextEntry={true}
				rules={{
					required: "Password is required",
					validate: (value) => value === pwd || "Password do not match",
				}}
			/>

			{/* <View style={{ marginBottom: 5 }}>
				<Text></Text>
			</View> */}

			<Text style={styles.text}>
				By registering, you confirm that you accept our{" "}
				<Text style={styles.link} onPress={onTOUPressed}>
					Terms of Use
				</Text>{" "}
				and{" "}
				<Text style={styles.link} onPress={onPrivacyPressed}>
					Privacy Policy
				</Text>
			</Text>

			<CustomButton
				text={loading ? "Loading..." : "Register"}
				onPress={handleSubmit(onRegisterPressed)}
			/>
			<CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" />
		</ScrollView>
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

export default SignUp;
