import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RefreshControl } from 'react-native';


import LectrerDashboardScreen from "../screens/users/Lecture/LecturerHome";
import DemoDashboardScreen from "../screens/users/Demo/DemoHome";
import AdminDashboard from "../screens/users/Admin/AdminDashboardScreen";

import { Student } from "./StudentNav/Student";

import { useLogin } from "../context/loginProvider";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { whoIs } = useLogin();
  if (whoIs === "student") {
    return <Student />;
  } else if (whoIs === "lecturer") {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="LectrereDashboard"
          component={LectrerDashboardScreen}
        />
      </Tab.Navigator>
    );
  } else if (whoIs === "demo") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="DemoDashboard" component={DemoDashboardScreen} />
      </Tab.Navigator>
    );
  } else if (whoIs === "admin") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="AdminDashboard" component={AdminDashboard} />
      </Tab.Navigator>
    );
  } else {
    return (
      // if (cont.whoIs)
      <Tab.Navigator>
        <Tab.Screen name="notice" component={NoticeScreen} />
        <Tab.Screen name="profile" component={StudentProfileScreen} />
      </Tab.Navigator>
    );
  }
}
