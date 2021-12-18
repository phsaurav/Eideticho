import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { InputField, InputWrapper } from "../styles/AddPost";

const AddNoteScreen = () => {
	return (
		<InputWrapper>
			<InputField placeholder='Keep in memory!!' multiline numberofLines={3} />
		</InputWrapper>
	);
};

export default AddNoteScreen;
