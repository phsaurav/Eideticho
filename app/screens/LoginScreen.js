import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import FormInput from "../components/FormInput";

function LoginScreen(props) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo_text.png")} style={styles.logo} />
			<FormInput
				placeholderText='Email'
				iconType='user'
				keyboardType='email-address'
				autoCapitalize='none'
				autoCorrect={false}
			/>
		</View>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		paddingTop: 50,
	},
	logo: {
		height: 150,
		width: 150,
		resizeMode: "cover",
		marginBottom: 30,
	},
	text: {
		fontFamily: "Kufam-SemiBoldItalic",
		fontSize: 28,

		color: "#051d5f",
	},
	navButton: {
		marginTop: 15,
	},
	forgotButton: {
		marginVertical: 35,
	},
	navButtonText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#2e64e5",
		fontFamily: "Lato-Regular",
	},
});
