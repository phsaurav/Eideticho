import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const HomeScreen = () => {
	const { user, logout } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<Text>Welcome {user.email}</Text>
			<FormButton buttonTitle='Logout' onPress={() => logout()} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
