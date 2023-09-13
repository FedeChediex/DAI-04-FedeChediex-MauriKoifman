import React, { useState } from "react";
import {TextInput} from 'react-native';

const Form = () => {
    const [email, setEmail] = useState({email:""})
    const [password, setPassword] = useState({password:""})
} 
const handleSubmit = (event) => {
    event?.preventDefault()
}

return (
    <SafeAreaView>
            <Text>Email</Text>
        <TextInput
            onChangeText={setEmail(value)}
            />
            <Text>Password</Text>
        <TextInput
            onChangeText={setPassword(value)}
            secureTextEntry={true}
        />
        <Button
        onPress={handleSubmit()}
        title="LogIn"/>
    </SafeAreaView>
  );

export default Login