import React, { useContext, useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";
import * as GoogleAuthentication from "expo-google-app-auth";
import firebase from "firebase";

function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, setUser } = useContext(AuthContext);

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

	const signInWithGoogle = () => {
		GoogleAuthentication.logInAsync({
			androidClientId: "985032517632-famb4oh1kf3i1e1tbj1s15gd047r8u6v.apps.googleusercontent.com",
			iosClientId: "985032517632-jv9ng6ib5217ml6ao6schdnfpeagbavk.apps.googleusercontent.com",
			scopes: ["profile", "email"],
		})
			.then((res) => {
				if (res?.type === "success") {
					console.log(res?.user);
					setUser(res.user);
					const { idToken, accessToken } = res;
					const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
					return firebase.auth().signInWithCredential(credential);
				}
				return Promise.reject();
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

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
				onPress={() => signInWithGoogle()}
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
