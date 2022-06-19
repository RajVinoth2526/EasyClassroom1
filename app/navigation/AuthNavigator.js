import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";
import apiKeys from "../../config/keys";
import Dashboard from "../screens/users/Dashboard";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUp from "../Authendication/SignUp";
import SignIn from "../Authendication/SignIn";
import LoadingScreen from "../Authendication/LoadingScreen";
import NavigateUser from "../Authendication/NavigateUser";
import AddPostScreen from "../screens/Post/AddPostScreen";
import UpdateProfile from "../screens/Profile/UpdateProfile";
import Noticboard from "../screens/Noticeboard/Noticeboard";
import VerifyRole from "../Authendication/Verify/VerifyRole";
import AdminSignUp from "../Authendication/AdminSignUp/SignUp";
import LecturerSignUp from "../Authendication/LectuerSignUp/SignUp";
import StudentSignUp from "../Authendication/StudentSignUp/SignUp";
import DemoSignUp from "../Authendication/DemoSignUp/SignUp";
import Pin from "../Authendication/Verify/Pin";
import Profile from "../screens/Profile/Profile";
import LoadingPage from "../screens/LoadingScreen/LoadingPage";
import UniversityNoticeboardScreen from "../screens/Noticeboard/university/UniversityNoticeboard";
import DepartmentNoticeboardScreen from "../screens/Noticeboard/department/DepartmentNoticeboard";
import FacultyNoticeboardScreen from "../screens/Noticeboard/faculty/FacultyNoticeboard";
import AddNoticeScreen from "../screens/Noticeboard/AddNotice";
import EditPostScreen from "../screens/Post/EditPost";
import PostScreen from "../screens/Post/PostScreen";
import EditNoticeScreen from "../screens/Noticeboard/EditNotice";
import TimeTableScreen from "../screens/TimeTable/TimeTableScreen";
import ClassroomWelcome from "../screens/Classroom/welcome";
import PayScreen from "../screens/Payment/PayScreen";

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name={"Loading"}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Home"}
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Dashboard"}
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AdminSignUp"}
          component={AdminSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"LecturerSignUp"}
          component={LecturerSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"DemoSignUp"}
          component={DemoSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"StudentSignUp"}
          component={StudentSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Sign In"}
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Sign Up"}
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"NavigateUser"}
          component={NavigateUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"UpdateProfile"}
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Noticeboard"}
          component={Noticboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"VerifyRole"}
          component={VerifyRole}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Pin"}
          component={Pin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"LoadingPage"}
          component={LoadingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AddPostScreen"}
          component={AddPostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"UniversityNoticeboard"}
          component={UniversityNoticeboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"FacultyNoticeboard"}
          component={FacultyNoticeboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"DepartmentNoticeboard"}
          component={DepartmentNoticeboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AddNotice"}
          component={AddNoticeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"EditPost"}
          component={EditPostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"EditNotice"}
          component={EditNoticeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"TimeTable"}
          component={TimeTableScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ClassroomWelcome"}
          component={ClassroomWelcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"payscreen"}
          component={PayScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
