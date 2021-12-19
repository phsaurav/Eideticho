import React, { useContext, useState } from "react";
import { Platform, StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { AddImage, InputField, InputWrapper, SubmitBtn, SubmitBtnText, StatusWrapper } from "../styles/AddPost";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { AuthContext } from "../navigation/AuthProvider";

const AddNoteScreen = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [transferred, setTransferred] = useState(0);
	const [post, setPost] = useState("");
	const [status, requestPermission] = ImagePicker.useCameraPermissions();

	const takePhotoFromCamera = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (granted) {
			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.1,
				base64: true,
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
			quality: 0.1,
			base64: true,
		});
		console.log(result);

		if (!result.cancelled) {
			setImage(result?.uri);
		}
	};
	const submitPost = async () => {
		const imageUrl = await uploadImage();
		console.log("Image Url: ", imageUrl);
		console.log("Post: ", post);

		firebase
			.firestore()
			.collection("posts")
			.add({
				userId: user.uid,
				post: post,
				postImg: imageUrl,
				postTime: firebase.firestore.Timestamp.fromDate(new Date()),
				liked: false,
			})
			.then(() => {
				setPost(null);
				console.log("Post Added!");
				Alert.alert("Memory Added!", "Your memory is added successfully to timeline!");
				navigation.navigate("Eideticho");
			})
			.catch((error) => {
				console.log("Something went wrong with added post to firestore.", error);
			});
	};

	const uploadImage = async () => {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", image, true);
			xhr.send(null);
		});
		if (image == null) {
			return null;
		}
		const uploadUri = image;
		let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

		// Add timestamp to File Name
		const extension = filename.split(".").pop();
		const name = filename.split(".").slice(0, -1).join(".");
		filename = name + Date.now() + "." + extension;

		setUploading(true);
		setTransferred(0);

		const storageRef = firebase.storage().ref(`photos/${filename}`);
		const task = storageRef.put(blob);

		// Set transferred state
		task.on("state_changed", (taskSnapshot) => {
			console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

			setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
		});

		try {
			await task;

			const url = await storageRef.getDownloadURL();

			setUploading(false);
			setImage(null);
			return url;
		} catch (e) {
			console.log(e);
			return null;
		}
	};
	return (
		<View style={styles.container}>
			<InputWrapper>
				{image != null ? <AddImage source={{ uri: image }} /> : null}
				<InputField
					placeholder={image ? "Take Quick Note.." : "Take a quick snap!!"}
					multiline
					numberOfLines={4}
					value={post}
					onChangeText={(content) => setPost(content)}
				/>
				{uploading ? (
					<StatusWrapper>
						<Text>{transferred} % Completed!</Text>
						<ActivityIndicator size='large' color='#0000ff' />
					</StatusWrapper>
				) : (
					image && (
						<SubmitBtn onPress={submitPost}>
							<SubmitBtnText>Add</SubmitBtnText>
						</SubmitBtn>
					)
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
