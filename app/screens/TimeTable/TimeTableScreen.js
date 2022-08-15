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
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import IMAGE from "../../assets/photo.png";
import * as ImagePicker from "expo-image-picker";
import { UploadTimeTable } from "../../../API/firebaseMethods/firebaseMethod";
import ImageModal from "react-native-image-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TimeTableScreen({ navigation }) {
  const [role, setRole] = useState("");

  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image1, setImage1] = useState(exampleImageUri);
  const [image2, setImage2] = useState(exampleImageUri);
  const [image3, setImage3] = useState(exampleImageUri);

  let currentUserUID = firebase.auth().currentUser.uid;

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const pickImage1 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage1(result.uri);
    // console.log(result);

    if (!result.cancelled) {
      UploadTimeTable(result.uri, "level1")
        .then(() => {
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage2(result.uri);
    // console.log(result);

    if (!result.cancelled) {
      UploadTimeTable(result.uri, "level2")
        .then(() => {
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  const pickImage3 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage3(result.uri);
    // console.log(result);

    if (!result.cancelled) {
      UploadTimeTable(result.uri, "level3")
        .then(() => {
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

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

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child("TimeTablePhoto/" + "level1") //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImage1(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));

    firebase
      .storage()
      .ref()
      .child("TimeTablePhoto/" + "level2") //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImage2(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));

    firebase
      .storage()
      .ref()
      .child("TimeTablePhoto/" + "level3") //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImage3(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  }, []);

  const [refreshing, setRefreshing] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(true));
  }, []);

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "90%,2)";
  };

  if (role == "Lecturer") {
    return (
      <ScrollView style={styles.scrollScreen}>
        <View style={{ backgroundColor: "white", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("12%"),
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
              Time Table
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("12%"),
              borderTopLeftRadius: 60,
            }}
          ></View>
        </View>

        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 1
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image1 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 2
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image2 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 3
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image3 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (role == "Demonstrator") {
    return (
      <ScrollView style={styles.scrollScreen}>
        <View style={{ backgroundColor: "white", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("12%"),
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
              Time Table
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("12%"),
              borderTopLeftRadius: 60,
            }}
          ></View>
        </View>

        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 1
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image1 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 2
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image2 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 3
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image3 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (role == "Student") {
    return (
      <ScrollView style={styles.scrollScreen}>
        <View style={{ backgroundColor: "white", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("12%"),
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
              Time Table
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("12%"),
              borderTopLeftRadius: 60,
            }}
          ></View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 1
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image1 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 2
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image2 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 3
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image3 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (role == "Admin") {
    return (
      <ScrollView style={styles.scrollScreen}>
        <View style={{ backgroundColor: "white", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("12%"),
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
              Time Table
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("12%"),
              borderTopLeftRadius: 60,
            }}
          ></View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 1
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image1 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage1}
              name="image-plus"
              size={hp("4%")}
              color="black"
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 2
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image2 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage1}
              name="image-plus"
              size={hp("4%")}
              color="black"
            />
          </View>
        </View>
        <View style={[styles.Box]}>
          <View style={{ marginTop: hp("4%") }}>
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontWeight: "bold",
                alignItems: "flex-start",
                marginLeft: hp("3.5%"),
              }}
            >
              {" "}
              Level 3
            </Text>
          </View>

          <View style={styles.avatar}>
            <ImageModal
              swipeToDismiss={true}
              resizeMode="contain"
              imageBackgroundColor="white"
              source={{ uri: image3 }}
              style={{
                borderRadius: 3,
                height: hp("28%"),
                width: wp("83%"),
              }}
            />
          </View>
          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage1}
              name="image-plus"
              size={hp("4%")}
              color="black"
            />
          </View>
        </View>
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
    marginLeft: 250,
    position: "absolute",
    marginBottom: 5,
    marginTop: 600,
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollScreen: {
    marginBottom: hp("1%"),
    borderRadius: 10,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.001,
  },

  Box: {
    alignSelf: "center",
    marginTop: hp("0.1%"),
    width: wp("96%"),
    backgroundColor: "#e9cdfa",
    borderRadius: 5,
    marginBottom: hp("1%"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    marginTop: hp("4%"),
    borderRadius: 3,
    marginBottom: hp("4%"),
    borderRadius: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  uploadButton: {
    alignItems: "flex-end",
    marginEnd: hp("3%"),
    marginBottom: hp("2%"),
  },
});
