import React, { useContext, useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";

function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useContext(AuthContext);

	const emptyState = () => {
		setEmail("");
		setPassword("");
	};

	const handlePress = () => {
		console.log(email);
		if (!email) {
			Alert.alert("Email field is required.");
		} else if (!password) {
			Alert.alert("Password field is required.");
		} else {
			login(email, password);
			emptyState();
		}
	};

	const handleGoogleLogin = () => {
		
	}

	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo_text.png")} style={styles.logo} />
			<FormInput
				placeholderText='Email'
				onChangeText={(userEmail) => {
					setEmail(userEmail);
				}}
				iconType='user'
				keyboardType='email-address'
				autoCapitalize='none'
				autoCorrect={false}
			/>
			<FormInput
				placeholderText='Password'
				onChangeText={(userPassword) => {
					setPassword(userPassword);
				}}
				iconType='lock'
				secureTextEntry={true}
			/>
			<FormButton buttonTitle='Sign In' onPress={() => handlePress()} />

			<TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Signup")}>
				<Text style={styles.navButtonText}> Don't have an account? Create Here.</Text>
			</TouchableOpacity>
			<SocialButton
				buttonTitle='Sign in with Google'
				btnType='google'
				color='#de4d41'
				backgroundColor='#f5e7ea'
				onPress={() => handleGoogleLogin()}
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
