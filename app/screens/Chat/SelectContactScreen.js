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
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function SelectContactScreen({ navigation, route }) {
  const [isLoading, setisLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const { ROLE } = route.params;

  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    async function fetchSubjects() {
      const data = [];

      const db = firebase.firestore();
      const querySnapshot = await db.collection(ROLE).get();
      querySnapshot.forEach((doc) => {
        if (doc.id != currentUser.uid) data.push(doc.data());
      });

      setSubjects(data);
      setisLoading(false);
    }

    fetchSubjects();
  }, []);

  const handlePress = (id, url, firstName, lastName) => {
    navigation.navigate("ChatBox", {
      ReceiverID: id,
      ReceiverUrl: url,
      ReceiverFirstName: firstName,
      ReceiverLastName: lastName,
    });
  };

  if (subjects == "" && isLoading == false) {
    Alert.alert("No user Data here!");
  }

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

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
            Contacts
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
      <ScrollView>
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.Box]}
              onPress={() =>
                handlePress(
                  item.id,
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
    backgroundColor: "#e6c0fc",
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
    justifyContent: "center",
    marginLeft: hp("2%"),
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: hp("5.2%"),
    width: wp("11%"),
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 20,
    shadowRadius: 60,
    elevation: 15,
  },
});
