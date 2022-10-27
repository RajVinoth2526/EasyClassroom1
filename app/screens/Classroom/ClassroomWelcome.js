import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import * as firebase from "firebase";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Level1Screen from "./Level1Screen";
import Level3Screen from "./Level3Screen";
import Level2Screen from "./Level2Screen";

export default function ClassroomWelcome({ navigation }) {
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: "none",
        },
        tabBarItemStyle: {
          fontSize: 12,
          textTransform: "none",
          height: 30,
          minHeight: 10,
          backgroundColor: "#c97df0",
          borderRadius: 100,
          margin: 10,
          marginVertical: 10,
          padding: 3,
        },
        tabBarStyle: {
          backgroundColor: "#cdaffa",
        },
        tabBarIndicator: () => null,
      }}
    >
      <Tab.Screen name="Level1" component={Level1Screen} />
      <Tab.Screen name="Level2" component={Level2Screen} />
      <Tab.Screen name="Level3" component={Level3Screen} />
    </Tab.Navigator>
  );
}
