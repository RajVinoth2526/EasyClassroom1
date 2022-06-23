import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
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
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { DeleteNotice } from "../../../../API/firebaseMethods/firebaseMethod";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PostScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");
  const NoticeType = "Department";

  let currentUserUID = firebase.auth().currentUser.uid;

  function editNotice(ID) {
    navigation.navigate("EditNotice", { PostId: ID, Type: NoticeType });
  }

  function deleteNotice(id) {
    DeleteNotice(id);
    Alert.alert("Notice deleted!");
    navigation.replace("Dashboard");
  }

  function ButtonEdit(PostID, PostUserID) {
    if (currentUserUID == PostUserID) {
      Alert.alert(
        "Edit Post",
        "",

        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Edit", onPress: () => editNotice(PostID) },
          { text: "Delete", onPress: () => Delete(PostID) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("only Your can edit your own post ");
    }
  }

  function Delete(PostID) {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete the Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteNotice(PostID) },
      ],
      { cancelable: false }
    );
  }

  const handlePress = () => {
    navigation.navigate("AddNotice", { type: NoticeType });
  };

  useEffect(() => {
    async function fetchSubjects() {
      const data = [];

      const db = firebase.firestore();
      const querySnapshot = await db.collection("Notices").get();
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const dataObj = doc.data();
        if (dataObj.type == "Department") {
          data.push(doc.data());
        }
      });

      setSubjects(data);
    }

    fetchSubjects();
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
        setRole(dataObj.role);
      }
    }
    getUserInfo();
  });

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "90%,2)";
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (role == "Lecturer") {
    return (
      <ScrollView style={styles.scrollScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ marginTop: 30, marginBottom: 15, alignSelf: "center" }}>
        <Text style={{ fontSize: 20 }}>
          <Octicons name="note" size={25} color="#34dbeb" /> Department
          Noticeboard
        </Text>
      </View>

      <View style={styles.AddIcon}>
        <TouchableOpacity onPress={handlePress}>
          <MaterialIcons name="add-circle" size={50} color="#03dffc" />
        </TouchableOpacity>
      </View>

     

      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <View style={[styles.Box]}>
            <View style={styles.head}>
              <Image
                source={{ uri: item.ProfileUrl }}
                style={{
                  marginLeft: "5%",
                  marginTop: "2%",
                  height: 41,
                  width: 41,
                  borderWidth: 1.5,

                  borderRadius: 50,
                }}
              />

              <Text style={styles.Name}>
                {item.firstName} {item.lastName}
              </Text>

              <View  style ={{marginLeft :'38%',marginTop:'2%'}}>
                <TouchableOpacity onPress={() => Edit(item.id, item.UserID)}>
                  <AntDesign name="edit" size={20} color="#03dffc" />
                  <Text style={{ fontSize: 8 }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>


                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
                  <Text style={styles.msgText}>
                    {item.firstName} {item.lastName}
                  </Text>

                  <Text style={styles.msgText}>{item.DateTime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

       
    );
  } else if (role == "Demo") {
    return (
      <ScrollView style={styles.scrollScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ marginTop: 30, marginBottom: 15, alignSelf: "center" }}>
        <Text style={{ fontSize: 20 }}>
          <Octicons name="note" size={25} color="#34dbeb" /> Department
          Noticeboard
        </Text>
      </View>

     

     

      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <View style={[styles.Box]}>
            <View style={styles.head}>
              <Image
                source={{ uri: item.ProfileUrl }}
                style={{
                  marginLeft: "5%",
                  marginTop: "2%",
                  height: 41,
                  width: 41,
                  borderWidth: 1.5,

                  borderRadius: 50,
                }}
              />

              <Text style={styles.Name}>
                {item.firstName} {item.lastName}
              </Text>

              <View  style ={{marginLeft :'38%',marginTop:'2%'}}>
                <TouchableOpacity onPress={() => Edit(item.id, item.UserID)}>
                  <AntDesign name="edit" size={20} color="#03dffc" />
                  <Text style={{ fontSize: 8 }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>


                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
                  <Text style={styles.msgText}>
                    {item.firstName} {item.lastName}
                  </Text>

                  <Text style={styles.msgText}>{item.DateTime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>    
  );
  }else if (role == "Student") {
    return (
      <ScrollView style={styles.scrollScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ marginTop: 30, marginBottom: 15, alignSelf: "center" }}>
        <Text style={{ fontSize: 20 }}>
          <Octicons name="note" size={25} color="#34dbeb" /> Department
          Noticeboard
        </Text>
      </View>

     

     

      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <View style={[styles.Box]}>
            <View style={styles.head}>
              <Image
                source={{ uri: item.ProfileUrl }}
                style={{
                  marginLeft: "5%",
                  marginTop: "2%",
                  height: 41,
                  width: 41,
                  borderWidth: 1.5,

                  borderRadius: 50,
                }}
              />

              <Text style={styles.Name}>
                {item.firstName} {item.lastName}
              </Text>

              <View  style ={{marginLeft :'38%',marginTop:'2%'}}>
                <TouchableOpacity onPress={() => Edit(item.id, item.UserID)}>
                  <AntDesign name="edit" size={20} color="#03dffc" />
                  <Text style={{ fontSize: 8 }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>


                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
                  <Text style={styles.msgText}>
                    {item.firstName} {item.lastName}
                  </Text>

                  <Text style={styles.msgText}>{item.DateTime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>    
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
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  scrollScreen: {
    height:'100%',
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
    marginBottom: 15,
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
  Box: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 1,
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
  Msg: {
    marginLeft: 30,
    marginTop: 20,
    marginRight: 30,

    borderRadius: 2,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: 30,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  msgText: {
    marginLeft: 150,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  msg: {
    fontSize: 15,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  Name: {
   alignSelf:'center',
   marginLeft :'5%',
   fontSize : 18
  },
});
