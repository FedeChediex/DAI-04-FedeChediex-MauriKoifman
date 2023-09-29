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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  
//Falta navegacion
  return (
    <ContextProvider>
    
    <Login></Login>
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
