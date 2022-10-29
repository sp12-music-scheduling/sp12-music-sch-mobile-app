import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StudentRow from '../../../components/teacher/StudentRow';
import { 
  getDBConnection,
  getExerciseEnrollmentByExercise,
  getUsers,
  insertExerciseEnrollment,
  deleteExerciseEnrollment,
 } from "../../../services/database";


const device_height = Dimensions.get('window').height

const ExerciseEnrollmentPage = ({route, navigation}) => {

  const exercise = route.params.exercise;
  const [exercise_enrollment, setExerciseEnrollment] = useState('');
  const [available_students, setAvailableStudents] = useState('');

 
  useEffect(() => {
    /*
    This feature is used to ensure that each time the page is loaded,
    the useCallback is envoked to pull the latest copy of the data.
    */
    const unsubscribe = navigation.addListener('focus', () => {
      loadDataCallback();
    });
    return unsubscribe;
  }, []);

  const loadDataCallback = useCallback(async () => {
    /*
    This function is used to populate athis exercises Student
    Enrollment.
    */
    const db = await getDBConnection();
    const ee = await getExerciseEnrollmentByExercise(db, exercise);
    console.log(ee);
    setExerciseEnrollment(ee);
    const students = await getUsers(db, exercise);
    setAvailableStudents(students);
  }, []);
  
  const getAvailableStudentList = () => {
    /*
    Returns a list of Students enrolled to an Exercise.
    */
    for (let index = 0; index < available_students.length; index++) {
      const is_enrolled = isStudentEnrolled(available_students[index]);
      available_students[index].is_enrolled = is_enrolled;
    }
    return available_students;
  }

  const isStudentEnrolled = (user) => {
    /*
    Checks if a student is enrolled in the exercise.
    */
   var is_enrolled = false;
    exercise_enrollment.forEach(ee => {
      if (ee.user_id == user.id){
        is_enrolled = true;
      }
    });
    return is_enrolled;
  }

  const getExerciceEnrollment = (user) => {
    /*
    Checks if a student is enrolled in the exercise.
    */
   var response = NaN;
    exercise_enrollment.forEach(ee => {
      if (ee.user_id == user.id){
        response = ee;
      }
    });
    return response;
  }

  const navigateToRowSelect = async (item) => {
    /*
    Implement toggle
    */
    const db = await getDBConnection();
    if (item.is_enrolled == false){
      // console.log('ENROLL!');
      const ee = {
      'exercise_id': exercise.id,
      'user_id': item.id,
      }
      await insertExerciseEnrollment(db, ee);
    } else {
      // console.log('UN-ENROLL!');
      const ee = getExerciceEnrollment(item);
      await deleteExerciseEnrollment(db, ee);
    }
    const ee = await getExerciseEnrollmentByExercise(db, exercise);
    // console.log(ee);
    setExerciseEnrollment(ee);
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getAvailableStudentList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onPress={() => navigateToRowSelect(item)}  >
                  <StudentRow 
                  name={item.name} 
                  email={item.email}
                  is_selected={item.is_enrolled}
                  />
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
      </View>
  )
};

export default ExerciseEnrollmentPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    height: device_height - 210
  },
  fab: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionItems: {
    marginTop: -30,    
  },
});
