import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StudentManagementEnrollmentRow from '../../../components/teacher/StudentManagementEnrollmentRow';
import { auth, firestore } from '../../../../firebase';


const device_height = Dimensions.get('window').height

const StudentManagementEnrollmentPage = ({route, navigation}) => {

  const student = route.params.student;
  const [available_exercises, setAvailableExercises] = useState([]);
  const [available_practice_plans, setAvailablePracticePlans] = useState([]);
  const [available_practice_types, setAvailablePracticeTypes] = useState([]);
  const [exercise_entrollment, setExerciseEnrollment] = useState([]);

 
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
    Pulls data required to load this page.
    */
    // const db = await getDBConnection();
    // const exercises = await getExercises(db);
    // setAvailableExercises(exercises);
    // const pp = await getPracticePlans(db);
    // setAvailablePracticePlans(pp);
    // const pt = await getPracticeTypes(db);
    // setAvailablePracticeTypes(pt);
    // const ee = await getExerciseEnrollmentByUser(db, user);
    // setExerciseEnrollment(ee);
  }, []);
  
  const getExerciseList = () => {
    /*
    Returns a list of exercises, and injects the following:
      - practice_plan_name
      - practice_plan_type
    */
   const exercises = [];
    // for (let index = 0; index < available_exercises.length; index++) {
    //   if (isStudentEnrolledInExercise(available_exercises[index]) == true){
    //     var practice_plan = getPracticePlanByExerciseId(available_exercises[index]);
    //     available_exercises[index].practice_plan_name = practice_plan.name;
    //     available_exercises[index].practice_plan_type = getPracticeTypeNameByPracticePlanId(practice_plan);
    //     exercises.push(available_exercises[index]);
    //   }
    // }
    return exercises;
  }

  const navigateToRowSelect = (item) => {
   /* RESERVED FOR POSSIBLE FUTURE USE */ 
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getExerciseList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onPress={navigateToRowSelect(item)}  >
                  <StudentManagementEnrollmentRow 
                  exercise_name={item.name}
                  practice_plan_name={item.practice_plan_name}
                  practice_plan_type={item.practice_plan_type}
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

export default StudentManagementEnrollmentPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    height: device_height - 210
  },
  sectionItems: {
    marginTop: -30,    
  },
});
