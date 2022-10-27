import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
export default function RefreshPostScreen({ navigation }) {
  navigation.replace("PostScreen");

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
