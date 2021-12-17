import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";

function LoginScreen({ navigation }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo_text.png")} style={styles.logo} />
			<FormInput
				placeholderText='Email'
				onChange={(userEmail) => {
					setEmail(userEmail);
				}}
				iconType='user'
				keyboardType='email-address'
				autoCapitalize='none'
				autoCorrect={false}
			/>
			<FormInput
				placeholderText='Password'
				onChange={(userPassword) => {
					setPassword(userPassword);
				}}
				iconType='lock'
				secureTextEntry={true}
			/>
			<FormButton buttonTitle='Sign In' onPress={() => alert("Sign In Button Clicked")} />

			<TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Signup")}>
				<Text style={styles.navButtonText}> Don't have an account? Create Here.</Text>
			</TouchableOpacity>
			<SocialButton
				buttonTitle='Sign in with Google'
				btnType='google'
				color='#de4d41'
				backgroundColor='#f5e7ea'
				onPress={() => alert("Google Sign In")}
			/>
		</View>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 20,
		paddingTop: 80,
	},
	logo: {
		height: 150,
		width: 150,
		resizeMode: "cover",
		marginBottom: 40,
	},
	text: {
		fontSize: 28,

		color: "#051d5f",
	},
	navButton: {
		marginTop: 15,
	},
	forgotButton: {
		marginVertical: 20,
	},
	navButtonText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#2e64e5",
	},
});
