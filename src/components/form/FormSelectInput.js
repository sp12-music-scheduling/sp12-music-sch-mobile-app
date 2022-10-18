import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectList from 'react-native-dropdown-select-list'


const FormSelectInput = ({ fieldName, defaultOption, setValue, options}) => {
    return (
    <View style={styles.container}>
          <Text>{fieldName}</Text>
          <SelectList 
          setSelected={setValue} 
          data={options} 
          search={false} 
          boxStyles={{
            backgroundColor: 'white',
            borderColor: 'white',
            marginTop: 5,
            marginBottom: 5, 
            borderRadius: 0
          }}
          defaultOption={defaultOption}
          />
    </View>
    );
};

export default FormSelectInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input_box: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
        backgroundColor: 'white'
    },
})