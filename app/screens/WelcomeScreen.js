
import {ImageBackground, StyleSheet, View, Text,TouchableOpacity ,SafeAreaView,Image} from 'react-native';
import React from 'react';


export default function WelcomeScreen ({navigation}) {
  return (
     
    <SafeAreaView style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require("./../assets/logo.png")}
      ></Image>
      <Text style={styles.text}> TIME TO LEARN </Text>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => navigation.navigate('Sign In')}
      >
        <Text style={styles.buttonText}>SignIn</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#b5b4b1" }]}
        title="create class"
        onPress={() => navigation.navigate('VerifyRole')}
      >
        <Text style={styles.buttonText}>SignUp </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  newButton: {
    width: "100%",
  },

  button: {
    marginBottom: 20,
    backgroundColor: "#34dbeb",
    height: 60,
    borderRadius: 12,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  logo: {
    width: 190,
    height: 190,
  },

  logoContainer: {
    position: "absolute",
    top: 180,
    alignItems: "center",
  },

  buttonText: {
    marginTop : 5,
    color: "black",
    fontSize: 25,
    alignSelf: "center",
  },

  text: {
    fontWeight: "bold",
    position: "absolute",
    color :'black',
    marginTop : 30,
    top: 130,
    fontSize: 20,
  },

  buttonContainer: {
    width: "70%",
    marginBottom: 30,
  },
});