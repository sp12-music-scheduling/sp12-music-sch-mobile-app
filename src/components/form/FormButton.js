//
// Use this Button when submitting data on a Input Form
//

import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const FormButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#C3AAAA',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
});
