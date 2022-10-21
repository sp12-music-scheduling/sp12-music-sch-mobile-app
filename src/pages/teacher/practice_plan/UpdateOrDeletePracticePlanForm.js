import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import FormSelectInput from '../../../components/form/FormSelectInput'
import { getDBConnection, isPracticePlanCodeAvailable, deletePracticePlanRow, updatePracticePlanRow } from "../../../services/database";


const UpdateOrDeletePracticePlanForm = ({route, navigation}) => {

    const [practicePlanName, setPracticePlanName] = useState(route.params.name);
    const [practicePlanDurationDays, setPracticePlanDurationDays] = useState(route.params.duration_days.toString());
    const [practicePlanType, setPracticePlanType] = useState('');

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

    const onDeletePressed = async () => {
        /*
        Function that implements the DELETE functionality.
        */
        const practice_plan = {
            'id': route.params.id,
            'name': practicePlanName,
            'duration_days': Number(practicePlanDurationDays.trim()),
            'code': route.params.code,
            'practice_type_id': practicePlanType
        };
        const db = await getDBConnection();
        await deletePracticePlanRow(db, practice_plan);
        navigation.navigate('Practice Plans');
    }

    const onUpdatePressed = async () => {
        /*
        Function that action(s) the CREATE functionality.
            1. Performs validations
            2. Makes DB call to update the Practice Plan
            3. Redirects back to Parent page
        */
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        } else if (validationDurationIsNumber() == false) {
            alert('Durations (days) must be a number!');
        } else {
            updatePracticePlan();
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

    const updatePracticePlan = async () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
       const practice_plan = {
            'id': route.params.id,
            'name': practicePlanName,
            'duration_days': Number(practicePlanDurationDays.trim()),
            'code': route.params.code,
            'practice_type_id': practicePlanType
       };
       const db = await getDBConnection();
       await updatePracticePlanRow(db, practice_plan);
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
            value={practicePlanName} 
            setValue={setPracticePlanName} />
            <FormTextInput 
            fieldName="Duration (days)"
            value={practicePlanDurationDays} 
            setValue={setPracticePlanDurationDays} />
            <FormTextInput 
            fieldName="Code (used by student to register)"
            value={route.params.code} 
            setValue={(setPracticePlanCode)}
            editable={false} />
            <FormSelectInput 
            fieldName="Type"
            defaultOption={route.params.practice_type} 
            setValue={setPracticePlanType}
            options={getSelectOptions()} />
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