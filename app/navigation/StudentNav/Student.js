import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import StudentDashboardScreen from "../../screens/users/Student/Dashboard/StudentDashboardScreen";
import GpaCalScreen from "../../screens/users/Student/Gpa/GpaCalScreen";
import ChatBoxScreen from "../../screens/users/Student/ChatBox/ChatBoxScreen";
import NoticeScreen from "../../screens/users/Student/Notice/NoticeScreen";
import StudentProfileScreen from "../../screens/users/Student/StudentProfileScreen";

const Tab = createBottomTabNavigator();

export function Student() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // console.log(route.name);

          if (route.name === "StudentDashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notices") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Gpa") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={33} color="indigo" />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        // headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="StudentDashboard" component={StudentDashboardScreen} />
      <Tab.Screen name="Notices" component={NoticeScreen} />
      <Tab.Screen name="Profile" component={StudentProfileScreen} />
      <Tab.Screen name="Gpa" component={GpaCalScreen} />
      <Tab.Screen name="Chat" component={ChatBoxScreen} />
    </Tab.Navigator>
  );
}
