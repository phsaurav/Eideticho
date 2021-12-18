import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { InputField, InputWrapper } from "../styles/AddPost";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";

const AddNoteScreen = () => {
	const [image, setImage] = useState(null);

	const takePhotoFromCamera = () => {
		ImagePicker.openCamera({
			width: 1200,
			height: 780,
			cropping: true,
		}).then((image) => {
			console.log(image);
			const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
			setImage(imageUri);
		});
	};

	const choosePhotoFromLibrary = () => {
		ImagePicker.openPicker({
			width: 1200,
			height: 780,
			cropping: true,
		}).then((image) => {
			console.log(image);
			const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
			setImage(imageUri);
		});
	};
	return (
		<View style={styles.container}>
			<InputWrapper>
				<InputField placeholder='Keep in memory!!' multiline numberofLines={3} />
			</InputWrapper>
			<ActionButton buttonColor='#2e64e5'>
				<ActionButton.Item buttonColor='#9b59b6' title='Take Photo' onPress={takePhotoFromCamera}>
					<Icon name='camera-outline' style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item buttonColor='#3498db' title='Choose Photo' onPress={choosePhotoFromLibrary}>
					<Icon name='md-images-outline' style={styles.actionButtonIcon} />
				</ActionButton.Item>
			</ActionButton>
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
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: "white",
	},
});
