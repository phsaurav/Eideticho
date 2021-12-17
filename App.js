import React from "react";
import Providers from "./app/navigation";
import * as firebase from "firebase";
import firebaseConfig from "./app/firebase/firebaseConfig";

const App = () => {
	if (!firebase.apps.length) {
		console.log("Connected with Firebase");
		firebase.initializeApp(firebaseConfig);
	}
	return <Providers />;
};

export default App;
