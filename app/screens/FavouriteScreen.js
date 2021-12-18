import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

const FavouriteScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Important Notes</Text>
		</View>
	);
};

export default FavouriteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
