import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import FormTextInput from '../../components/form/FormTextInput'
import FormButton from '../../components/form/FormButton'
import FormSelectInput from '../../components/form/FormSelectInput'
import { getDBConnection, getPracticeTypes, insertPracticePlanRow, PracticePlan, PracticeType } from "../../services/database";


const CreatePracticePlanForm = ({navigation}) => {
    
    const [practicePlanTypeOptions, setPracticePlanTypeOptions] = useState([]);

    const [practicePlanName, setPracticePlanName] = useState('');
    const [practicePlanDurationDays, setPracticePlanDurationDays] = useState('');
    const [practicePlanCode, setPracticePlanCode] = useState('');
    const [practicePlanType, setPracticePlanType] = useState(''); // This will be the ID

    const loadDataCallback = useCallback(async () => {
        try {
          const db = await getDBConnection();
          const practice_types = await getPracticeTypes(db);
          setPracticePlanTypeOptions(practice_types);
        } catch (error) {
          console.error(error);
        }
      }, []);
      
      useEffect(() => {
        loadDataCallback();
      }, []);

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
        }else if (practicePlanType.toString().trim() == "") {
            return false;
        }
        return true;
    }

    const createPracticePlan = async () => {
       const practice_plan = {
        'name': practicePlanName,
        'duration_days': Number(practicePlanDurationDays),
        'code': practicePlanCode,
        'practice_type_id': practicePlanType
       };
       console.log('CREATE -> ');
       console.log(practice_plan);
       const db = await getDBConnection();
       await insertPracticePlanRow(db, practice_plan);
    }

    const getPracticePlanTypes = () => {
        const data = [];
        practicePlanTypeOptions.forEach(dict => data.push({
            'key': dict["id"],
            'value': dict['sub_type'] == "" ? dict["name"] : dict["name"] + ": " + dict["sub_type"]
        }));
        return data
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