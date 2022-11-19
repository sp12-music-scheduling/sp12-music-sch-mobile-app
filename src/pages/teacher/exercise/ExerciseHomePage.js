import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ExerciseRow from '../../../components/teacher/ExerciseRow';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { auth, firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const ExerciseHomePage = ({route, navigation}) => {

  const practice_plan = route.params.practice_plan;
  const [exercises, setExercises] = useState([]);
  const [exercisesEnrollment, setExercisesEnrollment] = useState([]);

  const [isLoadingPart1, setIsLoadingPart1] = useState(true);
  const [isLoadingPart2, setIsLoadingPart2] = useState(true);
 
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
    firestoreGetExercises();
    firestoreGetExerciseEnrollment();
  }, []);

  const firestoreGetExercises = () => {
    firestore.collection('exercises')
    .where('practice_plan_doc', '==', practice_plan.key)
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        sortArrayOfDictByName(data);
        setExercises(data);
        setIsLoadingPart1(false);
    });
  }

  const sortArrayOfDictByName = (data) => {
    /* Auxillary Function to Sort a List of Dict */
    data.sort(function(a,b){
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0
    }); 
  }

  const firestoreGetExerciseEnrollment = () => {
    setIsLoadingPart2(false);
    firestore.collection('exercise_enrollments')
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setExercisesEnrollment(data);
        setIsLoadingPart2(false);
    });
  }

  const navigateToCreate = () => {
    /*
    Function to navigate to the CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Create Exercise', {
      'practice_plan': practice_plan,
    });
  }

  const navigateToUpdateOrDelete = (item) => {
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
    return () =>  navigation.push('Exercise Enrollment', {
      'practice_plan': practice_plan,
      "exercise": item,
    });
  }

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
    exercisesEnrollment.forEach(ee => {
      if (ee.exercise_doc == item.key){
        count++;
      } 
    })
    return count;
  }

  if (isLoadingPart1 || isLoadingPart2){
    return (
    <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
    </View>
    );
  } else {
    return (
        <View style={styles.container}>
          <View style={styles.sectionItems}>
            <FlatList
            data={getExerciseList()}
            renderItem={({item}) =>
                <TouchableOpacity 
                onLongPress={navigateToUpdateOrDelete(item)}
                onPress={navigateToRowSelect(item)}  >
                    <ExerciseRow 
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
              onPress={navigateToCreate()} />
          </View>
        </View>
    )
  }
};

export default ExerciseHomePage;

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
