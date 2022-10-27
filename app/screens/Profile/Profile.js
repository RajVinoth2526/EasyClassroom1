import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { UploadImage } from "../../../API/firebaseMethods/firebaseMethod";
import { GetImage } from "../../../API/firebaseMethods/firebaseMethod";
import IMAGE from "../../assets/profile-placeholder.png";
import { UpdateUserDetails } from "../../../API/firebaseMethods/firebaseMethod";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Profile({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [district, setDistrict] = useState("");
  const [faculty, setFaculty] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("");

  const currentUser = firebase.auth().currentUser;

  // const [photoURL, setPhotoURL] = useState(IMAGENAME);
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.25,
    });

    setImage(result.uri);
    // console.log(result);

    if (!result.cancelled) {
      setisLoading(true);

      UploadImage(result.uri, currentUserUID)
        .then(() => {
          UpdateUserDetails(currentUserUID, firstName, lastName, role);
          setisLoading(false);
          console.log("Uploaded");
        })

        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child("profileImage/" + currentUserUID) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        //console.logI(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));
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
        setFirstName(dataObj.firstName);
        setLastName(dataObj.lastName);
        setIndexNumber(dataObj.indexNumber);
        setRegistrationNumber(dataObj.registrationNumber);
        setFaculty(dataObj.faculty);
        setCourse(dataObj.course);
        setGender(dataObj.gender);
        setEmail(dataObj.email);
        setId(dataObj.id);
        setDepartment(dataObj.department);
        setRole(dataObj.role);
        setDistrict(dataObj.district);
      }
    }
    getUserInfo();
  });

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <Text>Image Uploading Please wait!</Text>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }

  if (role == "Lecturer") {
    return (
      <View style={StyleSheet.container}>
        <View style={{ backgroundColor: "white", height: hp("10%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("10%"),
              borderBottomRightRadius: 60,
              justifyContent: "center",
            }}
          ></View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("20%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("20%"),
              borderTopLeftRadius: 60,
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: image }}
                style={{
                  height: hp("13.3%"),
                  width: wp("27.9%"),
                  borderColor: "#cdaffa",
                  borderWidth: 2,
                  borderRadius: 50,
                }}
              />
            </View>

            <View style={styles.uploadButton}>
              <MaterialCommunityIcons
                onPress={pickImage}
                name="image-plus"
                size={hp("3.8%")}
                color="#cdaffa"
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "white", height: hp("65%") }}>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: hp("2.5%") }}>
              {firstName} {lastName}
            </Text>
          </View>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileDetails}>
              <Text style={styles.headText}> ID </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{id}</Text>
              </View>
              <Text style={styles.headText}> First Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{firstName}</Text>
              </View>
              <Text style={styles.headText}> Last Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{lastName}</Text>
              </View>

              <Text style={styles.headText}> Gender </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{gender}</Text>
              </View>
              <Text style={styles.headText}> District </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{district}</Text>
              </View>
              <Text style={styles.headText}> Faculty </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{faculty}</Text>
              </View>
              <Text style={styles.headText}> Deparment </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{department}</Text>
              </View>

              <Text style={styles.headText}> Email </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{email}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonEditProfile}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <AntDesign name="edit" size={hp("4%")} color="black" />
                <Text style={{ color: "black", fontSize: hp("2%") }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  } else if (role == "Demonstrator") {
    return (
      <View style={StyleSheet.container}>
        <View style={{ backgroundColor: "white", height: hp("10%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("10%"),
              borderBottomRightRadius: 60,
              justifyContent: "center",
            }}
          ></View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("20%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("20%"),
              borderTopLeftRadius: 60,
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: image }}
                style={{
                  height: hp("13.3%"),
                  width: wp("27.9%"),
                  borderColor: "#cdaffa",
                  borderWidth: 2,
                  borderRadius: 50,
                }}
              />
            </View>

            <View style={styles.uploadButton}>
              <MaterialCommunityIcons
                onPress={pickImage}
                name="image-plus"
                size={hp("3.8%")}
                color="#cdaffa"
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "white", height: hp("65%") }}>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: hp("2.5%") }}>
              {firstName} {lastName}
            </Text>
          </View>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileDetails}>
              <Text style={styles.headText}> ID </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{id}</Text>
              </View>
              <Text style={styles.headText}> First Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{firstName}</Text>
              </View>
              <Text style={styles.headText}> Last Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{lastName}</Text>
              </View>

              <Text style={styles.headText}> Gender </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{gender}</Text>
              </View>
              <Text style={styles.headText}> District </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{district}</Text>
              </View>
              <Text style={styles.headText}> Faculty </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{faculty}</Text>
              </View>
              <Text style={styles.headText}> Deparment </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{department}</Text>
              </View>

              <Text style={styles.headText}> Email </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{email}</Text>
              </View>

              <TouchableOpacity
                style={styles.buttonEditProfile}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <AntDesign name="edit" size={hp("4%")} color="black" />
                <Text style={{ color: "black", fontSize: hp("2%") }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  } else if (role == "Student") {
    return (
      <View style={StyleSheet.container}>
        <View style={{ backgroundColor: "white", height: hp("10%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("10%"),
              borderBottomRightRadius: 60,
              justifyContent: "center",
            }}
          ></View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("20%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("20%"),
              borderTopLeftRadius: 60,
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: image }}
                style={{
                  height: hp("13.3%"),
                  width: wp("27.9%"),
                  borderColor: "#cdaffa",
                  borderWidth: 2,
                  borderRadius: 50,
                }}
              />
            </View>

            <View style={styles.uploadButton}>
              <MaterialCommunityIcons
                onPress={pickImage}
                name="image-plus"
                size={hp("3.8%")}
                color="#cdaffa"
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "white", height: hp("65%") }}>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: hp("2.5%") }}>
              {firstName} {lastName}
            </Text>
          </View>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileDetails}>
              <Text style={styles.headText}> First Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{firstName}</Text>
              </View>
              <Text style={styles.headText}> Last Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{lastName}</Text>
              </View>

              <Text style={styles.headText}> Gender </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{gender}</Text>
              </View>
              <Text style={styles.headText}> District </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{district}</Text>
              </View>
              <Text style={styles.headText}> Faculty </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{faculty}</Text>
              </View>
              <Text style={styles.headText}> indexNumber </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{indexNumber}</Text>
              </View>

              <Text style={styles.headText}> RegistrationNumber </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{registrationNumber}</Text>
              </View>

              <Text style={styles.headText}> Email </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{email}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonEditProfile}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <AntDesign name="edit" size={hp("4%")} color="black" />
                <Text style={{ color: "black", fontSize: hp("2%") }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  } else if (role == "Admin") {
    return (
      <View style={StyleSheet.container}>
        <View style={{ backgroundColor: "white", height: hp("10%") }}>
          <View
            style={{
              backgroundColor: "#cdaffa",
              height: hp("10%"),
              borderBottomRightRadius: 60,
              justifyContent: "center",
            }}
          ></View>
        </View>
        <View style={{ backgroundColor: "#cdaffa", height: hp("20%") }}>
          <View
            style={{
              backgroundColor: "white",
              height: hp("20%"),
              borderTopLeftRadius: 60,
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: image }}
                style={{
                  height: hp("13.3%"),
                  width: wp("27.9%"),
                  borderColor: "#cdaffa",
                  borderWidth: 2,
                  borderRadius: 50,
                }}
              />
            </View>

            <View style={styles.uploadButton}>
              <MaterialCommunityIcons
                onPress={pickImage}
                name="image-plus"
                size={hp("3.8%")}
                color="#cdaffa"
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "white", height: hp("65%") }}>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: hp("2.5%") }}>
              {firstName} {lastName}
            </Text>
          </View>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileDetails}>
              <Text style={styles.headText}> ID </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{id}</Text>
              </View>
              <Text style={styles.headText}> First Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{firstName}</Text>
              </View>
              <Text style={styles.headText}> Last Name </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{lastName}</Text>
              </View>

              <Text style={styles.headText}> Gender </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{gender}</Text>
              </View>
              <Text style={styles.headText}> District </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{district}</Text>
              </View>
              <Text style={styles.headText}> Faculty </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{faculty}</Text>
              </View>
              <Text style={styles.headText}> Deparment </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{department}</Text>
              </View>

              <Text style={styles.headText}> Email </Text>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{email}</Text>
              </View>

              <TouchableOpacity
                style={styles.buttonEditProfile}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <AntDesign name="edit" size={hp("4%")} color="black" />
                <Text style={{ color: "black", fontSize: hp("2%") }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  fullName: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  scrollScreen: {
    marginTop: hp("1%"),
    marginBottom: hp("5%"),
    alignSelf: "center",
    height: hp("50%"),
    width: wp("95%"),
    borderRadius: 15,
    backgroundColor: "#cdaffa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonEditProfile: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },

  avatar: {
    marginTop: hp("4%"),
    height: hp("13.3%"),
    width: wp("27.9%"),
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "#cdaffa",
    alignSelf: "center",
  },

  uploadButton: {
    alignSelf: "center",
    marginRight: -90,
    marginTop: -15,
  },
  profileDetails: {
    marginTop: hp("3%"),
    justifyContent: "center",
  },
  headText: {
    marginTop: hp("1%"),
    marginLeft: wp("6%"),
    marginBottom: hp("0.5%"),
    fontSize: hp("2.3%"),
    fontWeight: "bold",
  },
  dataText: {
    fontSize: hp("2%"),
    marginLeft: wp("5%"),

    color: "#929394",
  },
  dataContainer: {
    width: wp("80%"),
    height: hp("5.5%"),
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#e9c8fa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 200,
    height: 200,
  },
});
