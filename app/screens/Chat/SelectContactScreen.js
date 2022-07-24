import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator
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

  useEffect(() => {
    async function fetchSubjects() {
      const data = [];

      const db = firebase.firestore();
      const querySnapshot = await db.collection(ROLE).get();
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });

      setSubjects(data);
      setisLoading(false);
    }

    fetchSubjects();
  }, []);

  const handlePress = (id,url,firstName,lastName) => {
    navigation.navigate("ChatBox",{ ReceiverID: id,ReceiverUrl : url,ReceiverFirstName : firstName,ReceiverLastName : lastName });
  };

  

  if(isLoading == true){
    return(
    <View style={styles.Loadingcontainer}>
      
      <ActivityIndicator color="#03befc" size="large" />
    </View>
    );
  }


  if (ROLE == "Lecturer") {
    return (
      <View style={styles.container}>
         <Text style={{fontSize :hp('4%') ,marginBottom :hp("2%"),marginLeft :hp('2%'),fontWeight:'bold',marginTop:hp('5%')}}>Contacts</Text>
        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item.id,item.ProfileUrl,item.firstName,item.lastName)}>
              <View style={[styles.Box]}>
                <View style={styles.head}>
                <View style = {styles.avatar}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        
                       
                        height: hp('5.2%'),
                        width: wp('11%'),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                    </View>

                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }if (ROLE == "Demonstrator") {
    return (
      <View style={styles.container}>
         <Text style={{fontSize :hp('4%') ,marginBottom :hp("2%"),marginLeft :hp('2%'),fontWeight:'bold',marginTop:hp('5%')}}>Contacts</Text>
        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item.id,item.ProfileUrl,item.firstName,item.lastName)}>
              <View style={[styles.Box]}>
                <View style={styles.head}>
                <View style = {styles.avatar}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        
                       
                        height: hp('5.2%'),
                        width: wp('11%'),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                    </View>

                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
  if (ROLE == "Student") {
    return (
      <View style={styles.container}>
         <Text style={{fontSize :hp('4%') ,marginBottom :hp("2%"),marginLeft :hp('2%'),fontWeight:'bold',marginTop:hp('5%')}}>Contacts</Text>
        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item.id,item.ProfileUrl,item.firstName,item.lastName)}>
              <View style={[styles.Box]}>
                <View style={styles.head}>
                <View style = {styles.avatar}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        
                       
                        height: hp('5.2%'),
                        width: wp('11%'),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                    </View>

                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }

  if (ROLE == "Admin") {
    return (
      <View style={styles.container}>
         <Text style={{fontSize :hp('4%') ,marginBottom :hp("2%"),marginLeft :hp('2%'),fontWeight:'bold',marginTop:hp('5%')}}>Contacts</Text>
        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item.id,item.ProfileUrl,item.firstName,item.lastName)}>
                <View style={[styles.Box]}>
                  <View style={styles.head}>
                    <View style = {styles.avatar}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        
                       
                        height: hp('5.2%'),
                        width: wp('11%'),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                    </View>

                    <Text style={styles.Name}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor:'white'
   
  },
  AddIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: hp('8%'),
   
  },
  Box: {
    marginBottom:hp('1%'),
    alignSelf: "center",
    alignItems: "flex-start",
    width: wp("95%"),
    height:hp('9%'),
    justifyContent:'center',
    backgroundColor: "#c7f5ff",
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
    marginLeft: wp('5%'),
    fontSize: hp('2.4%'),
    fontWeight:'400'
  },
  head: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'center',
    marginLeft:hp('2%')
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: hp('5.2%'),
     width: wp('11%'),
    alignSelf: "center",
    borderRadius: 50,
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
