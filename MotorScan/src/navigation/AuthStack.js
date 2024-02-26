import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import TermsOfUse from "../screens/TermsOfUse";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="SignIn" component={SignIn} />
				<Stack.Screen name="SignUp" component={SignUp} />
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				<Stack.Screen name="TermsOfUse" component={TermsOfUse} />
				<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthStack;
