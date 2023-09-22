import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { ContextProvider } from "./src/contextState";
import Login from "./src/components/login";
import Home from "./src/components/Home";
import ListChild from "./src/components/ListChild";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  const [search, setSearch] = useState("marvel");

  let title = "Try out to click any movie!";

  const onPress = () => {
    console.log("on press");
    setSearch("New Title");
  };
//Falta navegacion
  return (
    <ContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={ListChild} />

    </Stack.Navigator>
    </NavigationContainer>
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
