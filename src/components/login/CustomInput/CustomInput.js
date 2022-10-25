//import libraries
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// create a component
const CustomInput = ({value, setValue, placeholder, setPlaceholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
            value={value}
            onChangeText={setValue} 
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry} /> 
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5, 
        // padding = spacing inside an element
        // margin = spacing outside an element
    },
    input: {},
})

//make this component available to the app
export default CustomInput;
