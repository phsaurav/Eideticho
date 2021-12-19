import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import HomeScreen from "../screens/HomeScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

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
					fontSize: 25,
				},
				headerStyle: {
					shadowColor: "#fff",
					elevation: 0,
				},
				headerRight: () => (
					<TouchableOpacity
						style={{
							marginRight: 20,
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#2e64e515",
							borderRadius: 20,
							paddingLeft: 15,
							paddingRight: 3,
							height: 35,
						}}
						onPress={() => navigation.navigate("AddNote")}
					>
						<SimpleLineIcons name='note' size={16} color='#2e64e5' />
						<Text
							style={{
								marginLeft: 5,
								color: "#2e64e5",
								fontSize: 16,
								marginRight: 10,
							}}
						>
							Add
						</Text>
					</TouchableOpacity>
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
				name='Timeline'
				component={FeedStack}
				options={({ route }) => ({
					tabBarLabel: "Timeline",
					// tabBarVisible: route.state && route.state.index === 0,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='timeline-text-outline' color={color} size={size} />
					),
					headerShown: false,
				})}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileStack}
				options={{
					// tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <Ionicons name='person-outline' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Important'
				component={FavouriteScreen}
				options={{
					// tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <AntDesign name='staro' color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppStack;
