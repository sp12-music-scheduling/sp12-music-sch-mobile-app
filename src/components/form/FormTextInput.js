import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormTextInput = ({fieldName, value, setValue, editable = true, secureTextEntry = false}) => {
    return (
        <View style={styles.container}>
          <Text>{fieldName}</Text>
          <TextInput
            onChangeText={setValue}
            value={value}
            style={editable == true ? styles.input_box : [styles.input_box, styles.editable_false] }
            editable={editable}
            secureTextEntry={secureTextEntry}
          />
        </View>
    );
};

export default FormTextInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input_box: {
        backgroundColor: 'white',
        height: 40,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5, 
    },
    editable_false: {
        backgroundColor: '#ADAAAA',
    },
})
