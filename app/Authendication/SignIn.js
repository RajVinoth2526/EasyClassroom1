
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,SafeAreaView, Alert ,Image,ActivityIndicator, KeyboardAvoidingView,} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { signIn } from '../../API/firebaseMethods/firebaseMethod';
import Modal from "react-native-modal";





export default function SignIn({ navigation }) {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('email field is required.');
     
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    signIn(email, password);
    setEmail('');
    setPassword('');

    return(
      <View style={styles.Loadingcontainer}>
     
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
      ></Image>
      <Text style={{color: 'black', fontSize: 40}}>Easy Classroom</Text>
      <ActivityIndicator color="blue" size="large" />

      </View>
    )
  };

  return (
    
  
    
      
<View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        style={styles.logo}
        source={require("./../assets/logo.png")}
        ></Image>
      <Text style={styles.text}>TIME TO LEARN</Text>
      </View>

<SafeAreaView >
 <ScrollView style={{height:200}}>

     
       <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Email</Text>
        <View style={styles.action}>
          <TextInput  placeholder="Enter your email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none" style={styles.textinput} />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Password </Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
        </View>
      </View>
    
      
      </ScrollView>
 </SafeAreaView>

      
      <TouchableOpacity   style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>SignIn</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => navigation.navigate('VerifyRole')}>
          <Text style={styles.inlineText}>Don't have an account?</Text>
          </TouchableOpacity>
  </View>
    
  );
    
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 10,
    backgroundColor: "#ffffff",
  
  },

  cardCont: {
    marginTop: -10,
    marginLeft: 40,
    padding : 5,
    width:'80%',
    
  },
  text: {
    marginTop :-20,
    fontWeight: "bold",
    fontSize: 20,
   
  },

  cardtext: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    
  },
  inlineText:{
    color:'blue',
    marginTop:15,
    alignSelf: "center",
    
  },

  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    top: 20,
    marginBottom : 70,
    alignItems: "center",
    padding: 10,
  },
  action: {
    marginTop: 5,
    
    borderRadius : 10,
    paddingBottom: 5,
    marginBottom: 20,

    backgroundColor :'white',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    
  },

  textinput: {
    color: "black",
    padding:7,
    fontSize: 20,
    paddingLeft :8
  },

  buttonLogin: {
    backgroundColor: "#34dbeb",
    alignSelf: "center",
    height: 50,
    borderRadius: 9,
    marginTop : 40,
    paddingTop: 3, 
    width : '60%',
    alignItems : 'center',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 8,
    elevation: 7,
    
  },

  buttontext: {
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 2,
  },

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
});
