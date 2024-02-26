import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	useWindowDimensions,
	Alert,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Logo from "../../assets/images/pem-logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const auth = FIREBASE_AUTH;

const SignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { height } = useWindowDimensions();
	const nav = useNavigation();
	const [loading, setLoading] = useState(false);

	const onSignInPressed = async (data) => {
		if (loading) {
			return;
		}

		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
		} catch (error) {
			if (error.code === "auth/invalid-email") {
				Alert.alert("Sign in failed ", "Email is invalid. Please try again.");
			} else if (error.code === "auth/invalid-login-credentials")
				Alert.alert("Sign in failed ", "Invalid credentials. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const onForgotPasswordPressed = () => {
		nav.navigate("ForgotPassword");
	};

	const onSignUpPress = () => {
		nav.navigate("SignUp");
	};

	return (
		<View style={styles.root}>
			<Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

			<CustomInput
				name="email"
				placeholder="Email"
				control={control}
				rules={{ required: "Email is required" }}
			/>

			<CustomInput
				name="password"
				placeholder="Password"
				control={control}
				secureTextEntry={true}
				rules={{ required: "Password is required" }}
			/>

			<View style={{ marginBottom: 5 }}>
				<Text></Text>
			</View>

			<CustomButton
				text={loading ? "Loading..." : "Sign In"}
				onPress={handleSubmit(onSignInPressed)}
			/>
			<CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
			<CustomButton
				text="Don't have an account? Create one"
				onPress={onSignUpPress}
				type="TERTIARY"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: "center",
		padding: 20,
	},
	logo: {
		width: "70%",
		maxWidth: 300,
		maxHeight: 200,
	},
});

export default SignIn;
