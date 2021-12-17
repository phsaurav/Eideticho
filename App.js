import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./app/screens/LoginScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";

const { Navigator, Screen } = createStackNavigator();

const App = () => {
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

export default App;
