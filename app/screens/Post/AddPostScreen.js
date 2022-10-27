import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  keyboardVerticalOffset,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  KeyboardAvoidingViewBase,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import * as firebase from "firebase";
import { UploadPostImage } from "../../../API/firebaseMethods/firebaseMethod";
import IMG from "../../assets/profile-placeholder.png";
import IMAGE from "../../assets/photo.png";
import { MaterialIcons } from "@expo/vector-icons";
import { UploadPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function AddPostScreen({ navigation, route }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
  const exampleImageUri1 = Image.resolveAssetSource(IMG).uri;
  const [image1, setImage1] = useState(exampleImageUri1);
  const [isLoading, setisLoading] = useState(false);

  const { Faculty } = route.params;
  const [ID] = useState(uuid.v4());
  let currentUserUID = firebase.auth().currentUser.uid;
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = async () => {
    if (!message) {
      Alert.alert("Text required");
    } else if (!title) {
      Alert.alert("title required");
    } else if (image == exampleImageUri) {
      Alert.alert("image required");
    } else {
      setisLoading(true);
      const ProfileUrl = await firebase
        .storage()
        .ref()
        .child("profileImage/" + currentUserUID) //name in storage in firebase console
        .getDownloadURL()
        .catch((e) => console.log("Errors while downloading => ", e));
      const url = await firebase
        .storage()
        .ref()
        .child("PostImage/" + ID) //name in storage in firebase console
        .getDownloadURL()
        .catch((e) => console.log("Errors while downloading => ", e));

      UploadPost(ID, message, title, url, ProfileUrl, Faculty).then(() => {
        setisLoading(false);
        navigation.goBack();
      });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    setImage(result.uri);

    if (!result.cancelled) {
      setisLoading(true);
      UploadPostImage(result.uri, ID)
        .then(() => {
          setisLoading(false);
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <Text>Please wait!</Text>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

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
            Create Post
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

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("60%"), marginTop: hp("5%") }}>
          <View>
            <View style={styles.avatar}>
              <Image
                source={{ uri: image }}
                style={{
                  borderRadius: 4,
                  borderWidth: 1.5,
                  marginBottom: 30,
                  borderRadius: 4,
                  height: hp("20%"),
                  width: wp("60%"),
                  alignSelf: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  elevation: 8,
                }}
              />
            </View>
            <View style={styles.photoUpload}>
              <MaterialCommunityIcons
                onPress={pickImage}
                name="image-plus"
                size={30}
                color="black"
              />
            </View>

            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Title</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  autoComplete="off"
                  value={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title) => setTitle(title)}
                />
              </View>
            </View>

            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Content</Text>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={message}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(message) => setMessage(message)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  datePickerStyle: {
    width: 200,
  },
  scrollView: {
    height: hp("55%"),
    width: wp("90%"),
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: hp("5%"),
    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginTop: hp("1%"),
    alignSelf: "center",
    width: wp("78%"),
  },
  text: {
    alignSelf: "center",
    marginTop: hp("4%"),
    fontSize: 30,
    fontWeight: "bold",
  },
  photoUpload: {
    alignSelf: "flex-end",
    marginRight: wp("20%"),
    marginTop: hp("3%"),
  },

  cardtext: {
    marginLeft: wp("1%"),
    fontSize: hp("2.4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  action: {
    justifyContent: "center",

    borderRadius: 10,
    height: hp("6%"),
    marginBottom: hp("3%"),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  textinput: {
    marginLeft: wp("3%"),
    color: "black",
    fontSize: hp("2.2%"),
  },

  buttonSignup: {
    backgroundColor: "#cdaffa",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("8%"),
    borderRadius: 9,
    marginBottom: hp("0.1%"),
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  SignUpText: {
    fontSize: hp("3%"),
    alignSelf: "center",
    fontWeight: "bold",
  },

  inlineText: {
    color: "red",
    marginTop: hp("1.5%"),
    marginBottom: hp("4%"),
    alignSelf: "center",
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },

  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: hp("20%"),
    width: wp("60%"),
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
  },
});
