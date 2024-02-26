import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Settings from "../screens/Settings";
import TermsOfUse from "../screens/TermsOfUse";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="TermsOfUse" component={TermsOfUse} />
			<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
		</Stack.Navigator>
	);
};

export default SettingStack;
