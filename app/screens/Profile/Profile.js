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

  async function UpdateUserDetail(){

    const ProfileUrl = await firebase
    .storage()
    .ref()
    .child("profileImage/" + currentUserUID) //name in storage in firebase console
    .getDownloadURL()
    .then((ProfileUrl) => {
      UpdateUserDetails(currentUserUID,firstName,lastName,ProfileUrl,role);
    })
  
    .catch((e) => 
    
    console.log("Errors while downloading => ", e)

    );

  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(result.uri);
    // console.log(result);

    if (!result.cancelled) {
      setisLoading(true);
      UploadImage(result.uri, currentUserUID)
      .then(() => {
        setisLoading(false);
        console.log("Uploaded");
      })
        
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
      

    }


    UpdateUserDetail();

    

    
     
    
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

  if(isLoading == true){
    return(
    <View style={styles.Loadingcontainer}>
      <Text>Image Uploading Please wait!</Text>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
    );
  }

  if (role == "Lecturer") {
    return (
      <View style={StyleSheet.container}>
        <View style={styles.background}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: image }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </View>

          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage}
              name="image-plus"
              size={24}
              color="#02b2f2"
            />
          </View>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {firstName} {lastName}
            </Text>
          </View>

          <View style={styles.containerScrollbar}>
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
                  <AntDesign name="edit" size={30} color="#02b2f2" />
                  <Text style={{ color: "#02b2f2" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  } else if (role == "Demonstrator") {
    return (
      <View style={StyleSheet.container}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: image }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          />
        </View>

        <View style={styles.uploadButton}>
          <MaterialCommunityIcons
            onPress={pickImage}
            name="image-plus"
            size={24}
            color="#02b2f2"
          />
        </View>
        <View style={styles.fullName}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {firstName} {lastName}
          </Text>
        </View>
        <ScrollView style={styles.scrollScreen}>
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

            <Text style={styles.headText}> Department </Text>
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
              <AntDesign name="edit" size={30} color="#02b2f2" />
              <Text style={{ color: "#02b2f2" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else if (role == "Student") {
    return (
      <View style={StyleSheet.container}>
        <View style={styles.background}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: image }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </View>

          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage}
              name="image-plus"
              size={24}
              color="#02b2f2"
            />
          </View>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {firstName} {lastName}
            </Text>
          </View>

          <View style={styles.containerScrollbar}>
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
                <Text style={styles.headText}> Registration Number </Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataText}>{registrationNumber}</Text>
                </View>
                <Text style={styles.headText}> Index Number </Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataText}>{indexNumber}</Text>
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

                <Text style={styles.headText}> course </Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataText}>{course}</Text>
                </View>

                <Text style={styles.headText}> Email </Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataText}>{email}</Text>
                </View>

                <TouchableOpacity
                  style={styles.buttonEditProfile}
                  onPress={() => navigation.navigate("UpdateProfile")}
                >
                  <AntDesign name="edit" size={30} color="#02b2f2" />
                  <Text style={{ color: "#02b2f2" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  } else if (role == "Admin") {
    return (
      <View style={StyleSheet.container}>
        <View style={styles.background}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: image }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </View>

          <View style={styles.uploadButton}>
            <MaterialCommunityIcons
              onPress={pickImage}
              name="image-plus"
              size={24}
              color="#02b2f2"
            />
          </View>
          <View style={styles.fullName}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {firstName} {lastName}
            </Text>
          </View>
          <ScrollView style={styles.scrollScreen}>
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
              <Text style={styles.headText}> department </Text>
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
                <AntDesign name="edit" size={30} color="#02b2f2" />
                <Text style={{ color: "#02b2f2" }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="blue" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    padding: 50,
    marginBottom: 10,
    backgroundColor: "white",
  },

  background: {
    backgroundColor: "white",
  },

  fullName: {
    marginTop: 10,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  scrollScreen: {
    marginTop: '5%',
    height:'70%',
    marginBottom:'10%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 15,
    backgroundColor: "#88e1fc",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 0.8,
  },
  buttonEditProfile: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  refreshButton: {
    marginLeft: 200,
    marginTop: -10,
  },

  avatar: {
    marginTop: 20,
    height: 107,
    width: 107,

    borderRadius: 60,
    borderWidth: 3.3,
    borderColor: "#02b2f2",
    alignSelf: "center",
  },

  uploadButton: {
    alignSelf: "center",
    marginRight: -90,
    marginTop: -15,
  },
  profileDetails: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headText: {
    marginTop: 1,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  dataText: {
    fontSize: 15,
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 6,
    color: "#929394",
  },
  dataContainer: {
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: "#e3f8ff",
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
