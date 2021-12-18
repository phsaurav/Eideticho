import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { AddImage, InputField, InputWrapper, SubmitBtn, SubmitBtnText, StatusWrapper } from "../styles/AddPost";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const AddNoteScreen = () => {
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [transferred, setTransferred] = useState(0);
	const [status, requestPermission] = ImagePicker.useCameraPermissions();

	const takePhotoFromCamera = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (granted) {
			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.5,
			});
			console.log(result);

			if (!result.cancelled) {
				setImage(result?.uri);
			}
		}
	};

	const choosePhotoFromLibrary = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});
		console.log(result);

		if (!result.cancelled) {
			setImage(result?.uri);
		}
	};
	return (
		<View style={styles.container}>
			<InputWrapper>
				{image != null ? <AddImage source={{ uri: image }} /> : null}
				<InputField placeholder='Keep in memory!!' multiline numberofLines={3} />
				{uploading ? (
					<StatusWrapper>
						<Text>{transferred} % Completed!</Text>
						<ActivityIndicator size='large' color='#0000ff' />
					</StatusWrapper>
				) : (
					<SubmitBtn>
						<SubmitBtnText>Post</SubmitBtnText>
					</SubmitBtn>
				)}
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
