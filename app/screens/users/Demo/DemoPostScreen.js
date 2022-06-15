import React from 'react';

import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function DemoPostScreen({navigation}){

    
    
 
    return(
      
    <View style={styles.container}>
       

        
        <ScrollView style = {styles.scrollScreen}>
         
         
          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

          <View style = {[styles.homeContent ,{backgroundColor : '#ffffff'}]}> 
            <View style = {styles.postName}>
              <Text> name</Text>
              </View>
            <Text style = {styles.homeContentText}>Post 1</Text>
          </View>

       
        </ScrollView>
      <View style= {styles.iconAdd}>
          <MaterialIcons name="post-add" size={40} color="#ff9054"  /> 
      </View>

      


    
      
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
    iconAdd :{

      alignSelf : 'center',
      marginTop :-100,
      marginBottom : 110,
      shadowRadius: 10,
    
     
      

    },
    postName : {
      backgroundColor : '#38deff',
      height : 30,
      width :290,
      borderRadius : 10,
      alignItems : 'center'
    },
    scrollScreen :{
      marginTop : 5,
      marginRight : 1,
      marginBottom : 115,
      borderRadius : 1,
      marginLeft:10,
      backgroundColor :'white',
      marginHorizontal: 1,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 0.5,
      
  
    },
    homeContent :{
      alignSelf :'center',
      alignItems :'center',
      marginTop : 10,
      marginBottom : 5,
      backgroundColor :'#f2ffff',
      height : 180,
      width : 290,
      borderRadius : 10,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 6,
      shadowRadius: 20,
      elevation: 5,
    },
    homeContentText :{
      alignSelf : 'center',
      marginTop : 30,
      fontSize : 30,

    },
    head : {
        alignSelf : 'center',
        marginTop : 20,
        
    },
    headText : {
        fontSize : 20,
        marginBottom : 10,
    }
}) 