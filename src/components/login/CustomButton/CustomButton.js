//import libraries
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// create a component
const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#3B71F3',
    },

    container_PRIMARY: {
        backgroundColor: '#C3AAAA',
    },

    container_SECONDARY: {
        backgroundColor: 'white',
        borderColor: '#C3AAAA',
        borderWidth: 2,
    },

    container_TERTIARY : {
        backgroundColor: 'white',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_SECONDARY: {
        color: '#C3AAAA',
        // backgroundColor: 'white',
    },

    text_TERTIARY: {
        color: '#C3AAAA',
        // backgroundColor: 'white',
    },
});

//make this component available to the app
export default CustomButton;
