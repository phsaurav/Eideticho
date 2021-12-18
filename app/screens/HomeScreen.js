import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

import { Container } from "../styles/TimelineStyles";

const HomeScreen = () => {
	return (
		<Container>
			<Text>Welcome Home</Text>
		</Container>
	);
};

export default HomeScreen;
