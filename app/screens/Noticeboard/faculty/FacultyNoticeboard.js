import React ,{useState,useEffect}from 'react';
import * as firebase from 'firebase';
import {View,Text,RefreshControl,StyleSheet,TouchableOpacity,Image,ActivityIndicator,FlatList,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { DeleteNotice } from '../../../../API/firebaseMethods/firebaseMethod';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}




export default function PostScreen({navigation}){

 
  

  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState('');
  const NoticeType = 'Faculty';
 

  let currentUserUID = firebase.auth().currentUser.uid;
 


 


  function editNotice(ID){
    
    navigation.navigate('EditNotice',{PostId : ID,Type : NoticeType})


    
   

    
  }

  function deleteNotice(id){
    DeleteNotice(id);
    Alert.alert('Notice deleted!');
    navigation.replace('Dashboard');


  }

  function Edit(PostID, PostUserID){



    
  

  if(currentUserUID == PostUserID)
  {
    Alert.alert(
      "Edit Post",
      "",
     
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Edit", onPress: () => editNotice(PostID)},
        { text: "Delete", onPress: () => Delete(PostID)},
      ],
      { cancelable: false }
    );

  }
  else{
    Alert.alert('only Your can edit your own post ');
  }
  }

  function Delete(PostID){


    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete the Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteNotice(PostID)},
      ],
      { cancelable: false }
    );



  }


  const handlePress = () =>{

    navigation.navigate('AddNotice',{type : NoticeType});


  }


  useEffect(() => {
    async function fetchSubjects() {
        const data = []
     
        const db = firebase.firestore();
        const querySnapshot = await db.collection("Notices").get();
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
          const dataObj = doc.data();
          if(dataObj.type == 'Faculty'){
            data.push(doc.data());
          }
          
         

        
         
        });

        setSubjects(data);
      

        
        

      

        
    }


   

    fetchSubjects();
   
}, []);


useEffect(() => {
  async function getUserInfo(){
    let doc = await firebase
    .firestore()
    .collection("users")
    .doc(currentUserUID)
    .get();

    if (!doc.exists){
      Alert.alert('No user data found!')
    } else {
      let dataObj = doc.data();
      setRole(dataObj.role);
      
     
    }


  }
  getUserInfo();


})


const generateRandomBrightestHSLColor=()=> {
	return "hsla(" + ~~(360 * Math.random()) + "," +
		"80%," +
		"90%,2)"
}

 const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));


  }, []);



 

