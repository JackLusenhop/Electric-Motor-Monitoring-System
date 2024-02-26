import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import MotorCardTemp from "./MotorCardTemp";
import MotorView from "../screens/MotorView";

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Dashboard" component={Dashboard} />
			<Stack.Screen name="MotorCardTemp" component={MotorCardTemp} />
			<Stack.Screen name="MotorView" component={MotorView} />
		</Stack.Navigator>
	);
};

export default DashboardStack;
