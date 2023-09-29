import React, { useState } from "react";
import {SafeAreaView, TextInput, Button, StyleSheet, View, Text, Pressable } from "react-native";
import axios from 'axios'
import { Formik } from "formik";
import {login} from "../services/loginClient"

const Login = ({navigation}) => {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });

  const handleForm = async (values) => {
    console.log("Entre al login")
    console.log(values)
    const token = await login(values).catch(error=>alert("Algun dato es erroneo"))
    
  };

  return (
    <View style={styles.container}>
    <Text style={styles.text}>TP - Comidas</Text>
    <Formik  style={styles.form} initialValues={{ email: '', password: ''} }
     onSubmit={handleForm}>
     {({ handleChange, handleSubmit, values }) => (
       <View>
         <TextInput style={styles.input}
           
           onChangeText={handleChange('email')}
           value={values.email}
         />
         <TextInput style={styles.input}
           
           onChangeText={handleChange('password')}
           value={values.password}
           secureTextEntry={true}
         />
         
         <Pressable style={styles.button} onPress={handleSubmit}>
          <Text>Iniciar Sesion</Text>
         </Pressable>
         
       </View>
     )}
   </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  input: {
    padding: 15,
    width: 330,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 15,
    placeholderTextColor: "gray",
  },
  button: {
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 20,

    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

export default Login;
