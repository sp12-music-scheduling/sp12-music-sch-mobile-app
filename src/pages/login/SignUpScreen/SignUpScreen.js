import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../../../components/login/CustomButton';
import FormTextInput from '../../../components/form/FormTextInput';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen = () => {
    const studentEmail = "@students.kennesaw.edu"
    const facultyEmail = "@kennesaw.edu"
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
       // creates user with email and password
       if(email.includes(studentEmail) || email.includes(facultyEmail)) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
       } else {
        Alert.alert("Only Kennesaw State students and faculty can use this application.")
       }
       
    }

    const onSignInPressed = () => {
        navigation.navigate('Sign In Screen');
    }

    const onTermsOfUsePressed = () => {
        // Terms of Use page can be added later
        console.warn("Terms of Use");
    }

    const onPolicyPressed = () => {
        // Privacy Policy page can be added later
        console.warn("Privacy Policy");
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text styles={styles.title}>Create an Account</Text>
            <FormTextInput 
            fieldName="Email"
            value={email} 
            setValue={setEmail} />

            <FormTextInput 
            fieldName="Password"
            value={password} 
            setValue={setPassword}
            secureTextEntry={true} />

            <FormTextInput 
            fieldName="Repeat Password"
            value={passwordRepeat} 
            setValue={setPasswordRepeat}
            secureTextEntry={true} />

            <CustomButton text="Register" onPress={onRegisterPressed} />

            <Text style={styles.text}>By registering, you confirm that you
            accept our 
            <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use </Text>and 
            <Text style={styles.link} onPress={onPolicyPressed}> Privacy Policy </Text></Text>

            <CustomButton 
            text="Have an account? Sign In" 
            onPress={onSignInPressed}
            type="TERTIARY" />

        </SafeAreaView>
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