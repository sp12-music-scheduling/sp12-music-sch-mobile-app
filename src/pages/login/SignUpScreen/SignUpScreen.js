import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import CustomButton from '../../../components/login/CustomButton';
import CustomInput from '../../../components/login/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../../firebase';
import { Alert } from 'react-native';

const SignUpScreen = () => {
    const studentEmail = "@students.kennesaw.edu"
    const facultyEmail = "@kennesaw.edu"
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();


    // creates user with email and password
    const onRegisterPressed = () => {
        if(email.length == 0) {
            Alert.alert("Please enter an email address.")
        } else if(password.length == 0) {
            Alert.alert("Please enter a password")
        } else if(passwordRepeat != password) {
            Alert.alert("Passwords are not matching. Please ensure the passwords match.")
        } else if(email.includes(studentEmail) || email.includes(facultyEmail)) {
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
        Alert.alert("This application is for the use of Kennesaw State University Students and faculty. Accounts should only be used by their creator.");
    }

    const onPolicyPressed = () => {
        Alert.alert("Information collected will be (1) The user's email address.");
    }

    return (
        <View style={styles.root}>
            <Text styles={styles.title}>Create an Account</Text>

            {/* <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} /> */}

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