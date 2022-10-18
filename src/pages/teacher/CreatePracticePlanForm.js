import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../components/form/FormTextInput'
import FormButton from '../../components/form/FormButton'
import FormSelectInput from '../../components/form/FormSelectInput'


const CreatePracticePlanForm = ({navigation}) => {
    
    const [practicePlanName, setPracticePlanName] = useState('');
    const [practicePlanDurationDays, setPracticePlanDurationDays] = useState('');
    const [practicePlanCode, setPracticePlanCode] = useState('');
    const [practicePlanType, setPracticePlanType] = useState(''); // This will be the ID

    const onCreatePressed = () => {
        // Validate Input
        if (inputValidation() == false) {
            alert('Please fille required fields!');
            return;
        }
        // Create Practice Plan
        createPracticePlan();
        // Return to Previous Page
        navigation.navigate('Practice Plans');
    }

    const inputValidation= () => {
        // Inpiut Validation Function
        //  1. Validates that field(s) are not empty
        //  2. [FUTURE] Validate that PracticePlanCode is UNIQUE!
        if (practicePlanName.trim() == "") {
            return false;
        } else if (practicePlanDurationDays.trim() == "") {
            return false;
        } else if (practicePlanCode.trim() == "") {
            return false;
        }else if (practicePlanType.trim() == "") {
            return false;
        }
        return true;
    }

    const createPracticePlan = () => {
        // DB INSERT
    }

    const getPracticePlanTypes = () => {
        // Temporarily return STATIC DATA for testing
        return [
            {key:'1',value:'Etude'},
            {key:'2',value:'Solo'},
            {key:'3',value:'Fundamental: Fingers'},
            {key:'4',value:'Fundamental: Flow'},
            {key:'5',value:'Fundamental: Flex'},
            {key:'6',value:'Fundamental: Freedom'},
            {key:'7',value:'Fundamental: Front'},
          ]
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
            options={getPracticePlanTypes()} />
            <FormButton 
            text="Create"
            onPress={onCreatePressed} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});

export default CreatePracticePlanForm;