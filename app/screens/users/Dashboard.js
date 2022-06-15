
import React  ,{ useEffect, useState }  from 'react';
import { View, Text, TouchableOpacity,StyleSheet ,Image,ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as firebase from 'firebase';
import {createDrawerNavigator ,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { loggingOut } from '../../../API/firebaseMethods/firebaseMethod';
import Profile from '../Profile/Profile';
import SettingsScreen from '../settings /SettingsScreen';
import AdminHomeScreen from './Admin/AdminHome';
import StudentHomeScreen from './Student/StudentHome';
import LecturerHomeScreen from './Lecture/LecturerHome';
import DemoHomeScreen from './Demo/DemoHome';
import AdminChatScreen from './Admin/AdminChatScreen';
import LecturerChatScreen from './Lecture/LecturerChatScreen';
import DemoChatScreen from './Demo/DemoChatScreen';
import StudentChatScreen from './Student/StudentChatScreen';
import PostScreen from '../Post/PostScreen';
import DemoPostScreen from './Demo/DemoPostScreen';
import StudentPostScreen from './Student/StudentPostScreen';
import AdminSearchScreen from './Admin/AdminSearchScreen';
import LecturerSearchScreen from './Lecture/LecturerSearchScreen';
import DemoSearchScreen from './Demo/DemoSearchScreen';
import StudentSearchScreen from './Student/StudentSearchScreen';
import RefreshPostScreen from '../Post/RefreshPostScreen';

const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();

function TabNavigation(){

  let currentUserUID = firebase.auth().currentUser.uid;


  const [role, setRole] = useState('');


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
    
        setRole(dataObj.role) 
  
       
      }
    }
    getUserInfo();


  })


if(role == 'Lecturer'){
  return(
    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel : false,
      tabBarStyle:{
        position :'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius : 15,
        height : 80,

      }

    }}>
    <Tab.Screen name="Home" component={LecturerHomeScreen}
     options = {{
     
       tabBarIcon :({focused}) => (
         <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
           <FontAwesome name="home" size={30} color="#34dbeb" height = {5}  />
           <Text style = {{ color: 'black'}}>Home</Text>
         </View>
      ),
      headerShown:false,
      unmountOnBlur : true,
       
     }}/>
    <Tab.Screen name="Post" component={PostScreen} 
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="newspaper-o" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Post</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>
    <Tab.Screen name="Chat" component={LecturerChatScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <Entypo name="chat" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Chat</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    <Tab.Screen name="Search" component={LecturerSearchScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="search" size={24} color="#34dbeb" />
          <Text style = {{   color: 'black'}}>Search</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    

  </Tab.Navigator>

  )
}else if(role == 'Student' ){
  return(

    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel : false,
      tabBarStyle:{
        position :'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius : 15,
        height : 90,

      }

    }}>
    <Tab.Screen name="Home" component={StudentHomeScreen}
     options = {{
     
       tabBarIcon :({focused}) => (
         <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
           <FontAwesome name="home" size={30} color="#34dbeb" height = {5}  />
           <Text style = {{ color: 'black'}}>Home</Text>
         </View>
      ),
      headerShown:false,
      unmountOnBlur : true,
       
     }}/>

   <Tab.Screen name="Post" component={PostScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="newspaper-o" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Post</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>
    
    <Tab.Screen name="Chat" component={StudentChatScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <Entypo name="chat" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Chat</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    <Tab.Screen name="Search" component={StudentSearchScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="search" size={24} color="#34dbeb" />
          <Text style = {{   color: 'black'}}>Search</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    

  </Tab.Navigator>

    
  )
}else if(role == 'Demonstrator'){

  return(

    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel : false,
      tabBarStyle:{
        position :'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius : 15,
        height : 90,

      }

    }}>
    <Tab.Screen name="Home" component={DemoHomeScreen}
     options = {{
     
       tabBarIcon :({focused}) => (
         <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
           <FontAwesome name="home" size={30} color="#34dbeb" height = {5}  />
           <Text style = {{ color: 'black'}}>Home</Text>
         </View>
      ),
      headerShown:false,
      unmountOnBlur : true,
       
     }}/>
    <Tab.Screen name="Post" component={PostScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="newspaper-o" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Post</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>
    <Tab.Screen name="Chat" component={DemoChatScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <Entypo name="chat" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Chat</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    <Tab.Screen name="Search" component={DemoSearchScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="search" size={24} color="#34dbeb" />
          <Text style = {{   color: 'black'}}>Search</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    

  </Tab.Navigator>
  )
}

else if(role == 'Admin'){

  return(

    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel : false,
      tabBarStyle:{
        position :'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius : 15,
        height : 90,

      }

    }}>
    <Tab.Screen name="Home" component={AdminHomeScreen}
     options = {{
     
       tabBarIcon :({focused}) => (
         <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
           <FontAwesome name="home" size={30} color="#34dbeb" height = {5}  />
           <Text style = {{ color: 'black'}}>Home</Text>
         </View>
      ),
      headerShown:false,
      unmountOnBlur : true,
       
     }}/>
    
    <Tab.Screen name="Chat" component={AdminChatScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <Entypo name="chat" size={24} color="#34dbeb" />
          <Text style = {{ color: 'black'}}>Chat</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    <Tab.Screen name="Search" component={AdminSearchScreen}
    options = {{
      
      tabBarIcon :({focused}) => (
        <View style={{ alignItems:'center', justifyContent:'center',top :10}}>
         <FontAwesome name="search" size={24} color="#34dbeb" />
          <Text style = {{   color: 'black'}}>Search</Text>
        </View>
     ),
     headerShown:false,
     unmountOnBlur : true,
    
    }}/>

    

  </Tab.Navigator>

  )
}

return(

  <View style={styles.Loadingcontainer}>
     
 
  <ActivityIndicator color="blue" size="large" />

  </View>

  
)



}


export default function AdminDashboard({ navigation }) {

    const handlePress = () => {
        loggingOut();
        navigation.replace('Home');
      };
    
  return (
    <Draw.Navigator initialRouteName="Easy Classroom'" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={handlePress} />
          </DrawerContentScrollView>
        )
      }}>
      <Draw.Screen name = 'Easy Classroom' component= {TabNavigation } />
      <Draw.Screen name = 'Profile' component= { Profile} 
      
      options = {{
      
       
       unmountOnBlur : true,
      
      }}/>
     
      <Draw.Screen name = 'Setting' component= { SettingsScreen} />
     
    </Draw.Navigator>

   
      
  )
}

const styles = StyleSheet.create({


  Loadingcontainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },

  logo: {
  
    width: 200,
    height: 200,
  },


})

