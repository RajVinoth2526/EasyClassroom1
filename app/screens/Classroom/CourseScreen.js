import React, { useState, useEffect } from "react";
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
  FlatList,
  StatusBar,
  Linking,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";
import HyperlinkedText from "react-native-hyperlinked-text";
import { useFocusEffect } from "@react-navigation/native";

import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { DeleteStoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
export default function CourseScreen({ navigation, route }) {
  const [role, setRole] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjects1, setSubjects1] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const currentUser = firebase.auth().currentUser;

  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseID } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { Year } = route.params;
  const { UserID } = route.params;

  console.log(Faculty);
  console.log(Department);
  console.log(Level);
  console.log(CourseID);
  console.log(CourseName);
  console.log(CoursenameID);
  console.log(Year);
  console.log("ar");

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  React.useEffect(() => {
    getUserInfo();
    fetchSubjects();
    fetchSubjects1();
    Refresh();
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
      fetchSubjects();
      fetchSubjects1();
      Refresh();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("ClassroomWelcome");

        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

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

      console.log("fsd");
    }
  }

  async function fetchSubjects() {
    const data = [];
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("Courses-" + Faculty)
      .doc(Department)
      .collection(Level)
      .doc(Year)
      .collection(CourseID)
      .doc(CourseID)
      .collection(currentUser.uid)
      .orderBy("created")
      .get();

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setSubjects(data);
  }

  async function fetchSubjects1() {
    const data = [];
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("Courses-" + Faculty)
      .doc(Department)
      .collection(Level)
      .doc(Year)
      .collection(CourseID)
      .doc(CourseID)
      .collection(UserID)
      .orderBy("created")
      .get();

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setSubjects1(data);
  }

  useEffect(() => {
    getUserInfo();
    fetchSubjects();
    fetchSubjects1();
  }, []);

  const handlePress = () => {
    navigation.navigate("CourseContent", {
      Faculty: Faculty,
      Department: Department,
      Level: Level,
      CourseID: CourseID,
      CourseName: CourseName,
      CoursenameID: CoursenameID,
      Year: Year,
    });
  };

  function editCourse(
    Id,
    userId,
    course,
    CourseNameID,
    title,
    instruction,
    document
  ) {
    navigation.navigate("EditCourseContent", {
      ID: Id,
      UserID: userId,
      Faculty: Faculty,
      Department: Department,
      Level: Level,
      Year: Year,
      Course: course,
      CourseID: CourseID,
      CourseNameID: CourseNameID,
      title: title,
      instruction: instruction,
      document: document,
    });
  }

  function Edit(
    Id,
    userId,
    course,
    CourseNameID,
    title,
    instruction,
    document
  ) {
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
          onPress: () =>
            editCourse(
              Id,
              userId,
              course,
              CourseNameID,
              title,
              instruction,
              document
            ),
        },
        { text: "Delete", onPress: () => Delete(Id, userId) },
      ],
      { cancelable: false }
    );
  }

  function deleteCourse(Id, userId) {
    DeleteStoreCourse(Id, userId, Faculty, Department, Level, Year, CourseID);
    getUserInfo();
    fetchSubjects();
    fetchSubjects1();
    Refresh();
  }

  function Delete(Id, userId) {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete the CourseContent?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteCourse(Id, userId) },
      ],
      { cancelable: false }
    );
  }

  function Refresh() {
    if (role == "Lecturer") {
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
                  fontSize: hp("2.3%"),
                  fontWeight: "500",
                  alignSelf: "center",
                }}
              >
                {CourseName}
              </Text>
              <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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

          <ScrollView style={styles.scrollScreen}>
            <View>
              <FlatList
                data={subjects}
                renderItem={({ item }) => (
                  <View style={[styles.Box]}>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontSize: hp("2%"),
                        fontWeight: "bold",
                      }}
                    >
                      <Entypo name="book" size={hp("2%")} color="black" />{" "}
                      {item.title}
                    </Text>
                    <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                      {item.instruction}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: hp("1.5%"),
                        paddingTop: 20,
                      }}
                    >
                      Document Link
                    </Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.document)}
                    >
                      <Text
                        style={{
                          paddingLeft: 10,
                          paddingTop: 10,
                          fontSize: hp("2%"),
                          color: "red",
                        }}
                      >
                        <FontAwesome5
                          name="link"
                          size={hp("1.5%")}
                          color="red"
                        />{" "}
                        Link
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginRight: wp("8%"),
                        marginTop: hp("1%"),
                        alignSelf: "flex-end",
                      }}
                      onPress={() =>
                        Edit(
                          item.Id,
                          item.userId,
                          item.course,
                          item.CourseNameID,
                          item.title,
                          item.instruction,
                          item.document
                        )
                      }
                    >
                      <AntDesign name="edit" size={hp("3%")} color="#cdaffa" />
                      <Text style={{ fontSize: hp("1.4%") }}>Edit</Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        fontSize: hp("1%"),
                        marginLeft: wp("3%"),
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ height: hp("13%"), width: wp("100%") }}></View>
          </ScrollView>

          <View style={styles.AddIcon}>
            <Ionicons
              name="md-add-circle-sharp"
              size={70}
              color="#cdaffa"
              onPress={handlePress}
            />
          </View>
        </View>
      );
    } else if (role == "Student") {
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
                  fontSize: hp("2.3%"),
                  fontWeight: "500",
                  alignSelf: "center",
                }}
              >
                {CourseName}
              </Text>
              <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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
          <ScrollView style={styles.scrollScreen}>
            <View>
              <FlatList
                data={subjects1}
                renderItem={({ item }) => (
                  <View style={[styles.Box]}>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontSize: hp("2%"),
                        fontWeight: "bold",
                      }}
                    >
                      <Entypo name="book" size={hp("2%")} color="black" />{" "}
                      {item.title}
                    </Text>
                    <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                      {item.instruction}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: hp("1.5%"),
                        paddingTop: 20,
                      }}
                    >
                      Document Link
                    </Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.document)}
                    >
                      <Text
                        style={{
                          paddingLeft: 10,
                          paddingTop: 10,
                          fontSize: hp("2%"),
                          color: "red",
                        }}
                      >
                        <FontAwesome5
                          name="link"
                          size={hp("1.5%")}
                          color="red"
                        />{" "}
                        Link
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        fontSize: hp("1%"),
                        marginLeft: wp("3%"),
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        </View>
      );
    } else if (role == "Demonstrator") {
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
                fontSize: hp("2.3%"),
                fontWeight: "500",
                alignSelf: "center",
              }}
            >
              {CourseName}
            </Text>
            <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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
        <ScrollView style={styles.scrollScreen}>
          <View>
            <FlatList
              data={subjects1}
              renderItem={({ item }) => (
                <View style={[styles.Box]}>
                  <Text
                    style={{
                      paddingBottom: 20,
                      fontSize: hp("2%"),
                      fontWeight: "bold",
                    }}
                  >
                    <Entypo name="book" size={hp("2%")} color="black" />{" "}
                    {item.title}
                  </Text>
                  <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                    {item.instruction}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: hp("1.5%"),
                      paddingTop: 20,
                    }}
                  >
                    Document Link
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.document)}
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        fontSize: hp("2%"),
                        color: "red",
                      }}
                    >
                      <FontAwesome5 name="link" size={hp("1.5%")} color="red" />{" "}
                      Link
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      fontSize: hp("1%"),
                      marginLeft: wp("3%"),
                    }}
                  >
                    {item.dateAndTime}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>;
    }
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  if (role == "Lecturer") {
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
                fontSize: hp("2.3%"),
                fontWeight: "500",
                alignSelf: "center",
              }}
            >
              {CourseName}
            </Text>
            <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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

        <ScrollView style={styles.scrollScreen}>
          <View>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <View style={[styles.Box]}>
                  <Text
                    style={{
                      paddingBottom: 20,
                      fontSize: hp("2%"),
                      fontWeight: "bold",
                    }}
                  >
                    <Entypo name="book" size={hp("2%")} color="black" />{" "}
                    {item.title}
                  </Text>
                  <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                    {item.instruction}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: hp("1.5%"),
                      paddingTop: 20,
                    }}
                  >
                    Document Link
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.document)}
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        fontSize: hp("2%"),
                        color: "red",
                      }}
                    >
                      <FontAwesome5 name="link" size={hp("1.5%")} color="red" />{" "}
                      Link
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginRight: wp("8%"),
                      marginTop: hp("1%"),
                      alignSelf: "flex-end",
                    }}
                    onPress={() =>
                      Edit(
                        item.Id,
                        item.userId,
                        item.course,
                        item.CourseNameID,
                        item.title,
                        item.instruction,
                        item.document
                      )
                    }
                  >
                    <AntDesign name="edit" size={hp("3%")} color="#cdaffa" />
                    <Text style={{ fontSize: hp("1.4%") }}>Edit</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      fontSize: hp("1%"),
                      marginLeft: wp("3%"),
                    }}
                  >
                    {item.dateAndTime}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ height: hp("13%"), width: wp("100%") }}></View>
        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={70}
            color="#cdaffa"
            onPress={handlePress}
          />
        </View>
      </View>
    );
  } else if (role == "Student") {
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
                fontSize: hp("2.3%"),
                fontWeight: "500",
                alignSelf: "center",
              }}
            >
              {CourseName}
            </Text>
            <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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
        <ScrollView style={styles.scrollScreen}>
          <View>
            <FlatList
              data={subjects1}
              renderItem={({ item }) => (
                <View style={[styles.Box]}>
                  <Text
                    style={{
                      paddingBottom: 20,
                      fontSize: hp("2%"),
                      fontWeight: "bold",
                    }}
                  >
                    <Entypo name="book" size={hp("2%")} color="black" />{" "}
                    {item.title}
                  </Text>
                  <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                    {item.instruction}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: hp("1.5%"),
                      paddingTop: 20,
                    }}
                  >
                    Document Link
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.document)}
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        fontSize: hp("2%"),
                        color: "red",
                      }}
                    >
                      <FontAwesome5 name="link" size={hp("1.5%")} color="red" />{" "}
                      Link
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      fontSize: hp("1%"),
                      marginLeft: wp("3%"),
                    }}
                  >
                    {item.dateAndTime}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  } else if (role == "Demonstrator") {
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
              fontSize: hp("2.3%"),
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            {CourseName}
          </Text>
          <Text style={{ alignSelf: "center" }}>- {CoursenameID} -</Text>
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
      <ScrollView style={styles.scrollScreen}>
        <View>
          <FlatList
            data={subjects1}
            renderItem={({ item }) => (
              <View style={[styles.Box]}>
                <Text
                  style={{
                    paddingBottom: 20,
                    fontSize: hp("2%"),
                    fontWeight: "bold",
                  }}
                >
                  <Entypo name="book" size={hp("2%")} color="black" />{" "}
                  {item.title}
                </Text>
                <Text style={{ paddingLeft: 10, paddingBottom: 10 }}>
                  {item.instruction}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: hp("1.5%"),
                    paddingTop: 20,
                  }}
                >
                  Document Link
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.document)}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      fontSize: hp("2%"),
                      color: "red",
                    }}
                  >
                    <FontAwesome5 name="link" size={hp("1.5%")} color="red" />{" "}
                    Link
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontSize: hp("1%"),
                    marginLeft: wp("3%"),
                  }}
                >
                  {item.dateAndTime}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>;
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

    backgroundColor: "white",
  },
  AddIcon: {
    position: "absolute",
    bottom: 10,
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
  homeContent: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: "2%",
    backgroundColor: "#f2ffff",
    height: 120,
    width: 290,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 8,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  Box: {
    width: wp("94%"),
    alignSelf: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderColor: "#cdaffa",
    borderRadius: 30,
    paddingBottom: 10,
    marginBottom: "8%",

    backgroundColor: "white",
  },
  smallBox: {
    width: "100%",
    alignItems: "center",
    borderRadius: 15,
    padding: 50,
    marginTop: 0,
  },
});
