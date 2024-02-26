import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const CustomInput = ({
	name,
	control,
	placeholder,
	secureTextEntry,
	autoCapitalize = false,
	rules = {},
}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View style={[styles.container, { borderColor: error ? "red" : "#E8E8E8" }]}>
						<TextInput
							placeholder={placeholder}
							value={value}
							onChangeText={onChange}
							secureTextEntry={secureTextEntry}
							autoCapitalize={autoCapitalize ? "sentences" : "none"}
							autoCorrect={false}
							onBlur={onBlur}
							style={styles.input}
						/>
					</View>
					{error && (
						<Text style={{ color: "red", alignSelf: "stretch" }}>{error.message || "Error"}</Text>
					)}
				</>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: "100%",

		borderColor: "#E8E8E8",
		borderWidth: 1,
		borderRadius: 5,

		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
	input: {},
});

export default CustomInput;
