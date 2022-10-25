import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        console.warn("Finish Register");
    }

    const onSignInPressed = () => {
        console.warn("Sign In");
        navigation.navigate('HomePage');
    }

    const onResendPressed = () => {
        console.warn("Resend code");
    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Confirm your Email</Text>

            <CustomInput 
             placeholder="Enter your confirmation code" 
             value={code} 
             setValue={setCode} />

             <CustomButton text="Confirm" onPress={onConfirmPressed} />

             <CustomButton 
             text="Resend code" 
             onPress={onResendPressed}
             type="SECONDARY" />

             <CustomButton 
             text="Sign In" 
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

export default ConfirmEmailScreen;