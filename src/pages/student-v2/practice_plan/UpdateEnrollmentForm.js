import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { getDBConnection, deletePracticePlanEnrollment} from "../../../services/database";
import { auth } from '../../../../firebase';


const UpdateEnrollmentForm = ({route, navigation}) => {

    const user = auth.currentUser;
    const practicePlanEnrollment = {
        'id' : route.params.practice_plan_enrollment.id,
        'practice_plan_id': route.params.practice_plan_enrollment.practice_plan_id,
        'user_uid': route.params.practice_plan_enrollment.user_uid,
    };
    const [code, setCode] = useState(route.params.practice_plan_enrollment.practice_plan.code);
    const [practicePlanName, setPracticePlanName] = useState(route.params.practice_plan_enrollment.practice_plan.name);
    

    const onLeavePlanPressed = async () => {
        /*
        */
        const db = await getDBConnection();
        await deletePracticePlanEnrollment(db, practicePlanEnrollment);
        navigation.navigate('Practice Plans');
    }

    return (
        <View style={styles.container}>
            <FormTextInput 
            fieldName="Practice Plan Name"
            value={practicePlanName} 
            setValue={(setPracticePlanName)}
            editable={false} />
            <FormTextInput 
            fieldName="Code"
            value={code} 
            setValue={(setCode)}
            editable={false} />
            <FormButton 
            text="Leave Practice Plan"
            onPress={onLeavePlanPressed} />
        </View>
    )
}

export default UpdateEnrollmentForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});