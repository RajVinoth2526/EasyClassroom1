import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar, View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
