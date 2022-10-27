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
import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase";
//import { UploadPost } from '../../../../API/firebaseMethods/firebaseMethod';
//import IMAGE from '../../../assets/photo.png';
import { MaterialIcons } from "@expo/vector-icons";
import { EditPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { UpdateStoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { normalizeUnits } from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EditCourseContentScreen({ navigation, route }) {
  const [title1, setTitle] = useState("");
  const [instruction1, setinstruction] = useState("");
  const { UserID } = route.params;
  const { ID } = route.params;
  const { Course } = route.params;
  const { CourseID } = route.params;
  const { Faculty } = route.params;
  const { Level } = route.params;
  const { Year } = route.params;
  const { Department } = route.params;
  const { title } = route.params;
  const { document } = route.params;
  const { instruction } = route.params;
  const { CourseNameID } = route.params;

  console.log(UserID);

  const [Document, setDocument] = useState(document);
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

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

  const handlePress = () => {
    if (!title1) {
      UpdateStoreCourse(
        ID,
        UserID,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        CourseID,
        CourseNameID,
        title,
        instruction1,
        Document
      );
      navigation.goBack({
        Faculty: Faculty,
        Department: Department,
        Level: Level,
        Year: Year,
        CourseID: CourseID,
        CourseName: Course,
        CoursenameID: CourseNameID,
      });
    }
    if (!instruction1) {
      UpdateStoreCourse(
        ID,
        UserID,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        CourseID,
        CourseNameID,
        title1,
        instruction,
        Document
      );

      navigation.goBack({
        Faculty: Faculty,
        Department: Department,
        Level: Level,
        Year: Year,
        CourseID: CourseID,
        CourseName: Course,
        CoursenameID: CourseNameID,
      });
    }
    if (!title1 && !instruction1) {
      UpdateStoreCourse(
        ID,
        UserID,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        CourseID,
        CourseNameID,
        title,
        instruction,
        Document
      );
      navigation.navigate("CourseScreen", {
        Faculty: Faculty,
        Department: Department,
        Level: Level,
        Year: Year,
        CourseID: CourseID,
        CourseName: Course,
        CoursenameID: CourseNameID,
      });
    }
    if (title1 && instruction1) {
      UpdateStoreCourse(
        ID,
        UserID,
        Faculty,
        Department,
        Level,
        Year,
        Course,
        CourseID,
        CourseNameID,
        title1,
        instruction1,
        Document
      );
      navigation.goBack({
        Faculty: Faculty,
        Department: Department,
        Level: Level,
        Year: Year,
        CourseID: CourseID,
        CourseName: Course,
        CoursenameID: CourseNameID,
      });
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
            edit Chapter
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
                  defaultValue={title}
                  multiline={true}
                  textAlignVertical="top"
                  onChangeText={(title1) => setTitle(title1)}
                />
              </View>
            </View>

            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Content</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  defaultValue={instruction}
                  multiline={true}
                  textAlignVertical="top"
                  onChangeText={(instruction1) => setinstruction(instruction1)}
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
                  {Document}
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
