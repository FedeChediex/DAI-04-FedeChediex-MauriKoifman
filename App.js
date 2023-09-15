import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import  Login  from "./src/components/login";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("marvel");

  let title = "Try out to click any movie!";

  const onPress = () => {
    console.log("on press");
    setSearch("New Title");
  };

  return (
    
      <View style={styles.container}>
        <Login></Login>
        <StatusBar style="auto" />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
