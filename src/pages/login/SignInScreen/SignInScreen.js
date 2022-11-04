import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/images/Logo.png' // import logo
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    // event handler; if there's a user, then navigate to homescreen
    // "unsubscribe" = when login screen is left, the listener will stop being unneecessarily pinged
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate("HomePage");
            }
        })
        return unsubscribe;
    }, [])

    const onSignInPressed = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email, ' Logged in');
        })
        .catch(error => alert(error.message))
    }

    const onGoToSignUpScreenPressed = () => {
        navigation.navigate('Sign Up Screen')
    }

    const onGoToForgotPasswordScreenPressed = () => {
        navigation.navigate('Forgot Password Screen');
    }

    return (
        <View style={styles.root}>
            <Image source={Logo}
             style={[styles.logo, {height: height * 0.3}]} 
             resizeMode="contain"/>

             <CustomInput 
             placeholder="Email" 
             value={email} 
             setValue={setEmail} />

             <CustomInput 
             placeholder="Password" 
             value={password} 
             setValue={setPassword}
             secureTextEntry={true} />

             <CustomButton text="Sign In" onPress={onSignInPressed} />
             <CustomButton text="Not Registered? Sign Up"
              onPress={onGoToSignUpScreenPressed} />
             <CustomButton 
             text="Forgot Password?" 
             onPress={onGoToForgotPasswordScreenPressed}
             type="TERTIARY" />

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 500,
        height: 200,
    },
});

export default SignInScreen;