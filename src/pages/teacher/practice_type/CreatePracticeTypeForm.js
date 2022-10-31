import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { getDBConnection, insertPracticeTypeRow} from "../../../services/database";


const CreatePracticeTypeForm = ({navigation}) => {

    const [name, setName] = useState('');
    const [subType, setSubType] = useState('');

    const onCreatePressed = async () => {
        /*
        Function that action(s) the CREATE functionality.
            1. Performs validations
            2. Makes DB call to create the Practice Type
            3. Redirects back to Parent page
        */
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        }
        else {
            createPracticeType();
            navigation.navigate('Manage Practice Types');
        }
    }

    const validationEmptyValues= () => {
        /*
        Checks if any of the inputs are empty (ie = '').
        */
        if (name.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    const createPracticeType = async () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
        const practice_type = {
            'name': name.trim(),
            'sub_type': subType.trim(),
        };
        const db = await getDBConnection();
        await insertPracticeTypeRow(db, practice_type);
    }

    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Name"
            value={name} 
            setValue={setName} />
            <FormTextInput 
            fieldName="Sub-Type (optional)"
            value={subType} 
            setValue={setSubType} />
            <FormButton 
            text="Create"
            onPress={onCreatePressed} />
        </View>
    )
}

export default CreatePracticeTypeForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});