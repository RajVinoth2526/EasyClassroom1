import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  BackHandler,
  StatusBar,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  signInWithpasswordAndPassword,
  sendPasswordResetpassword,
} from "firebase/auth";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { StudentEntroll } from "../../../API/firebaseMethods/firebaseMethod";
export default function EntrolCourseScreen({ navigation, route }) {
  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { UserID } = route.params;

  const { Password } = route.params;
  const { CourseID } = route.params;
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const currentUser = firebase.auth().currentUser;
  console.log(Password);
  console.log(CourseID);
  const handlePress = () => {
    if (!password) {
      Alert.alert("password field is required.");
    }

    if (password == Password) {
      setPassword("");
      StudentEntroll(currentUser.uid, CourseID);
      navigation.navigate("CourseScreen", {
        Faculty: Faculty,
        Department: Department,
        Level: Level,
        CourseName: CourseName,
        CourseID: CourseID,
        CoursenameID: CoursenameID,
        UserID: UserID,
      });
    } else {
      Alert.alert("wrong Key");
    }
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("12%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("12%"),
            borderBottomRightRadius: 60,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: hp("4%"),
              fontWeight: "bold",
            }}
          >
            Entroll Course
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("12%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>

      <View
        style={{
          alignSelf: "center",
          marginBottom: hp("3%"),
          marginTop: hp("1%"),
        }}
      >
        <FontAwesome5 name="user-lock" size={hp("12%")} color="#cdaffa" />
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("25%") }}>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Entoll Key</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                style={styles.textinput}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>Entroll</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginLeft: wp("11%"),
    width: wp("80%"),
  },
  text: {
    fontWeight: "bold",
    fontSize: hp("2%"),
  },

  cardtext: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  inlineText: {
    color: "blue",
    marginTop: "10%",
    alignSelf: "center",
  },

  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    marginBottom: "10%",
    alignItems: "center",
    padding: 10,
  },
  action: {
    marginTop: hp("1%"),

    borderRadius: 10,

    marginBottom: hp("4%"),

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  textinput: {
    color: "black",
    height: hp("7%"),
    marginLeft: wp("3%"),
    fontSize: hp("2.5%"),
  },

  buttonLogin: {
    backgroundColor: "#cdaffa",
    alignSelf: "center",
    height: hp("8%"),
    justifyContent: "center",
    borderRadius: 9,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 8,
    elevation: 7,
  },

  buttontext: {
    fontSize: hp("3%"),
    fontWeight: "500",
    alignSelf: "center",
  },

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
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
