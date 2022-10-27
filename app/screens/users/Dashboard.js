import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as firebase from "firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { loggingOut } from "../../../API/firebaseMethods/firebaseMethod";
import Profile from "../Profile/Profile";
import SettingsScreen from "../settings /SettingsScreen";
import AdminHomeScreen from "./Admin/AdminHome";
import StudentHomeScreen from "./Student/StudentHome";
import LecturerHomeScreen from "./Lecture/LecturerHome";
import DemoHomeScreen from "./Demo/DemoHome";
import AdminChatScreen from "./Admin/AdminChatScreen";
import LecturerChatScreen from "./Lecture/LecturerChatScreen";
import DemoChatScreen from "./Demo/DemoChatScreen";
import StudentChatScreen from "./Student/StudentChatScreen";
import PostScreen from "../Post/PostScreen";
import DemoPostScreen from "./Demo/DemoPostScreen";
import StudentPostScreen from "./Student/StudentPostScreen";
import AdminSearchScreen from "./Admin/AdminSearchScreen";
import LecturerSearchScreen from "./Lecture/LecturerSearchScreen";
import DemoSearchScreen from "./Demo/DemoSearchScreen";
import StudentSearchScreen from "./Student/StudentSearchScreen";
import RefreshPostScreen from "../Post/RefreshPostScreen";
import ChatScreen from "../Chat/ChatScreen";

const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();

function TabNavigation() {
  let currentUserUID = firebase.auth().currentUser.uid;

  const [role, setRole] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();

        setRole(dataObj.role);
      }
    }
    getUserInfo();
  });

  if (role == "Lecturer") {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: hp("10%"),
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={LecturerHomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="home" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="newspaper-o" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Post
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Entypo name="chat" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Ionicons name="ios-settings" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  } else if (role == "Student") {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: hp("10%"),
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={StudentHomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="home" size={35} color="#cdaffa" height={5} />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="newspaper-o" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Post
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Entypo name="chat" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Ionicons name="ios-settings" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  } else if (role == "Demonstrator") {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: hp("10%"),
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={DemoHomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="home" size={30} color="#cdaffa" height={5} />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="newspaper-o" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Post
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Entypo name="chat" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Ionicons name="ios-settings" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  } else if (role == "Admin") {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: hp("10%"),
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={AdminHomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <FontAwesome name="home" size={35} color="#cdaffa" height={5} />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Entypo name="chat" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 1,
                }}
              >
                <Ionicons name="ios-settings" size={35} color="#cdaffa" />
                <Text
                  style={{
                    color: "#6e6c6b",
                    fontSize: hp("1.8%"),
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}

export default function Dashboard({ navigation }) {
  const handlePress = () => {
    loggingOut();
    navigation.replace("Home");
  };

  return (
    <Draw.Navigator
      initialRouteName="Easy Classroom'"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={handlePress} />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "#cdaffa",
        },
      }}
    >
      <Draw.Screen name="Easy Classroom" component={TabNavigation} />
      <Draw.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Draw.Navigator>
  );
}

const styles = StyleSheet.create({
  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 200,
    height: 200,
  },
});
