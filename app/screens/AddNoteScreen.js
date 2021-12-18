import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddNoteScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Add Note</Text>
		</View>
	);
};

export default AddNoteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
