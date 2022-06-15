import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar, View, StyleSheet } from "react-native";
import LoginProvider from "./app/context/loginProvider";

export default function App() {
  const isLogedIn = true;
  return (
    <View style={styles.container}>
      <LoginProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </LoginProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
