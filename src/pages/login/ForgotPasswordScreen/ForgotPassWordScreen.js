import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const onSendPressed = () => {
        console.warn("Sent code");
        // will send code to email attached to username component input
        // logic will be handled later
    }

    const onSignInPressed = () => {
        //Back to sign in
        navigation.navigate('Sign In Screen');

        // console.warn("Sign In");
    }

    const onResendPressed = () => {
        console.warn("Resend code");
         // will resend code to email attached to username component input
        // logic will be handled later
    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Enter username here to receive email with a password reset code</Text>

            <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} />

             <CustomButton text="Send" onPress={onSendPressed} />

             <CustomButton 
             text="Resend code" 
             onPress={onResendPressed}
             type="SECONDARY" />

             <CustomButton 
             text=" Back to Sign In" 
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

export default ForgotPasswordScreen;