import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

const PrivacyPolicy = () => {
	const nav = useNavigation();

	const onClosePressed = () => {
		nav.goBack();
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Privacy Policy</Text>
			<Text style={styles.date}>Last Updated: September 25, 2023</Text>

			<Text style={styles.sectionTitle}>Introduction</Text>
			<Text style={styles.text}>
				This Privacy Policy describes how Prescott Electric Motors collects, uses, and shares
				personal information when you use MotorScan. By accessing or using the App, you agree to the
				terms of this Privacy Policy.
			</Text>

			<Text style={styles.sectionTitle}>Information We Collect</Text>
			<Text style={styles.text}>
				User-Provided Information: When you register for an account on the App, we collect the
				following information:
			</Text>
			<Text style={styles.bulletPoint}>- Username</Text>
			<Text style={styles.bulletPoint}>- Name</Text>
			<Text style={styles.bulletPoint}>- Email address</Text>
			<Text style={styles.bulletPoint}>- Password</Text>
			<Text style={styles.text}>
				Electric Motors Data: The App is designed for electric motors monitoring. We collect and
				store data related to your connected electric motors, including but not limited to:
			</Text>
			<Text style={styles.bulletPoint}>- Motor status</Text>
			<Text style={styles.bulletPoint}>- Performance data</Text>
			<Text style={styles.bulletPoint}>- Usage patterns</Text>
			<Text style={styles.bulletPoint}>- Error logs</Text>

			<Text style={styles.sectionTitle}>How We Use Your Information</Text>
			<Text style={styles.text}>We use the collected information for the following purposes:</Text>
			<Text style={styles.bulletPoint}>
				- User Account: We use your user-provided information to create and manage your account and
				provide you with access to the App.
			</Text>
			<Text style={styles.bulletPoint}>
				- Electric Motors Monitoring: We use the data related to your connected electric motors to
				provide you with real-time information about their status and performance.
			</Text>
			<Text style={styles.bulletPoint}>
				- Improvement of Services: We may use collected data to improve the functionality and
				performance of the App.
			</Text>
			<Text style={styles.bulletPoint}>
				- Communication: We may use your email address to send you important updates, notifications,
				and information related to your account and the App.
			</Text>

			<Text style={styles.sectionTitle}>Information Sharing</Text>
			<Text style={styles.text}>
				We do not share your personal information with third parties except in the following
				circumstances:
			</Text>
			<Text style={styles.bulletPoint}>
				- Service Providers: We may share your information with trusted third-party service
				providers who assist us in operating and maintaining the App. These service providers are
				bound by confidentiality agreements and are prohibited from using your information for any
				purpose other than providing services to us.
			</Text>
			<Text style={styles.bulletPoint}>
				- Legal Requirements: We may disclose your information if required to do so by law or in
				response to a valid legal request, such as a court order, subpoena, or government
				investigation.
			</Text>

			<Text style={styles.sectionTitle}>Data Security</Text>
			<Text style={styles.text}>
				We take reasonable measures to protect your personal information from unauthorized access,
				disclosure, alteration, and destruction. However, please be aware that no data transmission
				over the internet is entirely secure, and we cannot guarantee the security of your data.
			</Text>

			<Text style={styles.sectionTitle}>Your Choices</Text>
			<Text style={styles.text}>
				You have the following choices regarding your personal information:
			</Text>
			<Text style={styles.bulletPoint}>
				- Account Information: You can update or delete your account information by accessing your
				account settings within the App.
			</Text>
			<Text style={styles.bulletPoint}>
				- Email Communications: You can opt out of receiving non-essential email communications from
				us by following the unsubscribe instructions provided in those emails.
			</Text>

			<Text style={styles.sectionTitle}>Children's Privacy</Text>
			<Text style={styles.text}>
				The App is not intended for use by children under the age of 13. We do not knowingly collect
				or solicit personal information from children under 13. If you are a parent or guardian and
				believe that your child has provided us with personal information, please contact us, and we
				will take steps to delete such information.
			</Text>

			<Text style={styles.sectionTitle}>Changes to this Privacy Policy</Text>
			<Text style={styles.text}>
				We may update this Privacy Policy from time to time to reflect changes in our practices or
				for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy
				on the App, and the revised version will be effective as of the date of posting.
			</Text>

			<Text style={styles.sectionTitle}>Contact Us</Text>
			<Text style={styles.text}>
				If you have any questions or concerns about this Privacy Policy or our data practices,
				please contact us at [Your Contact Information].
			</Text>

			<Text style={styles.acceptance}>
				By using the App, you agree to the terms of this Privacy Policy. Please read this Privacy
				Policy carefully and ensure that you understand its content.
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
	bulletPoint: {
		marginLeft: 10,
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

export default PrivacyPolicy;
