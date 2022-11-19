import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StudentManagementEnrollmentRow from '../../../components/teacher/StudentManagementEnrollmentRow';
import { firestore } from '../../../../firebase';


const device_height = Dimensions.get('window').height

const StudentManagementEnrollmentPage = ({route, navigation}) => {

  const student = route.params.student;
  
  const [exerciseLookup, setExerciseLookup] = useState({});
  const [practiceTypeLookup, setPracticeTypeLookup] = useState({});
  const [practicePlanLookup, setPracticePlanLookup] = useState({});
  const [exerciseEnrollment, setExerciseEnrollment] = useState([]);

  const [isLoadingPart1, setIsLoadingPart1] = useState(true);
  const [isLoadingPart2, setIsLoadingPart2] = useState(true);
  const [isLoadingPart3, setIsLoadingPart3] = useState(true);
  const [isLoadingPart4, setIsLoadingPart4] = useState(true);

 
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
    firestoreGetExerciseEnrollment();
    firestoreGetExercises();
    firestoreGetPracticePlans();
    firestoreGetPracticeTypes();
  }, []);
  
  const firestoreGetExerciseEnrollment =  () => {
    firestore.collection('exercise_enrollments')
    .where('user_uid', '==', student.uid)
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setExerciseEnrollment(data);
        setIsLoadingPart1(false);
    });
  }

  const firestoreGetExercises =  () => {
    firestore.collection('exercises')
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
        setExerciseLookup(lookup);
        setIsLoadingPart2(false);
    });
  }

  const firestoreGetPracticeTypes =  () => {
    firestore.collection('practice_types')
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
        setPracticeTypeLookup(lookup);
        setIsLoadingPart3(false);
    });
  }

  const firestoreGetPracticePlans =  () => {
    firestore.collection('practice_plans')
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
        setPracticePlanLookup(lookup);
        setIsLoadingPart4(false);
    });
  }

  const getExerciseList = () => {
   const data = [];
   exerciseEnrollment.forEach(ee => {
    const exercise = exerciseLookup[ee.exercise_doc];
    const practice_plan = practicePlanLookup[exercise.practice_plan_doc]
    const practice_type = practiceTypeLookup[practice_plan.practice_type_doc]
    data.push({
      'ee': ee,
      'exercise': exercise,
      'practice_plan': practice_plan,
      'practice_type': practice_type,
    })
  })
    return data;
  }

  const navigateToRowSelect = (item) => {
   /* RESERVED FOR POSSIBLE FUTURE USE */ 
  }

  if (isLoadingPart1 || isLoadingPart2 || isLoadingPart3 || isLoadingPart4){
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
                    <StudentManagementEnrollmentRow 
                    exercise_name={item.exercise.name}
                    practice_plan_name={item.practice_plan.name}
                    practice_plan_type={item.practice_type.name}
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
