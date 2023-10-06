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
import Buscador from "./src/components/Buscador";
;import DetallePlato from "./src/components/DetallePlato" 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  
//Falta navegacion
  return (
    <ContextProvider>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login"component={Login}/>
        <Stack.Screen name="Buscador"component={Buscador}/>
        <Stack.Screen name="detalle"component={DetallePlato}/>
        

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
