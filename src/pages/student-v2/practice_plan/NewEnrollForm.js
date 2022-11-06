import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { getDBConnection, getPracticePlanByCode, insertPracticePlanEnrollment} from "../../../services/database";
import { auth } from '../../../../firebase';


const NewEnrollForm = ({route, navigation}) => {

    const user = auth.currentUser;

    const [code, setCode] = useState('');

    const onCreatePressed = async () => {
        /*
        Function that action(s) the CREATE functionality.
            1. Performs validations
            2. Makes DB call to Enroll User to Practice Plan
            3. Redirects back to Parent page
        */
        if (await validationPPCodeExists() == false) {
            alert('Practice Plan Code does not exist!');
        } else {
            await enrollUserToPracticePlan();
            navigation.navigate('Practice Plans');
        }
    }

    const validationPPCodeExists = async () => {
        /*
        Checks that the Practice Plan Code is exists.
        */
        const db = await getDBConnection();
        const pp = await getPracticePlanByCode(db, code.trim());
        console.log('validationPPCodeExists >> pp', pp)
        if (pp.length == 0){
            return false;
        } else {
            return true;
        }
    }

    const enrollUserToPracticePlan = async () => {
        /*
        Calls a database function to create a new Practice Plan.
        */
        const db = await getDBConnection();
        const pp = await getPracticePlanByCode(db, code.trim());
        const ppe = {
            'practice_plan_id': pp[0].id,
            'user_uid': user.uid
        };
        await insertPracticePlanEnrollment(db, ppe);
    }

    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Code"
            value={code} 
            setValue={setCode} />
            <FormButton 
            text="Enroll"
            onPress={onCreatePressed} />
        </View>
    )
}

export default NewEnrollForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});