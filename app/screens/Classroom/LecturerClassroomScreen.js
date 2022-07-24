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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { setRandomFallback } from "bcryptjs";
import { Entypo } from "@expo/vector-icons";
import Clipboard from '@react-native-clipboard/clipboard';
export default function LecturerClassroomScreen({ navigation , route }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");

 const {Year} = route.params;
  const {Level} = route.params;

  


  

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

  
  const currentUser = firebase.auth().currentUser;

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
        setDepartment(dataObj.department);
        setLoading(false);
        setisLoading(true);
        console.log("fsd");
      }
    }

    getUserInfo();
  }, []);

 

  useEffect(() => {
    async function fetchSubjects() {
      console.log(faculty);
      console.log(department);
      console.log(Level);
      console.log("fsd");
      const data = [];
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("CoursesName-" +faculty)
        .doc(department)
        .collection(Level)
        .doc(Year)
        .collection("CourseNames")
        .orderBy("created")
        .get();

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
     
      setSubjects(data);
      setFlag(true);
      setisLoading(false);
    }

    if (loading == false) fetchSubjects();
  }, [loading]);

  

  if (isloading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }

  

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "85%,2)";
  };

  const handlePress = () => {
    navigation.navigate("AddCourse", { Year: Year, Level: Level });
  };

  if(flag == true){
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollScreen}>
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
                <TouchableOpacity onPress={() => navigation.navigate("CourseScreen",{Faculty : faculty,Department : department,Level :Level, Year : Year,CoursenameID :item.CourseNameID,CourseID : item.CourseID,CourseName: item.course})} >
                  <View
                    style={[
                      styles.smallBox,
                      { backgroundColor: generateRandomBrightestHSLColor() },
                    ]}
                  >
                    <Text>
                      <Entypo name="book" size={70} color="black" />
                    </Text>
                    <Text
                      style={{ marginTop: "5%", fontSize: 20, padding: 10 }}
                    >
                      {item.course}
                    </Text>
                    <Text style={{fontSize:13,}}>{item.CourseNameID}</Text>
                  </View>
                </TouchableOpacity>
              
              <View style ={{ flexDirection: "row",paddingTop:20,paddingLeft:15}}>
              <Text style={{fontWeight:"bold",fontSize:15}}>Entroll Key - </Text> 
              
              <Text style={{color:'red'}}>{item.EntrollKey}</Text>
              
             
              </View>
              <Text style={{color:'black' ,fontSize:8 ,alignSelf:'flex-end',paddingRight:20}}>{item.dateAndTime}</Text>
                
                
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>

      <View style={styles.AddIcon}>
        <Ionicons
          name="md-add-circle-sharp"
          size={70}
          color="#03dffc"
          onPress={handlePress}
        />
      </View>
    </View>
  );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#03befc" size="large" />
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
    bottom: "25%",
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
  homeContentText: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
  },
  Msg: {
    marginLeft: "5%",
    marginBottom: "5%",
    marginRight: "5%",
    marginTop: "5%",

    borderRadius: 5,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: "5%",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  Name: {
    alignSelf: "center",
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: 15,
  },
  head: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#03dffc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  msg: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#03dffc",
    borderRadius: 10,
    padding: 10,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: 200,
    width: 300,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  Box: {
    width: "100%",
    borderRadius: 15,
    marginBottom:'4%',
    paddingBottom: 10,

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
