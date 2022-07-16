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
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function ChatScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);

  let currentUserUID = firebase.auth().currentUser.uid;
  

  useEffect(() => {
    async function fetchSubjects() {
      const data = [];
      
      const db = firebase.firestore();
      const querySnapshot = await db.collection(currentUserUID+"senders").get();
      querySnapshot.forEach((doc) => {
        

        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });

      setSubjects(data);
    }

    fetchSubjects();
  }, []);

  const handlePress = () => {
    navigation.navigate("contact");
  };

  function handlePress1 (ID,ProfileUrl,firstName,lastName){
    navigation.navigate("ChatBox", { ReceiverID : ID ,ReceiverUrl : ProfileUrl ,ReceiverFirstName : firstName ,ReceiverLastName : lastName});
  };

  


  if(subjects != ""){

 
    return (
      <View style={styles.container}>
        <Text style={{fontSize :30 ,marginBottom :"5%",marginLeft :'3%',fontWeight:'900'}}>Chats</Text>
        
        <ScrollView>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress1(item.ID,item.ProfileUrl,item.firstName,item.lastName)}>
                <View style={[styles.Box]}>
                  <View style={styles.head}>
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
}

if(subjects == ""){

 
  return (
    <View style={styles.container}>
      <Text style={{fontSize :30 ,marginBottom :"5%",marginLeft :'3%',fontWeight:'900'}}>Chats</Text>
      
     

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
}
        
return(
  <View style={styles.Loadingcontainer}>
  <ActivityIndicator color="#03befc" size="large" />
</View>
);
  

 
  

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  AddIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 150,
    marginRight: "5%",
  },
  Box: {
    marginBottom: "5%",
    marginTop: "1%",
    alignSelf: "center",
    alignItems: "flex-start",
    width: "90%",
    padding: 8,
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
    elevation: 8,
  },

  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: "5%",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  Name: {
    alignSelf: "center",
    marginLeft: "5%",
    fontSize: 18,
  },
  head: {
    flex: 1,
    flexDirection: "row",
  },
HEAD:{
    flex:1,
    flexDirection:'row'
},

  msg: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#03dffc",
    borderRadius: 10,
    padding: 10,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  avatar: {
    height: 200,
    width: 300,
    alignSelf: "center",
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
});
