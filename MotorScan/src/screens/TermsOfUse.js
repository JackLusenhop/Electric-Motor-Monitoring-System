import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

const TermsOfUse = () => {
	const nav = useNavigation();

	const onClosePressed = () => {
		nav.goBack();
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Terms of Use</Text>
			<Text style={styles.date}>Last Updated: September 25, 2023</Text>

			<Text style={styles.text}>Welcome to MotorScan!</Text>

			<Text style={styles.text}>
				These Terms of Use ("Terms") govern your access to and use of [Your App Name] (the "App"),
				including any content, functionality, and services offered by the App. By accessing or using
				the App, you agree to comply with and be bound by these Terms. If you do not agree to these
				Terms, please do not use the App.
			</Text>

			<Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
			<Text style={styles.text}>
				By accessing or using the App, you affirm that you are of legal age and have the authority
				to enter into these Terms. If you are accessing or using the App on behalf of an entity, you
				represent and warrant that you have the authority to bind that entity to these Terms.
			</Text>

			<Text style={styles.sectionTitle}>2. Account Registration</Text>
			<Text style={styles.text}>
				2.1 User Information: To use the App, you may be required to create an account. When
				registering, you will be asked to provide accurate and up-to-date information, including
				your username, name, email address, and password. You are responsible for maintaining the
				confidentiality of your account information and for all activities that occur under your
				account.
			</Text>
			<Text style={styles.text}>
				2.2 Account Security: You agree to notify us immediately of any unauthorized access to or
				use of your account or any other breach of security. We reserve the right to suspend or
				terminate your account if we suspect unauthorized use or access.
			</Text>

			<Text style={styles.sectionTitle}>3. Use of the App</Text>
			<Text style={styles.text}>
				3.1 Electric Motors Monitoring: The App is designed to provide a monitoring system for
				electric motors. You can use the App to monitor the status and performance of your connected
				electric motors.
			</Text>
			<Text style={styles.text}>
				3.2 Data Storage: Information related to your connected electric motors, including their
				status and performance data, will be stored in our database. We will handle this data in
				accordance with our Privacy Policy.
			</Text>
			<Text style={styles.text}>
				3.3 User Responsibilities: You are responsible for all activity that occurs on your account,
				including any data you upload or input into the App. You agree not to use the App for any
				unlawful purpose or in violation of these Terms.
			</Text>

			<Text style={styles.sectionTitle}>4. Privacy</Text>
			<Text style={styles.text}>
				We collect, store, and process your personal information in accordance with our Privacy
				Policy. By using the App, you consent to the collection and use of your information as
				described in our Privacy Policy.
			</Text>

			<Text style={styles.sectionTitle}>5. Intellectual Property</Text>
			<Text style={styles.text}>
				All content and materials available on the App, including but not limited to text, graphics,
				logos, images, and software, are the property of [Your Company Name] or its licensors and
				are protected by copyright, trademark, and other intellectual property laws.
			</Text>

			<Text style={styles.sectionTitle}>6. Termination</Text>
			<Text style={styles.text}>
				We reserve the right to suspend or terminate your access to the App, without notice, for any
				reason, including if you violate these Terms or engage in conduct that we believe is harmful
				to other users or to us.
			</Text>

			<Text style={styles.sectionTitle}>7. Disclaimer of Warranties</Text>
			<Text style={styles.text}>
				The App is provided "as is" and "as available," without any warranties of any kind, either
				express or implied, including but not limited to the implied warranties of merchantability,
				fitness for a particular purpose, or non-infringement.
			</Text>

			<Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
			<Text style={styles.text}>
				To the maximum extent permitted by applicable law, [Your Company Name] and its affiliates,
				officers, employees, agents, and licensors shall not be liable for any indirect, incidental,
				special, consequential, or punitive damages, or any loss of profits or revenues, whether
				incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
				losses, resulting from (a) your use or inability to use the App; (b) any unauthorized access
				to or use of our servers and/or any personal information stored therein; (c) any
				interruption or cessation of transmission to or from the App; (d) any bugs, viruses, trojan
				horses, or the like that may be transmitted to or through the App; or (e) any errors or
				omissions in any content or for any loss or damage incurred as a result of the use of any
				content posted, emailed, transmitted, or otherwise made available through the App.
			</Text>

			<Text style={styles.sectionTitle}>9. Changes to Terms</Text>
			<Text style={styles.text}>
				We reserve the right to update or modify these Terms at any time without prior notice. Your
				continued use of the App after any such changes constitutes your acceptance of the updated
				Terms.
			</Text>

			<Text style={styles.sectionTitle}>10. Contact Us</Text>
			<Text style={styles.text}>
				If you have any questions or concerns about these Terms or the App, please contact us at
				[Your Contact Information].
			</Text>

			<Text style={styles.acceptance}>
				By using the App, you agree to these Terms of Use. Please read these Terms carefully and
				ensure that you understand them.
			</Text>

			<View style={styles.buttonContainer}>
				<CustomButton text="Close" onPress={onClosePressed} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#051C60",
		marginBottom: 10,
	},
	date: {
		color: "gray",
		marginBottom: 20,
	},
	text: {
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
	},
	acceptance: {
		marginTop: 20,
		color: "gray",
	},
	buttonContainer: {
		marginTop: 50,
		marginBottom: 40,
	},
});

export default TermsOfUse;
