import React, { useEffect } from "react";
import { View, Text, Platform, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useIsKeyboardShown } from "../utils/KeyboardHelper";
import DashboardStack from "./DashboardStack";
import NewMotor from "../screens/NewMotor";
import SettingStack from "./SettingStack";

const Tab = createBottomTabNavigator();

const UserStack = () => {
	const isKeyboardShown = useIsKeyboardShown();

	const screenOptions = {
		tabBarShowLabel: false,
		headerShown: false,
		tabBarHideOnKeyboard: true,
	};

	const dashboardStyle = {
		tabBarIcon: ({ focused }) => {
			return (
				<View style={{ alignItems: "center" }}>
					<MaterialIcon name="dashboard" size={24} color={focused ? "#16247d" : "#111"} />
					<Text
						style={{
							fontSize: 12,
							color: "#16247d",
							width: Dimensions.get("window").width > 600 ? 65 : "auto",
						}}
					>
						Dashboard
					</Text>
				</View>
			);
		},
	};

	const newMotorStyle = {
		tabBarIcon: ({ focused }) => {
			return (
				<View
					style={{
						// top: Platform.OS === "ios" ? -10 : -20,
						// width: Platform.OS === "ios" ? 50 : 60,
						// height: Platform.OS === "ios" ? 50 : 60,
						// borderRadius: Platform.OS === "ios" ? 25 : 30,
						top: -20,
						width: 60,
						height: Platform.OS == "android" && isKeyboardShown ? 0 : 60,
						borderRadius: 25,

						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#007aff",
					}}
				>
					<FontAwesome name="plus" size={24} color="#fff" />
				</View>
			);
		},
	};

	const settingStyle = {
		tabBarIcon: ({ focused }) => {
			return (
				<View style={{ alignItems: "center" }}>
					<FontAwesome name="cog" size={24} color={focused ? "#16247d" : "#111"} />
					<Text
						style={{
							fontSize: 12,
							color: "#16247d",
							width: Dimensions.get("window").width > 600 ? 50 : "auto",
						}}
					>
						Settings
					</Text>
				</View>
			);
		},
	};

	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen name="DashboardStack" component={DashboardStack} options={dashboardStyle} />
				<Tab.Screen name="NewMotor" component={NewMotor} options={newMotorStyle} />
				<Tab.Screen name="SettingStack" component={SettingStack} options={settingStyle} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default UserStack;
