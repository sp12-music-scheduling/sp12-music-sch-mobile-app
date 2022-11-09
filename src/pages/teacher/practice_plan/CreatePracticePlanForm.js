import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import FormSelectInput from '../../../components/form/FormSelectInput'
import { auth, firestore } from '../../../../firebase';


const CreatePracticePlanForm = ({route, navigation}) => {

    const user = auth.currentUser;

    const [name, setName] = useState('');
    const [durationDays, setDurationDays] = useState('');
    const [code, setCode] = useState('');
    const [practicePlanTypeDocID, setPracticePlanTypeDocID] = useState('');

    const getSelectOptions = () => {
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

    const onCreatePressed = async () => {
        /*
        Function that action(s) the CREATE functionality.
            1. Performs validations
            2. Makes DB call to create the Practice Plan
            3. Redirects back to Parent page
        */
        if (validateEmptyValues() == false) {
            alert('Please fill all fields!');
        } else if (validateDurationIsNumber() == false) {
            alert('Durations (days) must be a number!');
        } 
        firestoreValidateCodeIsUnique();
    }

    const validateEmptyValues= () => {
        /*
        Checks if any of the inputs are empty (ie = '').
        */
        if (name.trim() == "") {
            return false;
        } else if (durationDays.trim() == "") {
            return false;
        } else if (code.trim() == "") {
            return false;
        }else if (practicePlanTypeDocID.toString().trim() == "") {
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

    const firestoreValidateCodeIsUnique = () => {
        firestore.collection('practice_plans')
        .where('code', '==', code.trim())
        .limit(1)
        .get()
        .then( querySnapshot => {
            const data = [];
            querySnapshot.forEach(documentSnapshot => {
                data.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            if (data.length > 0) {
                alert('Practice Plan Code already in use! Try another one.');
            } else {
                firestoreCreate();
            }
        });
    }

    const firestoreCreate = () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
        firestore.collection('practice_plans')
        .add({
            user_uid: user.uid,
            name: name,
            duration_days: Number(durationDays.trim()),
            code: code,
            practice_type_doc: practicePlanTypeDocID,
        }).then(()=>{
            navigation.navigate('Practice Plans');
        });
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
            value={code} 
            setValue={setCode} />
            <FormSelectInput 
            fieldName="Type"
            defaultOption={practicePlanTypeDocID} 
            setValue={setPracticePlanTypeDocID}
            options={getSelectOptions()} />
            <FormButton 
            text="Create"
            onPress={onCreatePressed} />
        </View>
    )
}

export default CreatePracticePlanForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});