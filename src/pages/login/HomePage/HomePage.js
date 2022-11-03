//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../../../firebase';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';


// create a component
const HomePage = () => {

    const navigation = useNavigation()


    const onSignOutPressed = () => {
        auth.signOut()
        .then(() => {
            navigation.replace("Sign In Screen")
        })
        .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Text>User: {auth.currentUser?.email}</Text>
            {/* shows logged in user */}
            {/* ? is a conditional so in the case that if currentUser is undefined, the app doesn't crash */}
            <Text>Home Page</Text>
            <CustomButton 
            text="Sign Out" 
            onPress={onSignOutPressed} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    root: {
        alignItems: 'center',
        padding: 20,
    },
});

//make this component available to the app
export default HomePage;
