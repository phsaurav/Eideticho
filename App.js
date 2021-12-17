import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";

import LoginScreen from "./app/screens/LoginScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";

const { Navigator, Screen } = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Navigator headerMode='none' initialRouteName='Onboarding'>
				<Screen name='Onboarding' component={OnboardingScreen} />
				<Screen name='Login' component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};

export default App;
