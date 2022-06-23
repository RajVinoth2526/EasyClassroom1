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
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { DeletePost } from "../../../API/firebaseMethods/firebaseMethod";
import IMAGE from '../../assets/profile-placeholder.png';


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PostScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
 
  

  let currentUserUID = firebase.auth().currentUser.uid;

  function printId(ID ,url) {
    navigation.navigate("EditPost", { PostID: ID });
  }

  function deletePost(id) {
    DeletePost(id);
    Alert.alert("Post deleted!");
    navigation.replace("Dashboard");
  }

  function Edit(PostID, PostUserID) {
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
          { text: "Edit", onPress: () => printId(PostID) },
          { text: "Delete", onPress: () => Delete(PostID) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("only You can edit your own post ");
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
        { text: "OK", onPress: () => deletePost(PostID) },
      ],
      { cancelable: false }
    );
  }

  const handlePress = () => {
    navigation.navigate("AddPostScreen");
  };

  

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child("profileImage/" + currentUserUID) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImage(url);
       
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  }, []);


  useEffect(() => {
    async function fetchSubjects() {
      const data = [];
      
      const db = firebase.firestore();
      const querySnapshot = await db.collection("Posts").get();
      querySnapshot.forEach((doc) => {
        

        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
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
     

       
        <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={50}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.Box,
                 
                ]}
              > 
              <View style={styles.head}>
                
                  <Image
                    
                    source={{ uri: item.ProfileUrl }}
                    style={{
                      marginLeft :'5%',
                      marginTop:'2%',
                      height: 41,
                      width: 41,
                      borderWidth:1.5,
                      
                      borderRadius: 50,
                    }}
                  />
                

                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>

                <View style ={{marginLeft :'38%',marginTop:'2%'}} >
                  <TouchableOpacity
                    onPress={() => Edit(item.Postid, item.UserId)}
                  >
                    <AntDesign name="edit" size={20} color="#03dffc" />
                    <Text style={{ fontSize: 8 }}>Edit</Text>
                  </TouchableOpacity>
                </View>
                </View>
                
                
                <Text style={styles.title}>{item.title}</Text>
                <View style ={styles.avatar}>
                <Image
                
                  source={{ uri: item.imageUrl }}
                  style={{
                    
                    
                    borderRadius:4,
                    borderWidth:1.5,
                    marginBottom: 30,
                    borderRadius: 4,
                    height: 200,
                    width: 300,
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
               
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                  

                  <Text style={{alignSelf:'flex-end', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}

          />

          

        </ScrollView>

        
        
      
    );
  } else if (role == "Demo") {
    return (
      <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={50}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.Box,
                 
                ]}
              > 
              <View style={styles.head}>
                
                  <Image
                    
                    source={{ uri: image }}
                    style={{
                      marginLeft :'5%',
                      marginTop:'2%',
                      height: 41,
                      width: 41,
                      borderWidth:1.5,
                      
                      borderRadius: 50,
                    }}
                  />
                

                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>

                
                </View>
                
                
                <Text style={styles.title}>{item.title}</Text>
                <View style ={styles.avatar}>
                <Image
                
                  source={{ uri: item.imageUrl }}
                  style={{
                    
                    
                    borderRadius:4,
                    borderWidth:1.5,
                    marginBottom: 30,
                    borderRadius: 4,
                    height: 200,
                    width: 300,
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
               
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                  

                  <Text style={{alignSelf:'flex-end', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}

          />

          

        </ScrollView>
    );
  } else if (role == "Student") {
    return (
      <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={50}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.Box,
                 
                ]}
              > 
              <View style={styles.head}>
                
                  <Image
                    
                    source={{ uri: image }}
                    style={{
                      marginLeft :'5%',
                      marginTop:'2%',
                      height: 41,
                      width: 41,
                      borderWidth:1.5,
                      
                      borderRadius: 50,
                    }}
                  />
                

                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>

                
                </View>
                
                
                <Text style={styles.title}>{item.title}</Text>
                <View style ={styles.avatar}>
                <Image
                
                  source={{ uri: item.imageUrl }}
                  style={{
                    
                    
                    borderRadius:4,
                    borderWidth:1.5,
                    marginBottom: 30,
                    borderRadius: 4,
                    height: 200,
                    width: 300,
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
               
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                  

                  <Text style={{alignSelf:'flex-end', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
   
    marginBottom :'1%',
    alignSelf:'flex-end',
    marginRight :'10%'
  },
  scrollScreen: {
    borderRadius: 10,
    width: "100%",
    marginBottom: "35%",
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
    marginBottom: '2%',
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
    marginBottom: '1%',
    marginTop: '1%',
    alignSelf :'center',
    width:'95%',
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
    marginLeft: '5%',
    marginRight: '5%',
    marginTop:'5%',
   
    borderRadius: 5,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: '5%',
    alignSelf:'flex-start',
    marginLeft:'5%',
    marginBottom:'5%',
    fontSize: 20,
    fontWeight: "bold",
  },
  Name: {
   alignSelf:'center',
   marginLeft :'5%',
   fontSize : 18
  },
  head :{
    flex : 1,
    flexDirection: "row",
    borderBottomColor :"#03dffc",
    borderBottomWidth:1,
    paddingBottom :10,
    borderBottomStartRadius:15,
    borderBottomEndRadius:15
  },
  msg: {
    fontSize: 18,
    borderWidth :1,
    borderColor:'#03dffc',
    borderRadius :10,
    padding:10,
    
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
   
    height:200,
    width :300,
    alignSelf:'center',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
 
});
