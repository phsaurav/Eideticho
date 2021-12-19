import React, { createContext, useState } from "react";
import * as firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [err, setErr] = useState('');
	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				err,
				login: async (email, password) => {
					try {
						await firebase.auth().signInWithEmailAndPassword(email, password);
					} catch (e) {
						console.log(e);
						setErr(e);
					}
				},
				register: async (email, password) => {
					try {
						await firebase.auth().createUserWithEmailAndPassword(email, password);
					} catch (e) {
						console.log(e);
					}
				},
				logout: async () => {
					try {
						await firebase.auth().signOut();
					} catch (err) {
						console.log(err);
					}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
