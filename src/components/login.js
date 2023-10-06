import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import { login } from "../services/loginClient";
import { useContextState, ActionTypes } from "../contextState";

const Login = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();

  const handleForm = async (values) => {
    console.log("Entre al login");
    console.log(values);
    const token = await login(values).catch((error) =>
      alert("Algun dato es erroneo")
    )
    if (token) {
      setContextState({
        type: ActionTypes.setUserToken,
        newValue: token,
      });
      navigation.navigate("Buscador");
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TP - Comidas</Text>

      <Formik
        style={styles.form}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleForm}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.loginBox}>
            <Text style={styles.h2}>Iniciar Sesión</Text>
            <View style={styles.userBox}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Mail"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
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
    backgroundColor: "#141e30",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#fff",
  },
  loginBox: {
    width: 400,
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignItems: "center",
  },
  h2: {
    margin: 0,
    padding: 0,
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
  },
  userBox: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#03e9f4",
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: "#222",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Login;
