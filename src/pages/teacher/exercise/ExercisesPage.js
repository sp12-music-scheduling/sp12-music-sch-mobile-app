import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Exercise from '../../../components/teacher/Exercise';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { getDBConnection, getExercisesByPracticePlan, getExerciseEnrollment } from "../../../services/database";


const device_height = Dimensions.get('window').height

const ExercisesPage = ({route, navigation}) => {

  const practice_plan = route.params.practice_plan;
  const [exercises, setExercises] = useState([]);
  const [exercises_entrollment, setExercisesEnrollment] = useState([]);

 
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
    This function is used to populate available Practice Plans
    and Practice Plan Types.
    */
    const db = await getDBConnection();
    const exercises = await getExercisesByPracticePlan(db, practice_plan);
    setExercises(exercises);
    const ee = await getExerciseEnrollment(db);
    setExercisesEnrollment(ee);
  }, []);
  
  const getExerciseList = () => {
    /*
    Returns a list of available Exercises by Practife Plan
    */   
    return exercises;
  }

  const getExerciseEnrollmentCount = (item) => {
    /*
    Returns a list of available Exercises by Practife Plan
    */   
    var count = 0;
    exercises_entrollment.forEach(ee => {
      if (ee.exercise_id == item.id){
        count++;
      } 
    })
    return count;
  }

  const navigateToCreateExercise = () => {
    /*
    Function to navigate to the CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Create Exercise', {
      'practice_plan': practice_plan,
    });
  }

  const navigateToUpdateOrDeleteExercise = (item) => {
    /*
    Function to navigate to the UPDATE_OR_CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Update or Delete Exercise', {
      'practice_plan': practice_plan,
      "exercise": item,
    });
  }

  const navigateToRowSelect = (item) => {
    /*
    Function to navigate to Student Enrollment of selected
    exercise.
    */
    return () =>  navigation.push('Exercise Entrollment', {
      'practice_plan': practice_plan,
      "exercise": item,
    });
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getExerciseList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onLongPress={navigateToUpdateOrDeleteExercise(item)}
              onPress={navigateToRowSelect(item)}  >
                  <Exercise 
                  name={item.name} 
                  user_count={getExerciseEnrollmentCount(item)}
                  />
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
        <View style={styles.fab}>
            <FloatingPlusButton 
            onPress={navigateToCreateExercise()} />
        </View>
      </View>
  )
};

export default ExercisesPage;

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
