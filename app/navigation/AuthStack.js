import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";

const { Navigator, Screen } = createStackNavigator();

const AuthStack = () => {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);

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
		return (
			<NavigationContainer>
				<Navigator screenOptions={{ headerShown: false }} initialRouteName='Onboarding'>
					<Screen name='Onboarding' component={OnboardingScreen} />
					<Screen name='Login' component={LoginScreen} />
				</Navigator>
			</NavigationContainer>
		);
	} else {
		return <LoginScreen />;
	}
};

export default AuthStack;
