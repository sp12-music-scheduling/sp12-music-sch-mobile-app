import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


import { firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const EnrollmentCalendarPage = ({route, navigation}) => {

    const practice_plan = route.params.practice_plan;
    const exercise_enrollment = route.params.exercise_enrollment;
    const exercise = route.params.exercise;

    const onDayPress =  (day) => {
        firestoreCreateEE(day);
    }

    const firestoreCreateEE =  (day) => {
        firestore.collection('exercise_enrollments')
        .add({
            exercise_doc: exercise.key,
            user_uid: exercise_enrollment.user_uid,
            start_date: day.dateString,
        }).then( () => {
            navigation.push('Exercise Enrollment', {
                'practice_plan': practice_plan,
                "exercise": exercise,
              });
        });
    
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionItems}>
                <CalendarList
                onDayPress={onDayPress}
                />
            </View>
        </View>
    )
};

export default EnrollmentCalendarPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    height: DEVICE_HEIGHT - 210
  },
  fab: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionItems: {
    marginTop: -30,    
  },
});
