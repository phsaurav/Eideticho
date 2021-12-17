import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const { Navigator, Screen } = createStackNavigator();

const AuthStack = () => {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);
	let routeName = "Onboarding";

	useEffect(() => {
		AsyncStorage.getItem("alreadyLaunched").then((value) => {
			if (value == null) {
				AsyncStorage.setItem("alreadyLaunched", "true");
				setIsFirstLaunch(true);
			} else {
				setIsFirstLaunch(false);
			}
		});
	}, []);

	if (isFirstLaunch === null) {
		return null;
	} else if (isFirstLaunch === true) {
		routeName = "Onboarding";
	} else {
		routeName = "Login";
	}
	return (
		<Navigator initialRouteName={routeName}>
			<Screen name='Onboarding' component={OnboardingScreen} options={{ header: () => null }} />
			<Screen name='Login' component={LoginScreen} options={{ header: () => null }} />
			<Screen
				name='Signup'
				component={SignupScreen}
				options={({ navigation }) => ({
					title: "",
					headerStyle: {
						backgroundColor: "#f9fafd",
						shadowColor: "#f9fafd",
						elevation: 0,
					},
					headerLeft: () => (
						<View style={{ marginLeft: 10 }}>
							<Feather.Button
								name='arrow-left'
								size={25}
								backgroundColor='#f9fafd'
								color='#333'
								onPress={() => navigation.navigate("Login")}
							/>
						</View>
					),
				})}
			/>
		</Navigator>
	);
};

export default AuthStack;
