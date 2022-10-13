import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const onRegisterPressed = () => {
        console.warn("Register");
    }

    const onSignInPressed = () => {
        console.warn("Sign Up");
    }

    const onTermsOfUsePressed = () => {
        console.warn("Terms of Use");
    }

    const onPolicyPressed = () => {
        console.warn("Privacy Policy");
    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Create an Account</Text>

            <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} />

            <CustomInput 
             placeholder="Email" 
             value={email} 
             setValue={setEmail} />

             <CustomInput 
             placeholder="Password" 
             value={password} 
             setValue={setPassword}
             secureTextEntry={true} />

            <CustomInput 
             placeholder="Repeat Password" 
             value={passwordRepeat} 
             setValue={setPasswordRepeat} />

             <CustomButton text="Register" onPress={onRegisterPressed} />

             <Text style={styles.text}>By regiestering, you confirm that you
              accept our 
              <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use </Text>and 
              <Text style={styles.link} onPress={onPolicyPressed}> Privacy Policy </Text></Text>

             <CustomButton 
             text="Have an account? Sign In" 
             onPress={onSignInPressed}
             type="TERTIARY" />

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#851C60',
        margin: 10,
    },
    link: {
        color: '#FDB075'

    }
});

export default SignUpScreen;