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
import ClassroomWelcome from "../screens/Classroom/ClassroomWelcome";
import ResultsScreen from "../screens/Results/ResultsScreen";
import AddResultsScreen from "../screens/Results/AddResults";
import ContactScreen from "../screens/Chat/ContactsScreen";
import SelectContactScreen from "../screens/Chat/SelectContactScreen";
import ChatBoxScreen from "../screens/Chat/ChatBoxScreen";
import ForgotPasswordScreen from "../screens/Password/ForgotPassword";
import ChangePassword from "../screens/Password/ChangePassword";
import LecturerClassroomScreen from "../screens/Classroom/LecturerClassroomScreen";
import AddCourse from "../screens/Classroom/AddCourse";
import EntrolCourseScreen from "../screens/Classroom/EntrolCourseScreen";
import CourseScreen from "../screens/Classroom/CourseScreen";
import AddAcademyYear from "../screens/Classroom/AddAcademyYear";
import CourseContent from "../screens/Classroom/CourseContent";
import EditCourseScreen from "../screens/Classroom/EditCourseScreen";
import EditCourseContentScreen from "../screens/Classroom/EditCourseContentScreen";
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
          name={"Results"}
          component={ResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AddResults"}
          component={AddResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"contact"}
          component={ContactScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"SelectContact"}
          component={SelectContactScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ChatBox"}
          component={ChatBoxScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ForgotPassword"}
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ChangePassword"}
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"LecturerClassroom"}
          component={LecturerClassroomScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"AddCourse"}
          component={AddCourse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"CourseScreen"}
          component={CourseScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"EntrollScreen"}
          component={EntrolCourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AcademyYear"}
          component={AddAcademyYear}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"CourseContent"}
          component={CourseContent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"EditCourse"}
          component={EditCourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"EditCourseContent"}
          component={EditCourseContentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
