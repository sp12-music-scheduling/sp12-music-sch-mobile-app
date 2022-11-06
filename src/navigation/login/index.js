//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../../pages/login/SignInScreen';
import SignUpScreen from '../../pages/login/SignUpScreen';
import ConfirmEmailScreen from '../../pages/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../../pages/login/ForgotPasswordScreen';
import ResetPasswordScreen from '../../pages/login/ResetPasswordScreen';
import HomePage from '../../pages/login/HomePage';


const Stack = createNativeStackNavigator();


// create a component
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name = "Sign In Screen" component={SignInScreen} />
                <Stack.Screen name = "Sign Up Screen" component={SignUpScreen} />
                <Stack.Screen name = "Confirm Email Screen" component={ConfirmEmailScreen} />
                <Stack.Screen name = "Forgot Password Screen" component={ForgotPasswordScreen} />
                <Stack.Screen name = "Reset Password Screen" component={ResetPasswordScreen} />
                <Stack.Screen name = "HomePage" component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Navigation;
