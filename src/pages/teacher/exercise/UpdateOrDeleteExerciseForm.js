import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import FormTextInput from '../../../components/form/FormTextInput'
import FormButton from '../../../components/form/FormButton'
import FormSelectInput from '../../../components/form/FormSelectInput'
import { firestore } from '../../../../firebase';


const UpdateOrDeleteExerciseForm = ({route, navigation}) => {

    const practice_plan = route.params.practice_plan;
    const [name, setName] = useState(route.params.exercise.name);
    const [descr, setDescr] = useState(route.params.exercise.descr);
    const [video_link, setVideoLink] = useState(route.params.exercise.video_link);
    const [start_tempo, setStartTempo] = useState(route.params.exercise.start_tempo.toString());
    const [goal_tempo, setGoalTempo] = useState(route.params.exercise.goal_tempo.toString());
    const [tempo_progression, setTempoProgression] = useState(route.params.exercise.tempo_progression);

    const onDeletePressed =  () => {
        /*
        Function that implements the DELETE functionality.
        */
        firestore.collection('exercises')
        .doc(route.params.exercise.key)
        .delete().then( ()=>{
            navigation.navigate('Exercises', {practice_plan});
        });
    }
    
    const onUpdatePressed =  () => {
        /*
        Function that action(s) the UPDATE functionality.
            1. Performs validations
            2. Makes DB call to update the Exercise
            3. Redirects back to Parent page
        */
        if (validationEmptyValues() == false) {
            alert('Please fill all fields!');
        } else if (validationStartTempoIsNumber() == false) {
            alert('Start Tempo must be a number!');
        } else if (validationGoalTempoIsNumber() == false) {
            alert('Goal Tempo must be a number!');
        } else {
            firestoreUpdate();
        }
    }

    const firestoreUpdate = () => {
        /*
        */
        firestore.collection('exercises')
        .doc(route.params.exercise.key)
        .update({
            practice_plan_doc: practice_plan.key,
            name: name,
            descr: descr,
            video_link: video_link,
            start_tempo: Number(start_tempo.trim()),
            goal_tempo: Number(goal_tempo.trim()),
            tempo_progression: tempo_progression,
        }).then(()=>{
            navigation.navigate('Exercises', {practice_plan});
        });
    }

    const validationEmptyValues= () => {
        /*
        Checks if any of the inputs are empty (ie = '').
        */
        if (name.trim() == "") {
            return false;
        } else if (start_tempo.trim() == "") {
            return false;
        } else if (goal_tempo.trim() == "") {
            return false;
        }else if (tempo_progression.trim() == "") {
            return false;
        } else {
            return true;
        }
    }

    const validationStartTempoIsNumber = () => {
        /*
        Checks that Start Tempo is numeric.
        */
        return !isNaN(Number(start_tempo.trim()));
    }

    const validationGoalTempoIsNumber = () => {
        /*
        Checks that Goal Tempo is numeric.
        */
        return !isNaN(Number(goal_tempo.trim()));
    }

    const getTempoProgressionOptions = () => {
        /*
        Return a list of Tempo Progression(s)
        */
        const options = [
            {'key': 'linear','value': 'Linear'},
        ];
        return options;
    }

    return (
        <View style={styles.container}>
            {/* Field(s) */}
            <FormTextInput 
            fieldName="Practice Plan Name"
            value={route.params.practice_plan.name} 
            editable={false} />
            <FormTextInput 
            fieldName="Exercise Name"
            value={name} 
            setValue={setName} />
            <FormTextInput 
            fieldName="Description"
            value={descr} 
            setValue={setDescr} />
            <FormTextInput 
            fieldName="Video Link"
            value={video_link} 
            setValue={setVideoLink} />
             <FormTextInput 
            fieldName="Start Tempo"
            value={start_tempo} 
            setValue={setStartTempo} />
             <FormTextInput 
            fieldName="Goal Tempo"
            value={goal_tempo} 
            setValue={setGoalTempo} />
            <FormSelectInput 
            fieldName="Tempo Progression"
            defaultOption={{'key': 'linear','value': 'Linear'}} 
            setValue={setTempoProgression}
            options={getTempoProgressionOptions()} />
            {/* Action(s) */}
            <FormButton 
            text="Update"
            onPress={onUpdatePressed} />
            <FormButton 
            text="Delete"
            onPress={onDeletePressed} />
        </View>
    )
}

export default UpdateOrDeleteExerciseForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
});