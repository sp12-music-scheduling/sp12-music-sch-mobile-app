import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/icons/Logo.png' // import logo
import CustomInput from '../../../components/login/CustomInput';
import CustomButton from '../../../components/login/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('HomePage');
    }

    const onSignUpPressed = () => {
        navigation.navigate('Sign Up Screen')
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('Forgot Password Screen');
    }

    return (
        <View style={styles.root}>
            <Image source={Logo}
             style={[styles.logo, {height: height * 0.3}]} 
             resizeMode="contain"/>

             <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} />
             <CustomInput 
             placeholder="Password" 
             value={password} 
             setValue={setPassword}
             secureTextEntry={true} />

             <CustomButton text="Sign In" onPress={onSignInPressed} />
             <CustomButton text="Not Registered? Sign Up"
              onPress={onSignUpPressed} />
             <CustomButton 
             text="Forgot Password?" 
             onPress={onForgotPasswordPressed}
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