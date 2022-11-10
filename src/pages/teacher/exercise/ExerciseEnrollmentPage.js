import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ExerciseEntrollmentRow from '../../../components/teacher/ExerciseEntrollmentRow';
import { auth, firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const ExerciseEnrollmentPage = ({route, navigation}) => {

  const practice_plan = route.params.practice_plan;
  const exercise = route.params.exercise;
  const [exerciseEnrollment, setExerciseEnrollment] = useState([]);
  const [studentsEnrolledToPracticePlan, setStudentsEnrolledToPracticePlan] = useState([]);
  const [userSettingsLookup, setUserSettingsLookup] = useState({});

  const [isLoadingPart1, setIsLoadingPart1] = useState(true);
  const [isLoadingPart2, setIsLoadingPart2] = useState(true);
  const [isLoadingPart3, setIsLoadingPart3] = useState(true);

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
    // const db = await getDBConnection();
    // const ee = await getExerciseEnrollmentByExercise(db, exercise);
    // setExerciseEnrollment(ee);
    // const students = await getUsers(db);
    // setAvailableStudents(students);
    firestoreStudentsEnrolledToPlan();
    firestoreStudentsEnrolledToExercise();
    firestoreUserSettings();
  }, []);

  const firestoreStudentsEnrolledToPlan =  () => {
    firestore.collection('practice_plan_enrollment')
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
        setStudentsEnrolledToPracticePlan(data);
        setIsLoadingPart1(false);
    });
  }

  const firestoreStudentsEnrolledToExercise =  () => {
    setIsLoadingPart2(false);
    // firestore.collection('exercise_enrollment')
    // .where('practice_plan_doc', '==', practice_plan.key)
    // .get()
    // .then( querySnapshot => {
    //     const data = [];
    //     querySnapshot.forEach(documentSnapshot => {
    //         data.push({
    //             ...documentSnapshot.data(),
    //             key: documentSnapshot.id,
    //         });
    //     });
    //     setExerciseEnrollment(data);
    //     setIsLoadingPart2(false);
    // });
  }

  const firestoreUserSettings =  () => {
    firestore.collection('user_settings')
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
        const lookup = {};
        data.forEach(dict => {
          lookup[dict.key] = dict;
        });
        setUserSettingsLookup(data);
        setIsLoadingPart3(false);
    });
  }
  
  const navigateToRowSelect = async (item) => {
    /*
    Toggle Exercise Enrollment (Enroll/Unenroll)
    */
    // const db = await getDBConnection();
    // if (item.is_enrolled == false){
    //   const ee = {
    //     'exercise_id': exercise.id,
    //     'user_id': item.id,
    //   }
    //   await insertExerciseEnrollment(db, ee);
    // } else {
    //   const ee = getExerciceEnrollment(item);
    //   await deleteExerciseEnrollment(db, ee);
    // }
    // const ee = await getExerciseEnrollmentByExercise(db, exercise);
    // setExerciseEnrollment(ee);
  }

  const getStudentsEnrolledToPlan = () => {
    /*
    Returns a list of Students enrolled to an Exercise.
    */
    // for (let index = 0; index < availableStudents.length; index++) {
    //   const is_enrolled = isStudentEnrolled(availableStudents[index]);
    //   availableStudents[index].is_enrolled = is_enrolled;
    // }
    return [];
  }

  // const isStudentEnrolled = (user) => {
  //   /*
  //   Checks if a student is enrolled in the exercise.
  //   */
  //  var is_enrolled = false;
  //  exerciseEnrollment.forEach(ee => {
  //     if (ee.user_id == user.id){
  //       is_enrolled = true;
  //     }
  //   });
  //   return is_enrolled;
  // }

  // const getExerciceEnrollment = (user) => {
  //   /*
  //   Checks if a student is enrolled in the exercise.
  //   */
  //  var response = NaN;
  //  exerciseEnrollment.forEach(ee => {
  //     if (ee.user_uid == user.uid){
  //       response = ee;
  //     }
  //   });
  //   return response;
  // }
  
  if (isLoadingPart1 || isLoadingPart2 || isLoadingPart3){
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
          data={getStudentsEnrolledToPlan()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onPress={() => navigateToRowSelect(item)}  >
                  <ExerciseEntrollmentRow 
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
}
};

export default ExerciseEnrollmentPage;

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
