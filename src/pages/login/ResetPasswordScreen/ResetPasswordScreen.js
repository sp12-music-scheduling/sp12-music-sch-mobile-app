import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomButton from '../../../components/login/CustomButton';
import CustomInput from '../../../components/login/CustomInput';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigation = useNavigation();

    const onEnterPressed = () => {
        console.warn("Sent code");
        // will send code to email attached to username component input
    }

    const onSignInPressed = () => {
        console.warn("Sign In");
    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Reset your password</Text>

            <CustomInput 
             placeholder="Enter reset code" 
             value={code} 
             setValue={setCode} />

            <CustomInput 
             placeholder="Enter a new password" 
             value={newPassword} 
             setValue={setNewPassword} />

             <CustomButton text="Enter" onPress={onEnterPressed} />

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

export default ResetPasswordScreen;