import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { firestore } from '../../../../firebase';


const UpdateOrDeletePracticeTypeForm = ({route, navigation}) => {

    const [name, setName] = useState(route.params.practice_type.name);
    const [subType, setSubType] = useState(route.params.practice_type.sub_type);

    const onDeletePressed = () => {
        firestore.collection('practice_types')
        .doc(route.params.practice_type.key)
        .delete()
        .then(() => {
            navigation.navigate('Manage Practice Types');
        });
    }

    const onUpdatePressed = () => {
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        } else {
            firestoreUpdate();
        }
    }

    const firestoreUpdate = () => {
        /*
        */
        firestore.collection('practice_types')
        .doc(route.params.practice_type.key)
        .update({
            user_uid: route.params.practice_type.user_uid,
            name: name,
            sub_type: subType,
        }).then(()=>{
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