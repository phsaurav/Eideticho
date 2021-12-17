import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Skip = ({ ...props }) => (
	<TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
		<Text style={{ fontSize: 16 }}>Skip</Text>
	</TouchableOpacity>
);

const Next = ({ ...props }) => (
	<TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
		<Text style={{ fontSize: 16 }}>Next</Text>
	</TouchableOpacity>
);

const Done = ({ ...props }) => (
	<TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
		<Text style={{ fontSize: 16 }}>Done</Text>
	</TouchableOpacity>
);

function OnboardingScreen({ navigation }) {
	return (
		<Onboarding
			SkipButtonComponent={Skip}
			NextButtonComponent={Next}
			DoneButtonComponent={Done}
			onSkip={() => navigation.replace("Login")}
			onDone={() => navigation.navigate("Login")}
			pages={[
				{
					backgroundColor: "#fff",
					image: (
						<Image
							style={{ marginTop: -100, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_1.png")}
						/>
					),
					title: "Connect to the World",
					subtitle: "A New Way To Connect With The World",
				},
				{
					backgroundColor: "#fff",
					image: (
						<Image
							style={{ marginTop: -100, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_2.png")}
						/>
					),
					title: "Share Your Favorites",
					subtitle: "Share Your Thoughts With Similar Kind of People",
				},
				{
					backgroundColor: "#fff",
					image: (
						<Image
							style={{ marginTop: -100, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_3.png")}
						/>
					),
					title: "Become The Star",
					subtitle: "Let The Spot Light Capture You",
				},
				{
					backgroundColor: "#fff",
					image: (
						<Image
							style={{ marginTop: -200, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_4.png")}
						/>
					),
					title: "Become The Star",
					subtitle: "Let The Spot Light Capture You",
				},
			]}
		/>
	);
}

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
