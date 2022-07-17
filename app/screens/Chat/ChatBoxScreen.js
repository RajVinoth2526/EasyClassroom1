import React, { useState, useEffect , } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  BackHandler
} from "react-native";
import {
  useFocusEffect
 } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import * as firebase from "firebase";
import { FontAwesome } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { StoreSendMessage } from "../../../API/firebaseMethods/firebaseMethod";
import { StoreReceiveMessage } from "../../../API/firebaseMethods/firebaseMethod";
import { StoreReceivedID } from "../../../API/firebaseMethods/firebaseMethod";

export default function ChatBoxScreen({ navigation, route }) {
  
  const { ReceiverID } = route.params;
  const { ReceiverUrl } = route.params;
  const { ReceiverFirstName } = route.params;
  const { ReceiverLastName } = route.params;
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoURL] = useState("");
  const [role, setRole] = useState("");
  const [messages, setMessages] = useState("");
  const [messages1, setMessages1] = useState("");
  
  const [type1, setType1] = useState("msg");
  const [type2, setType2] = useState("replay");
  

  const ID = uuid.v4();

  let currentUserUID = firebase.auth().currentUser.uid;

  async function fetchSubjects1() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("messages")
      .doc(currentUserUID)
      .collection(ReceiverID)
      .orderBy("created")
      .get();
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setMessages(data);
  }

  async function fetchSubjects() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("messages")
      .doc(ReceiverID)
      .collection(currentUserUID)
      .orderBy("created")
      .get();
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setMessages1(data);
  }

  useEffect(() => {
    fetchSubjects1();
    fetchSubjects();
  }, []);

  useEffect(() => {
    async function getPhotoUrl() {
      let doc = await firebase
        .firestore()
        .collection(role)
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setPhotoURL(dataObj.ProfileUrl);
      }
    }
    getPhotoUrl();
  });

  useEffect(() => {
    async function getMessageInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName);
        setLastName(dataObj.lastName);
        setRole(dataObj.role);
      }
    }
    getMessageInfo();
  });

  function handlePress() {
    if (!message) {
      Alert.alert("message require");
    } else {
      StoreSendMessage(
        ID,
        type1,
        message,
        currentUserUID,
        ReceiverID,
        ReceiverFirstName,
        ReceiverLastName,
        ReceiverUrl
      );
      StoreSendMessage(
        ID,
        type2,
        message,
        ReceiverID,
        currentUserUID,
        ReceiverFirstName,
        ReceiverLastName,
        ReceiverUrl
      );

      StoreReceivedID(
        currentUserUID,
        ReceiverID,
        ReceiverFirstName,
        ReceiverLastName,
        ReceiverUrl
      );
      StoreReceivedID(
        ReceiverID,
        currentUserUID,
        firstName,
        lastName,
        photoUrl
      );
      refresh();
      setMessage("");
    }
  }

  function refresh() {
    fetchSubjects1();
    fetchSubjects();
  }

  

 


  useFocusEffect(
    React.useCallback(() => {    
      const onBackPress = () => {
        navigation.navigate('Chat');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };
 
      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
 
      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );


function RefreshPage(){
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.Box]}>
        <View style={styles.HEAD}>
          <Image
            source={{ uri: ReceiverUrl }}
            style={{
              marginLeft: "5%",
              height: 41,
              width: 41,
              borderWidth: 1.5,

              borderRadius: 50,
            }}
          />

          <Text style={styles.Name}>
            {ReceiverFirstName} {ReceiverLastName}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ width: "95%", alignSelf: "center", marginBottom: "25%" }}
      >
        

        <FlatList
          data={messages}
          renderItem={({ item }) => (

            <View>
            {
            item.type == 'msg'
               ?
               <View style = {styles.message}>
              <Text style={{fontSize:18,alignSelf:'center' ,paddingLeft:8,paddingRight:8,paddingTop:5}}>{item.message}</Text> 
              <Text style={{fontSize:8 ,alignSelf:'center',color :'#8f8c8c',paddingTop :3,paddingBottom :4 ,paddingLeft:5,paddingRight:5}}>{item.dateAndTime}</Text>
              </View>
               :
               <View style = {styles.message1}>
             <Text style={{fontSize:18,alignSelf:'center' ,paddingLeft:8,paddingRight:8 ,paddingTop:5}}>{item.message}</Text> 
              <Text style={{fontSize:8 ,alignSelf:'center',color :'#8f8c8c', paddingTop :3,paddingBottom :4 ,paddingLeft:5,paddingRight:5}}>{item.dateAndTime}</Text>

              </View>
            }
        </View>
            
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <View style={styles.action}>
          <TextInput
            style={styles.textinput}
            placeholder="Type here"
            autoComplete="off"
            value={message}
            multiline={true}
            numberOfLines={1}
            textAlignVertical="top"
            onChangeText={(message) => setMessage(message)}
          />
        </View>

        <View style={styles.iconAdd}>
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome
              name="send"
              size={30}
              color="#38deff"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  
  
}

  const MINUTE_MS = 500;

useEffect(() => {
  const interval = setInterval(() => {
   refresh();
   RefreshPage();
   
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])




 

if( message != "" || message == ""){
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.Box]}>
        <View style={styles.HEAD}>
          <Image
            source={{ uri: ReceiverUrl }}
            style={{
              marginLeft: "5%",
              height: 41,
              width: 41,
              borderWidth: 1.5,

              borderRadius: 50,
            }}
          />

          <Text style={styles.Name}>
            {ReceiverFirstName} {ReceiverLastName}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ width: "95%", alignSelf: "center", marginBottom: "25%" }}
      >
        

        <FlatList
          data={messages}
          renderItem={({ item }) => (

            <View>
            {
            item.type == 'msg'
               ?
               <View style = {styles.message}>
              <Text style={{fontSize:18,alignSelf:'center' ,paddingLeft:8,paddingRight:8,paddingTop:5}}>{item.message}</Text> 
              <Text style={{fontSize:8 ,alignSelf:'center',color :'#8f8c8c',paddingTop :3,paddingBottom :4 ,paddingLeft:5,paddingRight:5}}>{item.dateAndTime}</Text>
              </View>
               :
               <View style = {styles.message1}>
             <Text style={{fontSize:18,alignSelf:'center' ,paddingLeft:8,paddingRight:8 ,paddingTop:5}}>{item.message}</Text> 
              <Text style={{fontSize:8 ,alignSelf:'center',color :'#8f8c8c', paddingTop :3,paddingBottom :4 ,paddingLeft:5,paddingRight:5}}>{item.dateAndTime}</Text>

              </View>
            }
        </View>
            
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <View style={styles.action}>
          <TextInput
            style={styles.textinput}
            placeholder="Type here"
            autoComplete="off"
            value={message}
            multiline={true}
            numberOfLines={1}
            textAlignVertical="top"
            onChangeText={(message) => setMessage(message)}
          />
        </View>

        <View style={styles.iconAdd}>
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome
              name="send"
              size={30}
              color="#38deff"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
      }

      return(
        <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
      );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  Box: {
    marginBottom: "5%",
    alignSelf: "center",
    width: "95%",
    
    padding: 15,
    backgroundColor: "#9ae1f5",
    borderRadius: 5,
    borderWidth :2,
    borderColor:'#0ab4f7',
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
  Name: {
    alignSelf: "center",
    marginLeft: "5%",
    fontSize: 18,
  },
  HEAD: {
    flexDirection: "row",
  },

  textinput: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#0ab4f7",
    backgroundColor: "#e3f8ff",

    paddingRight: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },

  action: {
    width: "85%",
  },
  iconAdd: {
    alignSelf: "center",
  },
  message: {
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: "blue",
    marginBottom: "3%",
    borderRadius: 15,
   
  },
  message1: {
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: "purple",
    marginBottom: "3%",
    borderRadius: 15,
   
  },
});
