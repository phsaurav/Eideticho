import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "../screens/HomeScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavouriteScreen from "../screens/FavouriteScreen";

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
	<Navigator>
		<Screen
			name='Eideticho'
			component={HomeScreen}
			options={{
				headerTitleAlign: "center",

				headerTitleStyle: {
					color: "#2e64e5",
					fontSize: 18,
				},
				headerStyle: {
					shadowColor: "#fff",
					elevation: 0,
				},
				headerRight: () => (
					<View style={{ marginRight: 10 }}>
						<FontAwesome5.Button
							name='plus'
							size={22}
							backgroundColor='#fff'
							color='#2e64e5'
							onPress={() => navigation.navigate("AddNote")}
						/>
					</View>
				),
			}}
		/>
		<Screen
			name='AddNote'
			component={AddNoteScreen}
			options={{
				title: "",
				headerTitleAlign: "center",
				headerStyle: {
					backgroundColor: "#2e64e515",
					shadowColor: "#2e64e515",
					elevation: 0,
				},
				headerBackTitleVisible: false,
				headerBackImage: () => (
					<View style={{ marginLeft: 15 }}>
						<Ionicons name='arrow-back' size={25} color='#2e64e5' />
					</View>
				),
			}}
		/>
		<Screen
			name='HomeProfile'
			component={ProfileScreen}
			options={{
				title: "",
				headerTitleAlign: "center",
				headerStyle: {
					backgroundColor: "#fff",
					shadowColor: "#fff",
					elevation: 0,
				},
				headerBackTitleVisible: false,
				headerBackImage: () => (
					<View style={{ marginLeft: 15 }}>
						<Ionicons name='arrow-back' size={25} color='#2e64e5' />
					</View>
				),
			}}
		/>
	</Navigator>
);

const ProfileStack = ({ navigation }) => (
	<Navigator>
		<Screen
			name='Profile'
			component={ProfileScreen}
			options={{
				headerShown: false,
			}}
		/>
	</Navigator>
);

const AppStack = () => {
	const getTabBarVisibility = (route) => {
		const routeName = route.state ? route.state.routes[route.state.index].name : "";

		if (routeName === "Chat") {
			return false;
		}
		return true;
	};

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#C24835",
			}}
		>
			<Tab.Screen
				name='Home'
				component={FeedStack}
				options={({ route }) => ({
					tabBarLabel: "Home",
					// tabBarVisible: route.state && route.state.index === 0,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='home-outline' color={color} size={size} />
					),
					headerShown: false,
				})}
			/>
			<Tab.Screen
				name='Important'
				component={FavouriteScreen}
				options={{
					// tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <AntDesign name='staro' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileStack}
				options={{
					// tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <Ionicons name='person-outline' color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppStack;
