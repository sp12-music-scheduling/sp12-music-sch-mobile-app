import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ExerciseEntrollmentRow from '../../../components/teacher/ExerciseEntrollmentRow';
import { firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const ExerciseEnrollmentPage = ({route, navigation}) => {

  const practice_plan = route.params.practice_plan;
  const exercise = route.params.exercise;
  const [exerciseEnrollment, setExerciseEnrollment] = useState({});
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
    firestoreStudentsEnrolledToPlan();
    firestoreStudentsEnrolledToExercise();
    firestoreUserSettings();
  }, []);

  const firestoreStudentsEnrolledToPlan =  () => {
    firestore.collection('practice_plan_enrollments')
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
        const lookup = {};
        data.forEach(dict => {
          lookup[dict.user_uid] = dict;
        });
        setExerciseEnrollment(lookup);
        setIsLoadingPart2(false);
    });
  }

  const firestoreUserSettings =  () => {
    firestore.collection('user_settings')
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
          lookup[dict.uid] = dict;
        });
        setUserSettingsLookup(lookup);
        setIsLoadingPart3(false);
    });
  }
  
  const navigateToRowSelect = async (item) => {
    /*
    Toggle Exercise Enrollment (Enroll/Unenroll)
    */
    if (item.is_enrolled == false){
      navigation.navigate('Select Start Date', {
        'exercise_enrollment': item,
        'exercise': exercise,
        'practice_plan': practice_plan,
      });
        setIsLoadingPart2(true);
        firestoreStudentsEnrolledToExercise();
    } else {
       const ee = exerciseEnrollment[item.user_uid];
      firestore.collection('exercise_enrollments')
        .doc(ee.key)
        .delete().then( ()=>{
          setIsLoadingPart2(true);
          firestoreStudentsEnrolledToExercise();
        });
    }
  }

  const getStudentsEnrolledToPlan = () => {
    /*
    Returns a list of Students enrolled to an Exercise.
    */
    for (let index = 0; index < studentsEnrolledToPracticePlan.length; index++) {
      let student_settings = userSettingsLookup[studentsEnrolledToPracticePlan[index].user_uid]
      studentsEnrolledToPracticePlan[index].name = student_settings.display_name;
      studentsEnrolledToPracticePlan[index].email = student_settings.email;
      studentsEnrolledToPracticePlan[index].is_enrolled = exerciseEnrollment[student_settings.uid] != undefined && exerciseEnrollment[student_settings.uid].exercise_doc == exercise.key;
      studentsEnrolledToPracticePlan[index].start_date = studentsEnrolledToPracticePlan[index].is_enrolled == true ? exerciseEnrollment[student_settings.uid].start_date : ''
    }
    return studentsEnrolledToPracticePlan;
  }
  
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
                  startDate={item.start_date}
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
