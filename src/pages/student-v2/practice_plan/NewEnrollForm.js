import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import { auth, firestore } from '../../../../firebase';


const NewEnrollForm = ({navigation}) => {

    const user = auth.currentUser;
    const [code, setCode] = useState('');

    const onCreatePressed = () => {
        firebaseValidateCode();
    }
    
    const firebaseValidateCode = () => {
        /*
        */
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
            if (data.length == 0) {
                alert('Practice Plan Code does not exist!');
            } else {
                firestoreCheckUserEnrollment(data[0].key);
            }
        });
    }
    
    const firestoreCheckUserEnrollment = (practicePlanDocID) => {
        /*
        */
        firestore.collection('practice_plan_enrollments')
        .where('user_uid', '==', user.uid)
        .where('practice_plan_doc', '==', practicePlanDocID)
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
                alert('Student already enrolled in Practice Plan!');
            } else {
                firestoreCreateEnrollment(practicePlanDocID);
            }
        });
    }

    const firestoreCreateEnrollment = (practicePlanDocID) => {
        /*
        */
        firestore.collection('practice_plan_enrollments')
        .add({
            user_uid: user.uid,
            practice_plan_doc: practicePlanDocID,
        }).then( () => {
            navigation.navigate('Practice Plans');
        });
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