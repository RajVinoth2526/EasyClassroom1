import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { Foundation } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ResultsScreen({ navigation }) {
  const [level1, setLevel1] = useState([]);
  const [level1GPA, setLevel1GPA] = useState(0);
  const [level2, setLevel2] = useState([]);
  const [level2GPA, setLevel2GPA] = useState(0);
  const [level3, setLevel3] = useState([]);
  const [level3GPA, setLevel3GPA] = useState(0);
  var [cumGap, setCumGap] = useState(0);
  const [academyYear, setAcademyYear] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  let currentUserUID = firebase.auth().currentUser.uid;

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  function CumlativeGPA(gpa1) {
    cumGap += gpa1 / 3;
    var n = cumGap.toFixed(3);
    setCumGap(n);
  }

  useEffect(() => {
    async function getUserInfo() {
      setFlag(true);
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();

        fetchLevel1Data(
          dataObj.academyYear,
          dataObj.indexNumber,
          dataObj.faculty,
          dataObj.course
        );
        fetchLevel2Data(
          dataObj.academyYear,
          dataObj.indexNumber,
          dataObj.faculty,
          dataObj.course
        );
        fetchLevel3Data(
          dataObj.academyYear,
          dataObj.indexNumber,
          dataObj.faculty,
          dataObj.course
        );
      }
    }
    getUserInfo();
  }, []);

  async function fetchLevel1Data(academyYear, indexNumber, faculty, course) {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(faculty + "-result");
    const querySnapshot1 = await querySnapshot
      .doc(course)
      .collection(academyYear)
      .doc("Level1")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel1(data);
    getGPALevel1(data);
    setFlag(false);
  }

  async function fetchLevel2Data(academyYear, indexNumber, faculty, course) {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(faculty + "-result");
    const querySnapshot1 = await querySnapshot
      .doc(course)
      .collection(academyYear)
      .doc("Level2")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel2(data);
    setFlag(false);
    getGPALevel2(data);
  }

  async function fetchLevel3Data(academyYear, indexNumber, faculty, course) {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(faculty + "-result");
    const querySnapshot1 = await querySnapshot
      .doc(course)
      .collection(academyYear)
      .doc("Level3")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel3(data);
    setFlag(false);
    getGPALevel3(data);
  }

  function getGPALevel1(data) {
    var gpa1 = 0;
    var credits = 0;

    {
      data.map((item) => {
        var x = Number(item.credits);
        if (item.result == "A+") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A-") {
          gpa1 += 3.7 * x;
          credits += x;
        } else if (item.result == "B+") {
          gpa1 += 3.3 * x;
          credits += x;
        } else if (item.result == "B") {
          gpa1 += 3.0 * x;
          credits += x;
        } else if (item.result == "B-") {
          gpa1 += 2.7 * x;
          credits += x;
        } else if (item.result == "C+") {
          gpa1 += 2.3 * x;
          credits += x;
        } else if (item.result == "C") {
          gpa1 += 2.0 * x;
          credits += x;
        } else if (item.result == "C-") {
          gpa1 += 1.7 * x;
          credits += x;
        } else if (item.result == "D+") {
          gpa1 += 1.3 * x;
          credits += x;
        } else if (item.result == "D") {
          gpa1 += 1.0 * x;
          credits += x;
        } else {
          gpa1 += 0.0 * x;
          credits += x;
        }

        var GPA1 = gpa1 / credits;

        setLevel1GPA(GPA1);
        setFlag(false);
        CumlativeGPA(GPA1);
        console.log(credits + " " + gpa1);
      });
    }
  }

  function getGPALevel2(data) {
    var gpa1 = 0;
    var credits = 0;

    {
      data.map((item) => {
        var x = Number(item.credits);
        if (item.result == "A+") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A-") {
          gpa1 += 3.7 * x;
          credits += x;
        } else if (item.result == "B+") {
          gpa1 += 3.3 * x;
          credits += x;
        } else if (item.result == "B") {
          gpa1 += 3.0 * x;
          credits += x;
        } else if (item.result == "B-") {
          gpa1 += 2.7 * x;
          credits += x;
        } else if (item.result == "C+") {
          gpa1 += 2.3 * x;
          credits += x;
        } else if (item.result == "C") {
          gpa1 += 2.0 * x;
          credits += x;
        } else if (item.result == "C-") {
          gpa1 += 1.7 * x;
          credits += x;
        } else if (item.result == "D+") {
          gpa1 += 1.3 * x;
          credits += x;
        } else if (item.result == "D") {
          gpa1 += 1.0 * x;
          credits += x;
        } else {
          gpa1 += 0.0 * x;
          credits += x;
        }

        var GPA1 = gpa1 / credits;
        console.log(credits + " " + gpa1);
        setFlag(false);
        setLevel2GPA(GPA1);
        CumlativeGPA(GPA1);
      });
    }

    return level1GPA;
  }

  function getGPALevel3(data) {
    var gpa1 = 0;
    var credits = 0;

    {
      data.map((item) => {
        var x = Number(item.credits);
        if (item.result == "A+") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A") {
          gpa1 += 4.0 * x;
          credits += x;
        } else if (item.result == "A-") {
          gpa1 += 3.7 * x;
          credits += x;
        } else if (item.result == "B+") {
          gpa1 += 3.3 * x;
          credits += x;
        } else if (item.result == "B") {
          gpa1 += 3.0 * x;
          credits += x;
        } else if (item.result == "B-") {
          gpa1 += 2.7 * x;
          credits += x;
        } else if (item.result == "C+") {
          gpa1 += 2.3 * x;
          credits += x;
        } else if (item.result == "C") {
          gpa1 += 2.0 * x;
          credits += x;
        } else if (item.result == "C-") {
          gpa1 += 1.7 * x;
          credits += x;
        } else if (item.result == "D+") {
          gpa1 += 1.3 * x;
          credits += x;
        } else if (item.result == "D") {
          gpa1 += 1.0 * x;
          credits += x;
        } else {
          gpa1 += 0.0 * x;
          credits += x;
        }

        var GPA1 = gpa1 / credits;
        console.log(credits + " " + gpa1);
        setLevel3GPA(GPA1);
        setFlag(false);
        CumlativeGPA(GPA1);
        setisLoading(true);
      });
    }
  }

  if (isLoading == true) {
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
              Results Sheet
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

        <View style={styles.GPA}>
          <View style={styles.CUMGPA}>
            <Text
              style={{
                fontSize: hp("2%"),
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Cumulative GPA
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                color: "#4c0370",
              }}
            >
              {cumGap}
            </Text>
          </View>

          <View style={{ marginLeft: wp("7%") }}>
            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                backgroundColor: "#e9c8fa",
                marginBottom: hp("1%"),
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level1 - {level1GPA}</Text>
            </View>

            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                marginBottom: hp("1%"),
                backgroundColor: "#e9c8fa",
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level2 - {level2GPA}</Text>
            </View>
            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                marginBottom: hp("1%"),
                backgroundColor: "#e9c8fa",
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level3 - {level3GPA}</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollScreen}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: hp("2%"),
              fontWeight: "bold",
              marginTop: hp("2%"),
            }}
          >
            {" "}
            Rsults
          </Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 1</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level1}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 2</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level2}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 3</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level3}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (flag == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  if (level1 == "" && level2 == "" && level3 == "") {
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
              Results Sheet
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

        <View style={styles.GPA}>
          <View style={styles.CUMGPA}>
            <Text
              style={{
                fontSize: hp("2%"),
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Cumulative GPA
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                color: "#4c0370",
              }}
            >
              {cumGap}
            </Text>
          </View>

          <View style={{ marginLeft: wp("7%") }}>
            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                backgroundColor: "#e9c8fa",
                marginBottom: hp("1%"),
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level1 - {level1GPA}</Text>
            </View>

            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                marginBottom: hp("1%"),
                backgroundColor: "#e9c8fa",
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level2 - {level2GPA}</Text>
            </View>
            <View
              style={{
                borderColor: "#cdaffa",
                justifyContent: "center",
                width: wp("40%"),
                borderRadius: 40,
                marginBottom: hp("1%"),
                backgroundColor: "#e9c8fa",
                borderWidth: 2,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Level3 - {level3GPA}</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollScreen}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: hp("2%"),
              fontWeight: "bold",
              marginTop: hp("2%"),
            }}
          >
            {" "}
            Rsults
          </Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 1</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level1}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 2</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level2}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Level 3</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnCourseHead}>
                <Text style={styles.textLineItemHead}>Course</Text>
              </View>
              <View style={styles.tableColumnResultHead}>
                <Text style={styles.textLineItemHead}>Result</Text>
              </View>
            </View>

            <FlatList
              data={level3}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableColumnCourse}>
                    <Text style={styles.textLineItem}>{item.course}</Text>
                  </View>
                  <View style={styles.tableColumnResult}>
                    <Text style={styles.textLineItem}>{item.result}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
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

    backgroundColor: "white",
  },
  GPA: {
    alignContent: "center",
    alignSelf: "center",
    width: wp("100%"),
    height: hp("30%"),
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  GPAL: {
    marginLeft: "10%",
    width: "98%",
    height: "20%",
    borderWidth: 2,
    borderColor: "#3495eb",
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: "5%",
    backgroundColor: "#b1dffc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  CUMGPA: {
    width: wp("60%"),
    height: hp("10%"),
    justifyContent: "center",
    marginBottom: hp("3%"),
    alignSelf: "center",
    marginLeft: wp("4%"),
    marginRight: wp("10%"),
    borderWidth: 3,
    borderColor: "#cdaffa",
    borderRadius: 60,
    backgroundColor: "#e9c8fa",
    marginTop: hp("1%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  scrollScreen: {
    marginTop: hp("3%"),

    width: wp("100%"),
    height: hp("75%"),
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },

  head: {
    flexDirection: "row",
    width: "90%",
  },
  tableColumnHeader: {
    alignItems: "center",
    backgroundColor: "#e9c8fa",
    flex: 5,
    padding: 10,
    justifyContent: "center",
  },
  tableColumnHeaderGPA: {
    alignItems: "center",
    backgroundColor: "#e9c8fa",
    flex: 5,
    padding: 10,
    justifyContent: "center",
  },
  tableColumnCourse: {
    alignItems: "center",
    backgroundColor: "#ecebed",
    flex: 3,
    justifyContent: "center",
    margin: 1,
  },
  tableColumnResult: {
    alignItems: "center",
    backgroundColor: "#d4a1ed",
    flex: 2,
    justifyContent: "center",
    margin: 1,
  },

  tableColumnCourseHead: {
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    flex: 3,
    justifyContent: "center",
    margin: 1,
  },
  tableColumnResultHead: {
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    flex: 2,
    justifyContent: "center",
    margin: 1,
  },

  tableColumnResultHeadGPA: {
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    flex: 2,
    justifyContent: "center",
    margin: 1,
  },
  tableRow: {
    flex: 5,
    flexDirection: "row",
    maxHeight: hp("3.7%"),
  },
  tableRowHeader: {
    flex: 5,
    flexDirection: "row",
    maxHeight: hp("10%"),
  },
  tableContainer: {
    backgroundColor: "#cdaffa",
    marginTop: hp("3%"),
    width: wp("96%"),
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: hp("2%"),
    flex: 1,
    padding: 3,
  },
  textHeader: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  textHeaderSubTitle: {
    color: "#000000",
    fontSize: 12,
  },
  textLineItemHead: {
    color: "black",
    fontSize: hp("2%"),
    fontWeight: "500",
  },
  textLineItem: {
    color: "#878a8c",
    fontSize: hp("1.9%"),
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
