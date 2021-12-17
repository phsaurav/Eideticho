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
					backgroundColor: "#E3F6E6",
					image: (
						<Image
							style={{ marginTop: -100, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_1.png")}
						/>
					),
					title: "Take a Picture!!",
					subtitle: "The thing you want to remember...",
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
					title: "Add a Note!",
					subtitle: "As Simple as that",
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
					title: "Easy to find timeline.",
					subtitle: "A chronological timeline of the day",
				},
				{
					backgroundColor: "#fff",
					image: (
						<Image
							style={{ marginTop: -100, marginBottom: -50, height: 300, width: 300 }}
							// @ts-ignore
							source={require("../assets/onBoarding_4.png")}
						/>
					),
					title: "Your Photographic Memory",
					subtitle: "Now you everyone will have a photographic memory.",
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
