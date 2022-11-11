import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import FormSelectInput from '../../../components/form/FormSelectInput'
import { auth, firestore } from '../../../../firebase';


const UpdateOrDeletePracticePlanForm = ({route, navigation}) => {
   
    const user = auth.currentUser;

    const [name, setName] = useState(route.params.practice_plan.name);
    const [durationDays, setDurationDays] = useState(route.params.practice_plan.duration_days.toString());
    const [practicePlanTypeDocID, setPracticePlanTypeDocID] = useState('');

    const generateSelectOptions = () => {
        /*
        Return a list of Practice Plan Type(s) for the SelectList Dropdown.
        This option takes as input a list of dict such as [{'key': '', 'value': ''} ...]
        */
        const types = [];
        route.params.availablePracticePlanTypes.forEach(dict => types.push({
            'key': dict.key,
            'value': dict.sub_type == "" ? dict.name : dict.name + ": " + dict.sub_type
        }));
        return types;
    }

    const onDeletePressed = () => {
        /*
        Function that implements the DELETE functionality.
        */
        firestoreDelete();  
    }

    const firestoreDelete = () => {
        /*
        Function that implements the DELETE functionality.
        */
        firestore.collection('practice_plans')
        .doc(route.params.practice_plan.key)
        .delete()
        .then(() => {
            navigation.navigate('Practice Plans');
        });
    }

    const onUpdatePressed = async () => {
        /*
        Function that action(s) the UPDATE functionality.
            1. Performs validations
            2. Makes DB call to update the Practice Plan
            3. Redirects back to Parent page
        */
        if (validateEmptyValues() == false) {
            alert('Please fill all fields!');
        } else if (validateDurationIsNumber() == false) {
            alert('Durations (days) must be a number!');
        } else {
            firestoreUpdate();
        }
    }

    const validateEmptyValues= () => {
        /*
        Checks if any of the inputs are empty (ie = '').
        */
        if (name.trim() == "") {
            return false;
        } else if (durationDays.trim() == "") {
            return false;
        }else if (practicePlanTypeDocID.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    const validateDurationIsNumber = () => {
        /*
        Checks that Durations (days) is numeric.
        */
        return !isNaN(Number(durationDays.trim()));
    }

    const firestoreUpdate = () => {
        /*
        Calls a database function to UPDATE a Practice Plan.
        */
        firestore.collection('practice_plans')
        .doc(route.params.practice_plan.key)
        .update({
            user_uid: user.uid,
            name: name,
            duration_days: Number(durationDays.trim()),
            code: route.params.practice_plan.code,
            practice_type_doc: practicePlanTypeDocID,
        }).then(()=>{
            navigation.navigate('Practice Plans');
        });
    }

    const setPracticePlanCode= () => {
        /*
        Dummy placeholder. Does nothing. This field is
        unique and not editable.
        */
    }

    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Name"
            value={name} 
            setValue={setName} />
            <FormTextInput 
            fieldName="Duration (days)"
            value={durationDays} 
            setValue={setDurationDays} />
            <FormTextInput 
            fieldName="Code (used by student to register)"
            value={route.params.practice_plan.code} 
            setValue={(setPracticePlanCode)}
            editable={false} />
            <FormSelectInput 
            fieldName="Type"
            defaultOption={route.params.practice_type} 
            setValue={setPracticePlanTypeDocID}
            options={generateSelectOptions()} />
            <FormButton 
            text="Update"
            onPress={onUpdatePressed} />
            <FormButton 
            text="Delete"
            onPress={onDeletePressed} />
        </View>
    )
}

export default UpdateOrDeletePracticePlanForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});