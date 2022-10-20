// import React, { useState, useCallback, useEffect } from 'react'
// import { View, StyleSheet } from 'react-native'
// import FormTextInput from '../../components/form/FormTextInput'
// import FormButton from '../../components/form/FormButton'
// import FormSelectInput from '../../components/form/FormSelectInput'
// import { getDBConnection, getPracticeTypes, insertPracticePlanRow, PracticePlan, PracticeType } from "../../services/database";


// const UpdateOrDeletePracticePlanForm = ({route, navigation}) => {
    
//     const [practicePlanTypeOptions, setPracticePlanTypeOptions] = useState([]);

//     const [practicePlanName, setPracticePlanName] = useState(route.params.name);
//     const [practicePlanDurationDays, setPracticePlanDurationDays] = useState(route.params.duration_days.toString());
//     const [practicePlanCode, setPracticePlanCode] = useState(route.params.code);
//     const [practicePlanType, setPracticePlanType] = useState(route.params.practice_type); // This will be the ID

//     useEffect(() => {
//         console.log(practicePlanName, practicePlanDurationDays, practicePlanCode, practicePlanType);
//         loadDataCallback();
//       }, []);
    
//       const loadDataCallback = useCallback(async () => {
//           const db = await getDBConnection();
//           const practice_types = await getPracticeTypes(db);
//           setPracticePlanTypeOptions(practice_types);
//       }, []);

//     const onCreatePressed = () => {
//         // Validate Input
//         if (inputValidation() == false) {
//             alert('Please fille required fields!');
//             return;
//         }
//         // Create Practice Plan
//         createPracticePlan();
//         // Return to Previous Page
//         navigation.navigate('Practice Plans');
//     }

//     const inputValidation= () => {
//         // Inpiut Validation Function
//         //  1. Validates that field(s) are not empty
//         //  2. [FUTURE] Validate that PracticePlanCode is UNIQUE!
//         if (practicePlanName.trim() == "") {
//             return false;
//         } else if (practicePlanDurationDays.trim() == "") {
//             return false;
//         } else if (practicePlanCode.trim() == "") {
//             return false;
//         }else if (practicePlanType.toString().trim() == "") {
//             return false;
//         }
//         return true;
//     }

//     const createPracticePlan = async () => {
//     //    const practice_plan = {
//     //     'name': practicePlanName,
//     //     'duration_days': Number(practicePlanDurationDays),
//     //     'code': practicePlanCode,
//     //     'practice_type_id': practicePlanType
//     //    };
//     //    const db = await getDBConnection();
//     //    await insertPracticePlanRow(db, practice_plan);
//     }

//     const getPracticePlanTypes = () => {
//         const data = [];
//         practicePlanTypeOptions.forEach(dict => data.push({
//             'key': dict["id"],
//             'value': dict['sub_type'] == "" ? dict["name"] : dict["name"] + ": " + dict["sub_type"]
//         }));
//         return data
//     }

//     return (
//         <View style={styles.container}>
//             <FormTextInput 
//             fieldName="Name"
//             value={practicePlanName} 
//             setValue={setPracticePlanName} />
//             <FormTextInput 
//             fieldName="Duration (days)"
//             value={practicePlanDurationDays} 
//             setValue={setPracticePlanDurationDays} />
//             <FormTextInput 
//             fieldName="Code (used by student to register)"
//             value={practicePlanCode} 
//             setValue={setPracticePlanCode} />
//             <FormSelectInput 
//             fieldName="Type"
//             defaultOption={practicePlanType} 
//             setValue={setPracticePlanType}
//             options={getPracticePlanTypes()} />
//             <FormButton 
//             text="Update"
//             onPress={onCreatePressed} />
//             <FormButton 
//             text="Delete"
//             onPress={onCreatePressed} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         padding: 20,
//     },
// });

// export default UpdateOrDeletePracticePlanForm;

import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../components/form/FormTextInput'
import FormButton from '../../components/form/FormButton'
import FormSelectInput from '../../components/form/FormSelectInput'
import { getDBConnection, isPracticePlanCodeAvailable, insertPracticePlanRow} from "../../services/database";


const UpdateOrDeletePracticePlanForm = ({route, navigation}) => {

    const [practicePlanName, setPracticePlanName] = useState(route.params.name);
    const [practicePlanDurationDays, setPracticePlanDurationDays] = useState(route.params.duration_days.toString());
    const [practicePlanCode, setPracticePlanCode] = useState(route.params.code);
    const [practicePlanType, setPracticePlanType] = useState(route.params.practice_type); // This is not working!!!!

    const getSelectOptions = () => {
        /*
        Return a list of Practice Plan Type(s) for the SelectList Dropdown.
        This option takes as input a list of dict such as [{'key': '', 'value': ''} ...]
        */
        const types = [];
        route.params.practicePlanTypes.forEach(dict => types.push({
            'key': dict.id,
            'value': dict.sub_type == "" ? dict.name : dict.name + ": " + dict.sub_type
        }));
        return types;
    }

    const onUpdatePressed = async () => {
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
            updatePracticePlan();
            navigation.navigate('Practice Plans');
        }
    }

    const onDeletePressed = async () => {
        // TODO: Continue implementation.
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

    const updatePracticePlan = async () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
       // TODO: Continue implementation.
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