if (role == 'Lecturer'){

  return(
    <View style={styles.container}>
      <ScrollView style = {styles.scrollScreen}
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      
      >
      <View style = {{marginTop : 20 ,marginBottom : 20 , }}>
                  <Text style = {{fontSize : 20 , marginTop :5 ,alignSelf :'center'}}> <Octicons name="note" size={25} color="#34dbeb" /> Faculty Noticeboard</Text>
      </View>
  
      <FlatList
  
          data={subjects}
          renderItem={({item}) =>(
            <View style  = {[styles.Box , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>
  
  
          <View style = {{marginLeft : 280, marginTop : 8}}>
            <TouchableOpacity onPress={() => Edit(item.id, item.UserID)}>
            <AntDesign name="edit" size={20} color="black" />
            <Text style = {{fontSize : 8,}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style = {styles.title} >{item.title}</Text>        
          <View style = {styles.Msg} >
          <Text style = {styles.msg}>{item.notice}</Text>
          <Text style = {styles.msgText}>{item.firstName}  {item.lastName}</Text>
  
          <Text style = {styles.msgText}>{item.DateTime}</Text>
  
          </View>        
          </View>
  
          )}
          keyExtractor={(item, index) => index.toString()}
          
         

          
          />
  
  
  
  
       
        
  
      
  
  
      </ScrollView>
  
      
  
      <View style = {styles.AddIcon}>
        
         <Ionicons name="md-add-circle-sharp" size={50} color="#03dffc" onPress={handlePress} />
        
      </View>
      
     
      
    </View>
    );

}

else if( role == 'Demo'){
  return(
    <View style={styles.container}>
      <ScrollView style = {[styles.scrollScreen ,{marginBottom :110}]} >
      <View style = {{marginTop : 20 ,marginBottom : 20 , }}>
                  <Text style = {{fontSize : 20 , marginTop :5 ,alignSelf :'center'}}> <Octicons name="note" size={25} color="#34dbeb" /> Faculty Noticeboard</Text>
      </View>
        
  
      <FlatList
  
          data={subjects}
          renderItem={({item}) =>(
            <View style  = {[styles.Box , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>
  
  
          
          <Text style = {styles.title} >{item.title}</Text>        
          <View style = {styles.Msg} >
          <Text style = {styles.msg}>{item.notice}</Text>
          <Text style = {styles.msgText}>{item.firstName}  {item.lastName}</Text>
  
          <Text style = {styles.msgText}>{item.DateTime}</Text>
  
          </View>        
          </View>
  
          )}
  
          />
  
  
  
  
       
        
  
      
  
  
      </ScrollView>
  
      
  
      
      
     
      
    </View>
    );
}

else if(role == 'Student'){
  return(
    <View style={styles.container}>
      <ScrollView style = {[styles.scrollScreen ,{marginBottom :110}]} >

      <View style = {{marginTop : 20 ,marginBottom : 20 , }}>
                  <Text style = {{fontSize : 20 , marginTop :5 ,alignSelf :'center'}}> <Octicons name="note" size={25} color="#34dbeb" /> Faculty Noticeboard</Text>
      </View>
       
  
      <FlatList
  
          data={subjects}
          renderItem={({item}) =>(
            <View style  = {[styles.Box , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>
  
  
          
          <Text style = {styles.title} >{item.title}</Text>        
          <View style = {styles.Msg} >
          <Text style = {styles.msg}>{item.notice}</Text>
          <Text style = {styles.msgText}>{item.firstName}  {item.lastName}</Text>
  
          <Text style = {styles.msgText}>{item.DateTime}</Text>
  
          </View>        
          </View>
  
          )}
  
          />
  
  
  
  
       
        
  
      
  
  
      </ScrollView>
  
      
  
     
      
     
      
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
    padding: 15,
    paddingTop: 30,
   
    backgroundColor: "white",
  },
  AddIcon:{
   
    marginLeft :250,
    position : 'absolute',
    marginBottom :5,
    marginTop :600,
    flex: 1,
    justifyContent: 'flex-end',
    
    

  },
  scrollScreen :{
   
    
    marginBottom :20,
    borderRadius : 10,
    marginTop:-10,
    height :500,
    backgroundColor :'white',
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
  homeContent :{
    alignSelf :'center',
    alignItems :'center',
    marginTop : 10,
    marginBottom : 15,
    backgroundColor :'#f2ffff',
    height : 120,
    width : 250,
    borderRadius : 10,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 8,
  },
  homeContentText :{
    alignSelf : 'center',
    marginTop : 30,
    fontSize : 30,

  },
  Box :{
    marginBottom : 15,
    marginTop : 15,
    marginLeft : 5,
    marginRight : 5,
    backgroundColor : '#f5feff',
    borderRadius : 5,
    marginHorizontal: 1,
    borderRadius : 10,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
   
  },
  Msg :{
    marginLeft : 30,
    marginTop : 20,
    marginRight : 30,


  
    borderRadius : 2,
   
    
  },
  pic : {
    alignSelf : 'center',
    marginTop : 10
  },
  title : {
    marginTop : 30,
    alignSelf : 'center',
    fontSize : 25,
    fontWeight : 'bold'
  },
  msgText:{
    marginLeft : 150,
    marginTop : 5,
    marginBottom : 5,
    fontSize : 10
  },
  msg : {
    fontSize : 15,
    marginBottom : 20,
    marginLeft : 10,
    marginRight : 5
  },
  Loadingcontainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
})




