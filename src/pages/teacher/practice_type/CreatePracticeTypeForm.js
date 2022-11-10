import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { auth, firestore } from '../../../../firebase';



const CreatePracticeTypeForm = ({navigation}) => {

    const user = auth.currentUser;

    const [name, setName] = useState('');
    const [subType, setSubType] = useState('');

    const onCreatePressed = () => {
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
            firestoreCreate();
        }
    }

    const firestoreCreate = () => {
        /*
        */
        firestore.collection('practice_types')
        .add({
            user_uid: user.uid,
            name: name,
            sub_type: subType,
        }).then( () => {
            navigation.navigate('Manage Practice Types');
        });
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