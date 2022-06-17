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
import IMAGE from "../../assets/photo.png";
import * as ImagePicker from "expo-image-picker";
import { UploadTimeTable } from "../../../API/firebaseMethods/firebaseMethod";
import ImageModal from "react-native-image-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";


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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "90%,2)";
  };

  if (role == "Lecturer") {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollScreen}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              {" "}
              <MaterialCommunityIcons
                name="table-clock"
                size={25}
                color="black"
              />{" "}
              Time Table
            </Text>
          </View>
          <View
            style={[
              styles.Box,
              
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 1
              </Text>
            </View>
            
              <View style={styles.avatar}>
                <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image1 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
              </View>
           
          </View>
          <View
            style={[
              styles.Box,
            
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 2
              </Text>
            </View>

            <View style={styles.avatar}>
              <ImageModal
                swipeToDismiss={false}
                resizeMode="contain"
                imageBackgroundColor="#000000"
                source={{ uri: image2 }}
                style={{
                  borderRadius: 3,
                  height: 200,
                  width: 300,
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.Box,
             
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 3
              </Text>
            </View>

            <View style={styles.avatar}>
              <ImageModal
                swipeToDismiss={false}
                resizeMode="contain"
                imageBackgroundColor="#000000"
                source={{ uri: image3 }}
                style={{
                  borderRadius: 3,
                  height: 200,
                  width: 300,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else if (role == "Demo") {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollScreen}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              {" "}
              <Octicons name="note" size={25} color="#34dbeb" /> Time Table
            </Text>
          </View>
          <View
            style={[
              styles.Box,
             
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 1
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image1 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
          <View
            style={[
              styles.Box,
              
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 2
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image2 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
          <View
            style={[
              styles.Box,
            
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 3
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image3 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else if (role == "Student") {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollScreen}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              {" "}
              <Octicons name="note" size={25} color="#34dbeb" /> Time Table
            </Text>
          </View>
          <View
            style={[
              styles.Box,
            
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 1
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image1 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
          <View
            style={[
              styles.Box,
              
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 2
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image2}}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
          <View
            style={[
              styles.Box,
               ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 3
              </Text>
            </View>

            <View style={styles.avatar}>
            <ImageModal
                  swipeToDismiss={false}
                  resizeMode="contain"
                  imageBackgroundColor="#000000"
                  source={{ uri: image3 }}
                  style={{
                    borderRadius: 3,
                    height: 200,
                    width: 300,
                  }}
                />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else if (role == "Admin") {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollScreen}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              {" "}
              <Octicons name="note" size={25} color="#34dbeb" /> Time Table
            </Text>
          </View>
          <View
            style={[
              styles.Box,
            
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 1
              </Text>
            </View>

            <View style={styles.avatar}>
              <Image
                source={{ uri: image1 }}
                style={{
                  borderRadius: 3,
                  height: 200,
                  width: 300,
                }}
              />

             
            </View>
            <View style={styles.uploadButton}>
                <MaterialCommunityIcons
                  onPress={pickImage1}
                  name="image-plus"
                  size={24}
                  color="black"
                />
              </View>
          </View>
          <View
            style={[
              styles.Box,
             
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 2
              </Text>
            </View>

            <View style={styles.avatar}>
              <Image
                source={{ uri: image2 }}
                style={{
                  borderRadius: 3,
                  height: 200,
                  width: 300,
                }}
              />

              
            </View>
            <View style={styles.uploadButton}>
                <MaterialCommunityIcons
                  onPress={pickImage2}
                  name="image-plus"
                  size={24}
                  color="black"
                />
              </View>
          </View>
          <View
            style={[
              styles.Box,
             
            ]}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "flex-start",
                  marginLeft: 30,
                }}
              >
                {" "}
                Level 3
              </Text>
            </View>

            <View style={styles.avatar}>
              <Image
                source={{ uri: image3 }}
                style={{
                  borderRadius: 3,
                  height: 200,
                  width: 300,
                }}
              />

              
            </View>
            <View style={styles.uploadButton}>
                <MaterialCommunityIcons
                  onPress={pickImage3}
                  name="image-plus"
                  size={24}
                  color="black"
                />
              </View>
          </View>
        </ScrollView>
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
    marginLeft: 250,
    position: "absolute",
    marginBottom: 5,
    marginTop: 600,
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollScreen: {
    
    marginBottom: 20,
    borderRadius: 10,
    marginTop: -10,
    height: "100%",
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

  Box: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#b1dffc",
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
    elevation: 6,
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  uploadButton: {
    alignItems: "flex-end",
    marginEnd: '10%',
    marginBottom : '2%'
  },
});
