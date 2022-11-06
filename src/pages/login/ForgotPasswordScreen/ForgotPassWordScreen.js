import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomButton from '../../../components/login/CustomButton';
import CustomInput from '../../../components/login/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const onSendPressed = () => {
        // will send code to email entered (if there's an account attached)
        auth.sendPasswordResetEmail(email)
        .then(() => {
            console.log("Reset email sent to", email)
        })
        .catch(error => {
            console.log(error)
            console.warn("This email is not associated with an existing account")
        })
    }

    const onGoToSignInScreenPressed = () => {
        //Back to sign in
        navigation.navigate('Sign In Screen');

    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Enter username here to receive email with a password reset code</Text>

            <CustomInput 
             placeholder="Email" 
             value={email} 
             setValue={setEmail} />

             <CustomButton text="Send" onPress={onSendPressed} />

             <CustomButton 
             text="Resend code" 
             onPress={onSendPressed}
             type="SECONDARY" />

             <CustomButton 
             text=" Back to Sign In" 
             onPress={onGoToSignInScreenPressed}
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