import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { Foundation } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

export default function ResultsScreen({ navigation }) {
  const [level1, setLevel1] = useState([]);
  const [level1GPA, setLevel1GPA] = useState("");
  const [level2, setLevel2] = useState([]);
  const [level2GPA, setLevel2GPA] = useState("");
  const [level3, setLevel3] = useState([]);
  const [level3GPA, setLevel3GPA] = useState("");
  const [CumGPA, setCumGPA] = useState("");
  const [academyYear, setAcademyYear] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [isLoading, setisLoading] = useState(false);

  let currentUserUID = firebase.auth().currentUser.uid;

  function fetchLevelData(){
    
    fetchLevel1Data();
    fetchLevel2Data();
    fetchLevel3Data();
    
    
  }

  function CumlativeGPA(){

    var CumulGPA  = (level1GPA + level1GPA + level3GPA)/3;
    setCumGPA(CumulGPA);
  }




   



  async function fetchLevel1Data() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(academyYear);
    const querySnapshot1 = await querySnapshot
      .doc("Level1")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel1(data);
  }

  async function fetchLevel2Data() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(academyYear);
    const querySnapshot1 = await querySnapshot
      .doc("Level2")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel2(data);
  }

  async function fetchLevel3Data() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(academyYear);
    const querySnapshot1 = await querySnapshot
      .doc("Level3")
      .collection(indexNumber)
      .get();
    querySnapshot1.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setLevel3(data);
  }


  function getGPALevel1(){

    var gpa1 = 0;
    var credits = 0;

    {level1.map(item => {
      

      var x = Number(item.credits)
      if(item.result == 'A'){
        
        gpa1 += 4*x;
        credits += x;
      }else if(item.result == 'A-'){
        gpa1 += 3.67*x;
        credits += x;

      }

      var GPA1 = gpa1/credits;
      console.log(credits +" "+ gpa1);
      setLevel1GPA(GPA1); 



    })};

  }

  function getGPALevel2(){

    var gpa1 = 0;
    var credits = 0;

    {level2.map(item => {
      

      var x = Number(item.credits)
      if(item.result == 'A'){
        
        gpa1 += 4*x;
        credits += x;
      }else if(item.result == 'A-'){
        gpa1 += 3.67*x;
        credits += x;

      }

      var GPA1 = gpa1/credits;
      console.log(credits +" "+ gpa1);
      setLevel2GPA(GPA1); 



    })};

  }

  function getGPALevel3(){

    var gpa1 = 0;
    var credits = 0;

    {level3.map(item => {
      

      var x = Number(item.credits)
      if(item.result == 'A'){
        
        gpa1 += 4*x;
        credits += x;
      }else if(item.result == 'A-'){
        gpa1 += 3.67*x;
        credits += x;

      }

      var GPA1 = gpa1/credits;
      console.log(credits +" "+ gpa1);
      setLevel3GPA(GPA1); 



    })};

  }





  

  useEffect(() => {
    fetchLevel1Data();
    fetchLevel2Data();
    fetchLevel3Data();
    
    
    
  }, []);

  useEffect(() => {
    async function getUserInfo() {
     
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setAcademyYear(dataObj.academyYear);
        setIndexNumber(dataObj.indexNumber);
      }
    }
    getUserInfo();
    getGPALevel1();
    getGPALevel2();
    getGPALevel3();
    CumlativeGPA();
    
   
  });

  
  return (
    <View style={styles.container}>
      <View style={styles.GPA}>
        <View style = {{  flexDirection: "row",}}>
        <View style={styles.CUMGPA}>
          <Text>Cumulative GPA</Text>
          <Text style ={{alignSelf :'center' ,fontWeight: "bold",color :'blue'}}>{CumGPA}</Text>
          
        </View>

        <View style={{ marginTop :'15%' }}>
        <TouchableOpacity onPress={fetchLevelData}>
          <View style={{ alignSelf: "center" }}>
            <Foundation name="refresh" size={40} color="blue" />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 10 }}>
            refresh here
          </Text>
        </TouchableOpacity>

      </View>

      </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableRowHeader}>
            <View style={styles.tableColumnHeaderGPA}>
              <Text style={styles.textHeader}>GPA</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumnCourseHead}>
              <Text style={styles.textLineItemHead}>Level1</Text>
            </View>
            <View style={styles.tableColumnResultHead}>
              <Text style={styles.textLineItemHead}>{level1GPA}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColumnCourseHead}>
              <Text style={styles.textLineItemHead}>Level2</Text>
            </View>
            <View style={styles.tableColumnResultHead}>
              <Text style={styles.textLineItemHead}>{level2GPA}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColumnCourseHead}>
              <Text style={styles.textLineItemHead}>Level3</Text>
            </View>
            <View style={styles.tableColumnResultHead}>
              <Text style={styles.textLineItemHead}>{level3GPA}</Text>
            </View>
          </View>

         

  
        </View>

       
      
        
       

       
     
      </View>
     
      <ScrollView style={styles.scrollScreen}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,

    backgroundColor: "white",
  },
  GPA: {
    alignContent:'center',
    width: "100%",
    height: "45%",
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom :'5%',
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
    marginLeft:'10%',
    width : '100%',
    height : '20%',
    borderWidth:2,
    borderColor:'#3495eb',
    borderRadius: 5,
    alignSelf:'center',
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
    padding: 40,
    marginLeft : '5%',
    marginRight:'10%',
    borderWidth:3,
    borderColor:'#3495eb',
    borderRadius: 60,
    backgroundColor: "white",
    
    marginBottom: "5%",
    backgroundColor: "#b1dffc",
    marginTop: "5%",
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
    marginTop: "4%",
    width: "100%",
    height: "75%",
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
    backgroundColor: "#b1dffc",
    flex: 5,
    padding:10,
    justifyContent: "center",
  },
  tableColumnHeaderGPA: {
    alignItems: "center",
    backgroundColor: "#3495eb",
    flex: 5,
    padding:10,
    justifyContent: "center",
  },
  tableColumnCourse: {
    alignItems: "center",
    backgroundColor: "#d7e7f5",
    flex: 3,
    justifyContent: "center",
    margin: 1,
  },
  tableColumnResult: {
    alignItems: "center",
    backgroundColor: "#9ccdf7",
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
    maxHeight: 30,
  },
  tableRowHeader: {
    flex: 5,
    flexDirection: "row",
    maxHeight: 40,
  },
  tableContainer: {
    backgroundColor: "#3495eb",
    borderRadius: 5,
    marginBottom: "2%",
    flex: 1,
    marginTop: 0,
    padding: 3,
  },
  textHeader: {
    color: "#000000",
    fontWeight: "bold",
    fontSize:15,
  },
  textHeaderSubTitle: {
    color: "#000000",
    fontSize: 12,
  },
  textLineItemHead: {
    color: "black",
    fontSize:18,
  },
  textLineItem: {
    color: "#878a8c",
    fontSize:15,
    
  },
});
