import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { setRandomFallback } from "bcryptjs";
import { Entypo } from "@expo/vector-icons";
import Clipboard from "@react-native-clipboard/clipboard";
import { DeleteStoreCourseName } from "../../../API/firebaseMethods/firebaseMethod";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function LecturerClassroomScreen({ navigation, route }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");

  const { Year } = route.params;
  const { Level } = route.params;

  //const Year = "2021|2022";
  console.log(Year);
  console.log(Level);
  const level1 = "Level1";
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [year, setYear] = useState("");

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  React.useEffect(() => {
    getUserInfo();
    Refresh();

    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
      Refresh();

      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  const currentUser = firebase.auth().currentUser;

  async function getUserInfo() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      let dataObj = doc.data();
      setRole(dataObj.role);
      setFaculty(dataObj.faculty);
      setDepartment(dataObj.department);

      const data = [];
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("CoursesName-" + dataObj.faculty)
        .doc(dataObj.department)
        .collection(Level)
        .doc(Year)
        .collection("CourseNames")
        .orderBy("created")
        .get();

      querySnapshot.forEach((doc) => {
        const dataObj = doc.data();
        if (dataObj.userId == currentUser.uid) {
          data.push(doc.data());
        }
      });

      setSubjects(data);
      setFlag(true);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function EditcourseName(userId, CourseID, course, CourseNameID) {
    navigation.navigate("EditCourse", {
      Faculty: faculty,
      Department: department,
      Level: Level,
      Year: Year,
      CourseID: CourseNameID,
      UserId: userId,
      ID: CourseID,
      Course: course,
    });
  }

  function Delete(CourseID) {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete the Course?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteCourseName(CourseID) },
      ],
      { cancelable: false }
    );
  }

  function deleteCourseName(CourseID) {
    DeleteStoreCourseName(faculty, department, Level, Year, CourseID);
    getUserInfo();
    Refresh();
  }

  function Edit(userId, CourseID, course, CourseNameID) {
    Alert.alert(
      "Edit Post",
      "",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: () => EditcourseName(userId, CourseID, course, CourseNameID),
        },
        { text: "Delete", onPress: () => Delete(CourseID) },
      ],
      { cancelable: false }
    );
  }

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "85%,2)";
  };

  const handlePress = () => {
    navigation.navigate("AddCourse", { Year: Year, Level: Level });
  };

  function Refresh() {
    if (flag == true) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollScreen}>
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
                  Courses
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
            <View>
              <FlatList
                data={subjects}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.Box,
                      { borderBottomColor: "black", borderBottomWidth: 1 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CourseScreen", {
                          Faculty: faculty,
                          Department: department,
                          Level: Level,
                          Year: Year,
                          CoursenameID: item.CourseNameID,
                          CourseID: item.CourseID,
                          CourseName: item.course,
                        })
                      }
                    >
                      <View
                        style={[
                          styles.smallBox,
                          {
                            backgroundColor: generateRandomBrightestHSLColor(),
                          },
                        ]}
                      >
                        <Text>
                          <Entypo name="book" size={hp("10%")} color="black" />
                        </Text>
                        <Text
                          style={{ marginTop: hp("2%"), fontSize: hp("3%") }}
                        >
                          {item.course}
                        </Text>
                        <Text style={{ fontSize: hp("1.5%") }}>
                          {item.CourseNameID}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: hp("2%"),
                        marginLeft: hp("2%"),
                      }}
                    >
                      <Text
                        style={{ fontWeight: "bold", fontSize: hp("1.8%") }}
                      >
                        Entroll Key -{" "}
                      </Text>

                      <Text style={{ color: "red", fontSize: hp("1.8%") }}>
                        {item.EntrollKey}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        marginRight: wp("8%"),
                        marginTop: hp("1%"),
                        alignSelf: "flex-end",
                      }}
                      onPress={() =>
                        Edit(
                          item.userId,
                          item.CourseID,
                          item.course,
                          item.CourseNameID
                        )
                      }
                    >
                      <AntDesign name="edit" size={hp("3%")} color="#cdaffa" />
                      <Text style={{ fontSize: hp("1.4%") }}>Edit</Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "black",
                        fontSize: hp("1.2%"),
                        alignSelf: "flex-start",
                        marginLeft: hp("2%"),
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ height: hp("12%"), width: wp("100%") }}></View>
          </ScrollView>

          <View style={styles.AddIcon}>
            <Ionicons
              name="md-add-circle-sharp"
              size={hp("10%")}
              color="#cdaffa"
              onPress={handlePress}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  if (flag == true) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollScreen}>
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
                Courses
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
          <View>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.Box,
                    { borderBottomColor: "black", borderBottomWidth: 1 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CourseScreen", {
                        Faculty: faculty,
                        Department: department,
                        Level: Level,
                        Year: Year,
                        CoursenameID: item.CourseNameID,
                        CourseID: item.CourseID,
                        CourseName: item.course,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.smallBox,
                        { backgroundColor: generateRandomBrightestHSLColor() },
                      ]}
                    >
                      <Text>
                        <Entypo name="book" size={hp("10%")} color="black" />
                      </Text>
                      <Text style={{ marginTop: hp("2%"), fontSize: hp("3%") }}>
                        {item.course}
                      </Text>
                      <Text style={{ fontSize: hp("1.5%") }}>
                        {item.CourseNameID}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: hp("2%"),
                      marginLeft: hp("2%"),
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp("1.8%") }}>
                      Entroll Key -{" "}
                    </Text>

                    <Text style={{ color: "red", fontSize: hp("1.8%") }}>
                      {item.EntrollKey}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      marginRight: wp("8%"),
                      marginTop: hp("1%"),
                      alignSelf: "flex-end",
                    }}
                    onPress={() =>
                      Edit(
                        item.userId,
                        item.CourseID,
                        item.course,
                        item.CourseNameID
                      )
                    }
                  >
                    <AntDesign name="edit" size={hp("3%")} color="#cdaffa" />
                    <Text style={{ fontSize: hp("1.4%") }}>Edit</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "black",
                      fontSize: hp("1.2%"),
                      alignSelf: "flex-start",
                      marginLeft: hp("2%"),
                    }}
                  >
                    {item.dateAndTime}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ height: hp("12%"), width: wp("100%") }}></View>
        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={hp("10%")}
            color="#cdaffa"
            onPress={handlePress}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,

    backgroundColor: "white",
  },
  AddIcon: {
    position: "absolute",
    bottom: hp("1%"),
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  scrollScreen: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.001,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  Box: {
    width: wp("100%"),
    height: hp("46%"),
    marginTop: hp("1%"),
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  smallBox: {
    width: wp("100%"),
    alignItems: "center",
    height: hp("32%"),
    borderRadius: 15,
    justifyContent: "center",
  },
});
