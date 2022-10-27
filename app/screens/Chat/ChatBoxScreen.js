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
  Image,
  FlatList,
  BackHandler,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DeleteMessage } from "../../../API/firebaseMethods/firebaseMethod";
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
    // this.scrollView.scrollToEnd({ animated: true });
  }

  function deleteForMe(id, created) {
    DeleteMessage(
      id,
      created,
      type1,
      currentUserUID,
      ReceiverID,
      ReceiverFirstName,
      ReceiverLastName,
      ReceiverUrl
    );
    refresh();
    RefreshPage();
  }

  function deleteForEveryOne(id, created) {
    DeleteMessage(
      id,
      created,
      type1,
      currentUserUID,
      ReceiverID,
      ReceiverFirstName,
      ReceiverLastName,
      ReceiverUrl
    );

    DeleteMessage(
      id,
      created,
      type2,
      ReceiverID,
      currentUserUID,
      ReceiverFirstName,
      ReceiverLastName,
      ReceiverUrl
    );
    refresh();
    RefreshPage();
  }

  function delectChat(id, created) {
    Alert.alert(
      "Delete Message for",
      "",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Me", onPress: () => deleteForMe(id, created) },
        { text: "Everyone", onPress: () => deleteForEveryOne(id, created) },
      ],
      { cancelable: false }
    );
  }

  function Delete(id, created) {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete message?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "delete", onPress: () => delectChat(id, created) },
      ],
      { cancelable: false }
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Chat");
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

  function RefreshPage() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.Box]}>
          <View style={styles.HEAD}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: ReceiverUrl }}
                style={{
                  height: hp("5.2%"),
                  width: wp("11%"),
                  borderWidth: 1.5,

                  borderRadius: 50,
                }}
              />
            </View>

            <Text style={styles.Name}>
              {ReceiverFirstName} {ReceiverLastName}
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            width: wp("93%"),
            alignSelf: "center",
            marginBottom: hp("10%"),
          }}
        >
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View>
                {item.type == "msg" ? (
                  <TouchableOpacity
                    style={styles.message}
                    onLongPress={() => Delete(item.MessageId, item.created)}
                  >
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        alignSelf: "center",
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 5,
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("1%"),
                        alignSelf: "center",
                        color: "#8f8c8c",
                        paddingTop: 3,
                        paddingBottom: 4,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.message1}>
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        alignSelf: "center",
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 5,
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("1%"),
                        alignSelf: "center",
                        color: "#8f8c8c",
                        paddingTop: 3,
                        paddingBottom: 4,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: hp("2.7%"),
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
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
                size={hp("3.9%")}
                color="#c986f0"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const MINUTE_MS = 500;

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
      RefreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  if (message != "" || message == "") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.Box]}>
          <View style={styles.HEAD}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: ReceiverUrl }}
                style={{
                  height: hp("5.2%"),
                  width: wp("11%"),
                  borderWidth: 1.5,

                  borderRadius: 50,
                }}
              />
            </View>

            <Text style={styles.Name}>
              {ReceiverFirstName} {ReceiverLastName}
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            width: wp("93%"),
            alignSelf: "center",
            marginBottom: hp("10%"),
          }}
        >
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View>
                {item.type == "msg" ? (
                  <TouchableOpacity
                    style={styles.message}
                    onLongPress={() => Delete(item.MessageId, item.created)}
                  >
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        alignSelf: "center",
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 5,
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("1%"),
                        alignSelf: "center",
                        color: "#8f8c8c",
                        paddingTop: 3,
                        paddingBottom: 4,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.message1}>
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        alignSelf: "center",
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 5,
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("1%"),
                        alignSelf: "center",
                        color: "#8f8c8c",
                        paddingTop: 3,
                        paddingBottom: 4,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      {item.dateAndTime}
                    </Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: hp("2.7%"),
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
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
                size={hp("3.9%")}
                color="#c986f0"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
    backgroundColor: "#ffffff",
  },
  Box: {
    marginBottom: hp("2%"),
    alignSelf: "center",
    width: wp("100%"),
    height: hp("10%"),
    backgroundColor: "#cdaffa",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  Name: {
    alignSelf: "center",
    marginLeft: hp("2%"),
    fontSize: hp("2.5%"),
    fontWeight: "500",
  },
  HEAD: {
    marginLeft: wp("5%"),
    flexDirection: "row",
  },

  textinput: {
    width: wp("75%"),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#c986f0",
    backgroundColor: "#efd9fc",

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
    width: wp("80%"),
  },
  iconAdd: {
    alignSelf: "center",
  },
  message: {
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: "#cdaffa",
    marginBottom: hp("1.5%"),
    borderRadius: 15,
  },
  message1: {
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: "purple",
    marginBottom: hp("1.5%"),
    borderRadius: 15,
  },

  avatar: {
    height: hp("5.2%"),
    width: wp("11%"),
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 20,
    shadowRadius: 55,
    elevation: 15,
  },
});
