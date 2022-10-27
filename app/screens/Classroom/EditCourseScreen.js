import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  keyboardVerticalOffset,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import * as firebase from "firebase";
//import { UploadPost } from '../../../../API/firebaseMethods/firebaseMethod';
//import IMAGE from '../../../assets/photo.png';
import { MaterialIcons } from "@expo/vector-icons";
import { EditPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { EditCourseName } from "../../../API/firebaseMethods/firebaseMethod";
import { normalizeUnits } from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function EditCourseNameScreen({ navigation, route }) {
  const [Course1, setCourse] = useState("");
  const [CourseID1, setCourseId] = useState("");
  const { UserId } = route.params;
  const { ID } = route.params;
  const { Course } = route.params;
  const { CourseID } = route.params;
  const { Faculty } = route.params;
  const { Level } = route.params;
  const { Year } = route.params;
  const { Department } = route.params;

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const password = makeid(10);

  const handlePress = () => {
    if (!Course1) {
      EditCourseName(
        UserId,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        ID,
        CourseID1,
        password
      );
      navigation.goBack({ Level: Level, Year: Year });
    }
    if (!CourseID1) {
      EditCourseName(
        UserId,
        Faculty,
        Department,
        Level,
        Year,
        Course1,
        ID,
        CourseID,
        password
      );
      navigation.goBack({ Level: Level, Year: Year });
    }
    if (!Course1 && !CourseID1) {
      EditCourseName(
        UserId,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        ID,
        CourseID,
        password
      );
      navigation.navigate("LecturerClassroom", { Level: Level, Year: Year });
    }
    if (Course1 && CourseID1) {
      EditCourseName(
        UserId,
        Faculty,
        Department,
        Level,
        Year,
        Course1,
        ID,
        CourseID1,
        password
      );
      navigation.goBack({ Level: Level, Year: Year });
    }
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("10%"),
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
            Course Details
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("10%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("40%"), marginTop: hp("10%") }}>
          <View>
            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Course Name</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  editable={true}
                  defaultValue={Course}
                  textAlignVertical="top"
                  onChangeText={(Course1) => setCourse(Course1)}
                />
              </View>
            </View>

            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Course ID</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  editable={true}
                  defaultValue={CourseID}
                  textAlignVertical="top"
                  onChangeText={(CourseID1) => setCourseId(CourseID1)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  datePickerStyle: {
    width: 200,
  },
  scrollView: {
    height: hp("55%"),
    width: wp("90%"),
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: hp("5%"),
    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginTop: hp("1%"),
    alignSelf: "center",
    width: wp("78%"),
  },
  text: {
    alignSelf: "center",
    marginTop: hp("4%"),
    fontSize: 30,
    fontWeight: "bold",
  },
  photoUpload: {
    alignSelf: "flex-end",
    marginRight: wp("20%"),
    marginTop: hp("3%"),
  },

  cardtext: {
    marginLeft: wp("1%"),
    fontSize: hp("2.4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  action: {
    justifyContent: "center",

    borderRadius: 10,
    height: hp("6%"),
    marginBottom: hp("3%"),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  textinput: {
    marginLeft: wp("3%"),
    color: "black",
    fontSize: hp("2.2%"),
  },

  buttonSignup: {
    backgroundColor: "#cdaffa",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("8%"),
    borderRadius: 9,
    marginBottom: hp("0.1%"),
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  SignUpText: {
    fontSize: hp("3%"),
    alignSelf: "center",
    fontWeight: "bold",
  },

  inlineText: {
    color: "red",
    marginTop: hp("1.5%"),
    marginBottom: hp("4%"),
    alignSelf: "center",
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },

  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: hp("20%"),
    width: wp("60%"),
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
  },
});
