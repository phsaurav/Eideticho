import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
	return (
		<Navigator>
			<Screen name='Home' component={HomeScreen} />
		</Navigator>
	);
};

export default AppStack;
