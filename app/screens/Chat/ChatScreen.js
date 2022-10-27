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
  RefreshControl,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DeleteChat } from "../../../API/firebaseMethods/firebaseMethod";
export default function ChatScreen({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const currentUser = firebase.auth().currentUser;

  async function fetchSubjects() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db
      .collection("Conversations")
      .doc(currentUser.uid)
      .collection("Chats")
      .get();

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setSubjects(data);
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  function delectChat(userId, Id) {
    DeleteChat(userId, Id);
    //Alert.alert("nskgw");
    fetchSubjects();
    RefreshPage();
  }

  function Delete(id) {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete the Chat?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => delectChat(currentUser.uid, id) },
      ],
      { cancelable: false }
    );
  }
  const handlePress = () => {
    navigation.navigate("contact");
  };

  function handlePress1(ID, ProfileUrl, firstName, lastName) {
    navigation.navigate("ChatBox", {
      ReceiverID: ID,
      ReceiverUrl: ProfileUrl,
      ReceiverFirstName: firstName,
      ReceiverLastName: lastName,
    });
  }

  function RefreshPage() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: hp("4%"),
            marginBottom: hp("2%"),
            marginLeft: hp("2%"),
            fontWeight: "bold",
          }}
        >
          Chats
        </Text>

        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.Box]}
                onLongPress={() => Delete(item.ID)}
                onPress={() =>
                  handlePress1(
                    item.ID,
                    item.ProfileUrl,
                    item.firstName,
                    item.lastName
                  )
                }
              >
                <View style={styles.head}>
                  <View style={styles.avatar}>
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
                  </View>

                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={hp("10%")}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
      </View>
    );
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchSubjects();
    RefreshPage();
  }, [isFocused]);

  const MINUTE_MS = 10000000000;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubjects();
      RefreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    RefreshPage();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: hp("4%"),
          marginBottom: hp("2%"),
          marginLeft: hp("2%"),
          fontWeight: "bold",
        }}
      >
        Chats
      </Text>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.Box]}
              onLongPress={() => Delete(item.ID)}
              onPress={() =>
                handlePress1(
                  item.ID,
                  item.ProfileUrl,
                  item.firstName,
                  item.lastName
                )
              }
            >
              <View style={styles.head}>
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: item.ProfileUrl }}
                    style={{
                      height: hp("5.2%"),
                      width: wp("11%"),
                      borderWidth: 1.5,

                      borderRadius: 50,
                    }}
                  />
                </View>

                <Text style={styles.Name}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AddIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: hp("8%"),
  },
  Box: {
    marginBottom: hp("1%"),
    alignSelf: "center",
    alignItems: "flex-start",
    width: wp("95%"),
    height: hp("9%"),
    justifyContent: "center",
    backgroundColor: "#e3bbfa",
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
    elevation: 5,
  },
  Name: {
    alignSelf: "center",
    marginLeft: wp("5%"),
    fontSize: hp("2.4%"),
    fontWeight: "400",
  },
  head: {
    flex: 1,
    flexDirection: "row",
    marginLeft: hp("2%"),
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 5,
    shadowRadius: 55,
    elevation: 10,
  },
});
