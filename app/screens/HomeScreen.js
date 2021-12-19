import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { Container } from "../styles/TimelineStyles";
import PostCard from "../components/PostCard";
import { FlatList } from "react-native-gesture-handler";

const Posts = [
	{
		id: "1",
		userName: "Jenny Doe",
		userImg: require("../assets/users/user-3.jpg"),
		postTime: "4 mins ago",
		post: "Hey there, this is my test for a post of my social app in React Native.",
		postImg: require("../assets/posts/post-img-3.jpg"),
		liked: true,
		likes: "14",
		comments: "5",
	},
	{
		id: "2",
		userName: "John Doe",
		userImg: require("../assets/users/user-1.jpg"),
		postTime: "2 hours ago",
		post: "Hey there, this is my test for a post of my social app in React Native.",
		postImg: "none",
		liked: false,
		likes: "8",
		comments: "0",
	},
	{
		id: "3",
		userName: "Ken William",
		userImg: require("../assets/users/user-4.jpg"),
		postTime: "1 hours ago",
		post: "Hey there, this is my test for a post of my social app in React Native.",
		postImg: require("../assets/posts/post-img-2.jpg"),
		liked: true,
		likes: "1",
		comments: "0",
	},
	{
		id: "4",
		userName: "Selina Paul",
		userImg: require("../assets/users/user-6.jpg"),
		postTime: "1 day ago",
		post: "Hey there, this is my test for a post of my social app in React Native.",
		postImg: require("../assets/posts/post-img-4.jpg"),
		liked: true,
		likes: "22",
		comments: "4",
	},
	{
		id: "5",
		userName: "Christy Alex",
		userImg: require("../assets/users/user-7.jpg"),
		postTime: "2 days ago",
		post: "Hey there, this is my test for a post of my social app in React Native.",
		postImg: "none",
		liked: false,
		likes: "0",
		comments: "0",
	},
];

const HomeScreen = ({ navigation, postLength, setPostLength }) => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			const list = [];

			await firebase
				.firestore()
				.collection("posts")
				.orderBy("postTime", "desc")
				.get()
				.then((querySnapshot) => {
					console.log("Total Posts: ", querySnapshot.size);

					querySnapshot.forEach((doc) => {
						// console.log(doc);
						const { userId, post, postImg, postTime, liked } = doc.data();
						list.push({
							id: doc.id,
							userId,
							userName: "Test Name",
							userImg:
								"https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
							postTime: postTime.toDate().toLocaleTimeString(),
							post,
							postImg,
							liked: liked,
						});
					});
				});

			setPosts(list);

			if (loading) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);
	useEffect(() => {
		console.log("Posts: ", posts);
	}, [posts]);

	return (
		<Container>
			<FlatList
				data={posts}
				renderItem={({ item }) => <PostCard item={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
		</Container>
	);
};

export default HomeScreen;
