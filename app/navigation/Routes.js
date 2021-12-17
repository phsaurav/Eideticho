import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthStack from "./AuthStack";

function Routes(props) {
	return (
		<NavigationContainer>
			<AuthStack></AuthStack>
		</NavigationContainer>
	);
}

export default Routes;
