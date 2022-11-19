import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StudentExerciseRow from '../../../components/teacher/StudentExerciseRow';
import { auth, firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const StudentExerciseHomePage = ({route, navigation}) => {

  const user = auth.currentUser;

  const practice_plan_doc = route.params.practice_plan.practice_plan_doc;

  const [exercises, setExercises] = useState([]);
  const [exercisesEnrollmentLookup, setExercisesEnrollmentLookup] = useState({});

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
    .where('practice_plan_doc', '==', practice_plan_doc)
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setExercises(data);
        setIsLoadingPart1(false);
    });
  }


  const firestoreGetExerciseEnrollment = () => {
    firestore.collection('exercise_enrollments')
    .where('user_uid', '==', user.uid)
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        const lookup = {};
        data.forEach(dict => {
          lookup[dict.exercise_doc] = dict;
        });
        setExercisesEnrollmentLookup(lookup);
        setIsLoadingPart2(false);
    });
  }

  const navigateToRowSelect = (item) => {
    return () =>  navigation.push('Practice', {
      'exercise': item,
    });
  }

  const getExerciseList = () => {
    const data = [];
    exercises.forEach(exercise => {
      if (exercisesEnrollmentLookup[exercise.key] != undefined){
        data.push(exercise);
      }
    })
    return data;
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
                onPress={navigateToRowSelect(item)}  >
                    <StudentExerciseRow 
                    name={item.name} 
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
  }
};

export default StudentExerciseHomePage;

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
