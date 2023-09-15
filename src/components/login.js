import React, { useState } from "react";
import {SafeAreaView, TextInput, Button, StyleSheet, View, Text } from "react-native";

const Login = () => {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });

  const handleSubmit = (event) => {
    event?.preventDefault();
  };

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Mail"
          /*onChangeText={setEmail(value)}*/
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          /*onChangeText={setPassword(value)}*/
          secureTextEntry={true}
        />
        <Button title="LogIn" onPress={handleSubmit()} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default Login;
