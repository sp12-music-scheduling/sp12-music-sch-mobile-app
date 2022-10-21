import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../components/form/FormTextInput'
import FormButton from '../../components/form/FormButton'
import FormSelectInput from '../../components/form/FormSelectInput'
import { getDBConnection, isPracticePlanCodeAvailable, insertPracticePlanRow} from "../../services/database";


const CreatePracticePlanForm = ({route, navigation}) => {

    const [practicePlanName, setPracticePlanName] = useState('');
    const [practicePlanDurationDays, setPracticePlanDurationDays] = useState('');
    const [practicePlanCode, setPracticePlanCode] = useState('');
    const [practicePlanType, setPracticePlanType] = useState(''); // This will be the Numerical ID as a String

    const getSelectOptions = () => {
        /*
        Return a list of Practice Plan Type(s) for the SelectList Dropdown.
        This option takes as input a list of dict such as [{'key': '', 'value': ''} ...]
        */
        const types = [];
        route.params.availablePracticePlanTypes.forEach(dict => types.push({
            'key': dict.id,
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
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        } else if (validationDurationIsNumber() == false) {
            alert('Durations (days) must be a number!');
        } else if (await validationPPCode() == false) {
            alert('Practice Plan Code already in use! Try another one.');
        } else {
            createPracticePlan();
            navigation.navigate('Practice Plans');
        }
    }

    const validationEmptyValues= () => {
        /*
        Checks if any of the inputs are empty (ie = '').
        */
        if (practicePlanName.trim() == "") {
            return false;
        } else if (practicePlanDurationDays.trim() == "") {
            return false;
        } else if (practicePlanCode.trim() == "") {
            return false;
        }else if (practicePlanType.toString().trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    const validationDurationIsNumber = () => {
        /*
        Checks that Durations (days) is numeric.
        */
        return !isNaN(Number(practicePlanDurationDays.trim()));
    }

    const validationPPCode = async () => {
        /*
        Checks that the Practice Plan Code is unique.
        */
        const db = await getDBConnection();
        return await isPracticePlanCodeAvailable(db, practicePlanCode.trim());
    }

    const createPracticePlan = async () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
        const practice_plan = {
            'name': practicePlanName,
            'duration_days': Number(practicePlanDurationDays.trim()),
            'code': practicePlanCode,
            'practice_type_id': practicePlanType
        };
        const db = await getDBConnection();
        await insertPracticePlanRow(db, practice_plan);
    }

    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Name"
            value={practicePlanName} 
            setValue={setPracticePlanName} />
            <FormTextInput 
            fieldName="Duration (days)"
            value={practicePlanDurationDays} 
            setValue={setPracticePlanDurationDays} />
            <FormTextInput 
            fieldName="Code (used by student to register)"
            value={practicePlanCode} 
            setValue={setPracticePlanCode} />
            <FormSelectInput 
            fieldName="Type"
            defaultOption={practicePlanType} 
            setValue={setPracticePlanType}
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