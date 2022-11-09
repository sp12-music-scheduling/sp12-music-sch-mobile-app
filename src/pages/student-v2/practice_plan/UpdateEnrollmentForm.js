import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { firestore } from '../../../../firebase';


const UpdateEnrollmentForm = ({route, navigation}) => {

    const [code, setCode] = useState(route.params.practice_plan_enrollment.practice_plan.code);
    const [practicePlanName, setPracticePlanName] = useState(route.params.practice_plan_enrollment.practice_plan.name);
    
    const onLeavePlanPressed = async () => {
        /*
        */
        firestore.collection('practice_plan_enrollments')
        .doc(route.params.practice_plan_enrollment.key)
        .delete().then( ()=>{
            navigation.navigate('Practice Plans');
        });
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