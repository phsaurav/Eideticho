import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "./AuthProvider";
import * as firebase from "firebase";

function Routes(props) {
	const { user, setUser } = useContext(AuthContext);
	const [initializing, setInitializing] = useState(true);

	const onAuthStateChanged = (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}

export default Routes;
