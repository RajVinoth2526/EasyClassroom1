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
import { useIsFocused } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PostScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
 
  

  const currentUser = firebase.auth().currentUser;

  function printId(ID ) {
    navigation.navigate("EditPost", { PostID: ID });
  }

  function deletePost(id) {
    DeletePost(id);
    fetchSubjects();
    getUserInfo();
    RefreshPage();
    Alert.alert("Post deleted!");
    
  }

  function Edit(PostID, PostUserID) {
    if (currentUser.uid == PostUserID) {
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

  

 

  

  async function getUserInfo() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      let dataObj = doc.data();
      setRole(dataObj.role);
    }
  }

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


  useEffect(() => {
    
    getUserInfo();
  },[]);

  useEffect(() => {
    
    fetchSubjects();
  }, []);


  
  

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const isFocused = useIsFocused();

  useEffect(() => {
    fetchSubjects();
    getUserInfo();
    RefreshPage();
  },[isFocused]);


  


  const MINUTE_MS = 100000000;

useEffect(() => {
  const interval = setInterval(() => {

    fetchSubjects();
    getUserInfo();
    RefreshPage();
   
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])


function RefreshPage(){


  if (role == "Lecturer") {
    return (
      

       <View  style = {styles.container}>
        <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
         
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
                
                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
                  

                  
                </View>
                <View style ={{alignSelf:'flex-start' ,marginLeft : '5%',marginBottom:'5%', marginTop:'5%'}} >
                  <TouchableOpacity
                    onPress={() => Edit(item.Postid, item.UserId)}
                  >
                    <AntDesign name="edit" size={20} color="#03dffc" />
                    <Text style={{ fontSize: 8 }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}

          />


        

          

        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={70}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
        </View>

        
        
      
    );
  } else if (role == "Demo") {
    return (
      <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          
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
                

                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
                

                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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


  if (role == "Lecturer") {
    return (
      

       <View  style = {styles.container}>
        <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
         
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
                
                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
                    height: hp('28%'),
                    width: wp('85%'),
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
                  

                  
                </View>
                <View style ={{alignSelf:'flex-start' ,marginLeft : '5%',marginBottom:'5%', marginTop:'5%'}} >
                  <TouchableOpacity
                    onPress={() => Edit(item.Postid, item.UserId)}
                  >
                    <AntDesign name="edit" size={20} color="#03dffc" />
                    <Text style={{ fontSize: 8 }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}

          />


        

          

        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={70}
            color="#03dffc"
            onPress={handlePress}
          />
        </View>
        </View>

        
        
      
    );
  } else if (role == "Demo") {
    return (
      <ScrollView
         style={styles.scrollScreen}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          
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
                

                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
                

                <View style={{  flexDirection: "column",}}>
                <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={{ marginLeft:'10%', marginBottom :'3%',marginTop :'3%',fontSize :10}}>{item.DateTime}</Text>
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
  
flex:1
   
  },
  AddIcon: {
  
   position:'absolute',
   alignSelf:'flex-end',
   
   marginTop: hp('65%')
  },
  scrollScreen: {
    height:hp('100%'),
    width: wp("100%"),
    
   
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
    marginTop: hp('1%'),
    alignSelf :'center',
    width:wp('99%'),
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 1,
    borderRadius: 10,
   
  },
  Msg: {
    marginLeft: '5%',
    marginBottom:'5%',
    marginRight: '5%',
    marginTop:'5%',
   
    borderRadius: 5,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: hp('1%'),
    alignSelf:'flex-start',
    marginLeft:wp('8%'),
    marginBottom:hp('3%'),
    fontSize: hp('2.5%'),
    fontWeight: "bold",
  },
  Name: {
   alignSelf:'center',
   marginTop:'5%',
   marginLeft :'5%',
   fontSize : 15
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
    fontSize: hp('2%'),
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
   
    height:hp('28%'),
    width :wp('85%'),
    alignSelf:'center',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 15,
  },
 
});
