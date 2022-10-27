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
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
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
import uuid from "react-native-uuid";
import { MaterialIcons } from "@expo/vector-icons";
import { StoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { StoreCourseLink } from "../../../API/firebaseMethods/firebaseMethod";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function CourseContent({ navigation, route }) {
  const [ID] = useState(uuid.v4());
  const [ID1] = useState(uuid.v4());
  const [instruction, setinstruction] = useState("");
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState("Upload Document");
  const [isLoading, setisLoading] = useState(false);

  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseID } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { Year } = route.params;

  console.log(Faculty);
  console.log(Department);
  console.log(Level);
  console.log(CourseID);
  console.log(CourseName);
  console.log(CoursenameID);
  console.log(Year);

  const currentUser = firebase.auth().currentUser;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setisLoading(true);
      StoreCourseLink(ID1, result.uri)
        .then(() => {
          setDocument(result.uri);
          setisLoading(false);
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = async () => {
    const Url = await firebase
      .storage()
      .ref()
      .child("CourseLink/" + ID1) //name in storage in firebase console
      .getDownloadURL()
      .catch((e) => console.log("Errors while downloading => ", e));

    if (!instruction) {
      Alert.alert("Text required");
    } else if (!title) {
      Alert.alert("title required");
    } else if (document == "Upload Document") {
      Alert.alert("document empty");
    } else {
      navigation.goBack();
      StoreCourse(
        ID,
        currentUser.uid,
        Faculty,
        Department,
        Level,
        Year,
        CourseName,
        CourseID,
        CoursenameID,
        title,
        instruction,
        Url
      );

      Alert.alert("Uploaded!");
    }
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <Text>Please wait!</Text>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }

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
            Create Chapter
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
        <ScrollView style={{ height: hp("50%"), marginTop: hp("5%") }}>
          <View>
            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Title</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title) => setTitle(title)}
                />
              </View>
            </View>

            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Content</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={instruction}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(instruction) => setinstruction(instruction)}
                />
              </View>
            </View>

            <Text
              style={{
                fontSize: hp("2.5%"),
                marginTop: hp("3%"),
                marginLeft: wp("12%"),
              }}
            >
              Upload Document
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: wp("70%"),
                  marginLeft: wp("10%"),
                  marginRight: wp("3%"),
                  marginTop: hp("0.5%"),
                  height: hp("5%"),
                  borderRadius: 25,
                  backgroundColor: "#e9c8fa",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: hp("1.8%"),
                    fontWeight: "100",
                    color: "red",
                    alignSelf: "center",
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}
                >
                  {document}
                </Text>
              </View>

              <TouchableOpacity onPress={pickDocument}>
                <FontAwesome
                  name="send"
                  size={hp("2%")}
                  color="black"
                  style={{ alignSelf: "center", paddingTop: 10 }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: hp("1%"),
                    fontWeight: "900",
                  }}
                >
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Upload</Text>
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
});
