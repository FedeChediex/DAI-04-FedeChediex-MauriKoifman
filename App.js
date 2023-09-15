import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import  enu  from "./src/components/menu";
import { useState } from "react";
import Menu from "./src/components/menu";

export default function App() {
  const [search, setSearch] = useState("marvel");

  let title = "Try out to click any movie!";

  const onPress = () => {
    console.log("on press");
    setSearch("New Title");
  };

  return (
    <ContextProvider>
      <View style={styles.container}>
        <Text>{search}</Text>
        <TouchableOpacity onPress={onPress}> Press me!</TouchableOpacity>
        <Menu search={search}></Menu>
        <StatusBar style="auto" />
      </View>
    </ContextProvider>
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