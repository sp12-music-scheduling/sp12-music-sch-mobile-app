import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { getDBConnection, updatePracticeTypeRow, deletePracticeTypeRow } from "../../../services/database";


const UpdateOrDeletePracticeTypeForm = ({route, navigation}) => {

    const [name, setName] = useState(route.params.practice_type.name);
    const [subType, setSubType] = useState(route.params.practice_type.sub_type);

    const onDeletePressed = async () => {
        /*
        Function that implements the DELETE functionality.
        */
        const db = await getDBConnection();
        await deletePracticeTypeRow(db, route.params.practice_type);
        navigation.navigate('Manage Practice Types');
    }

    const onUpdatePressed = async () => {
        /*
        Function that action(s) the UPDATE functionality.
            1. Performs validations
            2. Makes DB call to update the Practice Type
            3. Redirects back to Parent page
        */
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        } else {
            await updateOnDatabase();
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

    const updateOnDatabase = async () => {
        /*
        Calls a database function to update a Practice Type.
        */
        const pt = {
            "id":	route.params.practice_type.id,
            "name":	name,
            "sub_type": subType,
        };
        const db = await getDBConnection();
        await updatePracticeTypeRow(db, pt);
    }

    return (
        <View style={styles.container}>
            {/* Field(s) */}
            <FormTextInput 
            fieldName="Name"
            value={name} 
            setValue={setName} />
            <FormTextInput 
            fieldName="Sub-Type (optional)"
            value={subType} 
            setValue={setSubType} />
            {/* Action(s) */}
            <FormButton 
            text="Update"
            onPress={onUpdatePressed} />
            <FormButton 
            text="Delete"
            onPress={onDeletePressed} />
        </View>
    )
}

export default UpdateOrDeletePracticeTypeForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});