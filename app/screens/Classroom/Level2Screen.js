import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";
import { greaterOrEq } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { StudentEntroll } from "../../../API/firebaseMethods/firebaseMethod";

export default function Level2Screen({ navigation }) {
  const [role, setRole] = useState("");
  const [flag, setFlag] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [AcademyYear, setAcademyYear] = useState([]);
  const Year = "2021|2022";

  const level2 = "Level2";
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [year, setYear] = useState("");

  const currentUser = firebase.auth().currentUser;

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  useEffect(() => {
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
        setDepartment(dataObj.course);
        setYear(dataObj.academyYear);
        setLoading(false);
        setisLoading(true);
        console.log("fsd");
      }
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    async function getYear() {
      const data = [];
      const querySnapshot = await firebase
        .firestore()
        .collection("AcademyYearForStudents")
        .get();

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAcademyYear(data);
    }

    getYear();
  }, []);

  useEffect(() => {
    async function fetchSubjects() {
      console.log(faculty);
      console.log(department);
      console.log(level2);
      console.log(year);
      const data = [];
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("CoursesName-" + faculty)
        .doc(department)
        .collection(level2)
        .doc(year)
        .collection("CourseNames")
        .orderBy("created")
        .get();

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setSubjects(data);
      setisLoading(false);
    }

    if (loading == false) fetchSubjects();
  }, [loading]);

  async function CheckEntoll(
    courseid,
    Entroll,
    CourseName,
    CoursenameID,
    UserID
  ) {
    let doc = await firebase
      .firestore()
      .collection("entrollment")
      .doc(currentUser.uid)
      .collection("course")
      .doc(courseid)
      .get();

    console.log("fgwrdfsweiusdfiweg" + courseid);

    if (!doc.exists) {
      navigation.navigate("EntrollScreen", {
        Password: Entroll,
        Faculty: faculty,
        Department: department,
        Level: level2,
        Year: year,
        CourseID: courseid,
        CourseName: CourseName,
        CoursenameID: CoursenameID,
        UserID: UserID,
      });
    } else {
      navigation.navigate("CourseScreen", {
        Faculty: faculty,
        Department: department,
        Level: level2,
        CourseID: courseid,
        CourseName: CourseName,
        CoursenameID: CoursenameID,
        Year: year,
        UserID: UserID,
      });
    }
  }

  if (isloading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  function handlePress(year) {
    navigation.navigate("LecturerClassroom", { Year: year, Level: level2 });
  }

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "85%,2)";
  };

  if (role == "Lecturer") {
    return (
      <ScrollView
        style={{
          height: hp("100%"),
          width: wp("100%"),
          backgroundColor: "white",
        }}
      >
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
              AcademyYear
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

        <FlatList
          data={AcademyYear}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.box}
              onPress={() => handlePress(item.year)}
            >
              <Text style={{ fontSize: hp("3%"), alignSelf: "center" }}>
                {item.year}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }

  if (role == "Demonstrator") {
    return (
      <ScrollView
        style={{
          height: hp("100%"),
          width: wp("100%"),
          backgroundColor: "white",
        }}
      >
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
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <View
              style={[
                styles.Box,
                { borderBottomColor: "black", borderBottomWidth: 0.5 },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  CheckEntoll(
                    item.CourseID,
                    item.EntrollKey,
                    item.course,
                    item.CourseNameID,
                    item.userId
                  )
                }
              >
                <View
                  style={[
                    styles.smallBox,
                    { backgroundColor: generateRandomBrightestHSLColor() },
                  ]}
                >
                  <Text>
                    <Entypo name="book" size={hp("11%")} color="black" />
                  </Text>
                  <Text style={{ marginTop: hp("2%"), fontSize: hp("2.5%") }}>
                    {item.course}
                  </Text>
                  <Text style={{ fontSize: hp("1.8%") }}>
                    {item.CourseNameID}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  fontSize: hp("1%"),
                  alignSelf: "flex-end",
                  marginRight: hp("2%"),
                  marginTop: hp("2%"),
                }}
              >
                {item.dateAndTime}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }

  if (role == "Student") {
    return (
      <ScrollView
        style={{
          height: hp("100%"),
          width: wp("100%"),
          backgroundColor: "white",
        }}
      >
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
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <View
              style={[
                styles.Box,
                { borderBottomColor: "black", borderBottomWidth: 0.5 },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  CheckEntoll(
                    item.CourseID,
                    item.EntrollKey,
                    item.course,
                    item.CourseNameID,
                    item.userId
                  )
                }
              >
                <View
                  style={[
                    styles.smallBox,
                    { backgroundColor: generateRandomBrightestHSLColor() },
                  ]}
                >
                  <Text>
                    <Entypo name="book" size={hp("11%")} color="black" />
                  </Text>
                  <Text style={{ marginTop: hp("2%"), fontSize: hp("2.5%") }}>
                    {item.course}
                  </Text>
                  <Text style={{ fontSize: hp("1.8%") }}>
                    {item.CourseNameID}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  fontSize: hp("1%"),
                  alignSelf: "flex-end",
                  marginRight: hp("2%"),
                  marginTop: hp("2%"),
                }}
              >
                {item.dateAndTime}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: hp("38%"),
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
  box: {
    backgroundColor: "#edaffa",
    height: hp("9%"),
    width: wp("80%"),
    borderRadius: 15,
    marginBottom: hp("1%"),
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
});
