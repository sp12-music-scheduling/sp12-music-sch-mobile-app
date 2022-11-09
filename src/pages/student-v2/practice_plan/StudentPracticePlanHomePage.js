import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

import PracticePlanRow from '../../../components/teacher/PracticePlanRow';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { auth, firestore } from '../../../../firebase';

const device_height = Dimensions.get('window').height

const StudentPracticePlanHomePage = ({navigation}) => {

  const user = auth.currentUser;
  const [practicePlanEnrollments, setPracticePlanEnrollments] = useState([]);
  const [practicePlanLookup, setPracticePlanLookup] = useState({});
  const [practiceTypeLookup, setPracticeTypeLookup] = useState({});
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
    This function is used to populate available Practice Plans
    and Practice Plan Types.
    */
    firestoreGetPracticePlanEnrollments();
    firestoreGetPracticePlans();
    firestoreGetPracticeTypes();
  }, []);

  const firestoreGetPracticePlanEnrollments = () => {
    firestore.collection('practice_plan_enrollments')
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
        setPracticePlanEnrollments(data);
        setIsLoadingPart1(false);
    });
  }

  const firestoreGetPracticePlans = async () => {
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
        setIsLoadingPart2(false);
    });
  }

  const firestoreGetPracticeTypes = async () => {
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

  const getPracticePlanEnrollmentList = () => {
    /*
    Returns a list of available Practice Plans.
    */
    const data = [];
    practicePlanEnrollments.forEach(dict => 
      data.push({
      'key': dict.key,
      'practice_plan_doc': dict.practice_plan_doc,
      'user_uid': dict.user_uid,
      'practice_plan': practicePlanLookup[dict.practice_plan_doc],
      'practice_plan_type': practiceTypeLookup[practicePlanLookup[dict.practice_plan_doc].practice_type_doc],
    }));
    return data;
  }

  const navigateToEnrollPracticePlan = () => {
    return () =>  navigation.push('Enroll');
  }

  const navigateToExercises = (item) => {

  }

  const navigateToUpdatePracticePlanEnrollment = (item) => {
    return () =>  navigation.push('Update Enrollment', {
      'practice_plan_enrollment': item,
    });
  }


  if (isLoadingPart1 || isLoadingPart2 || isLoadingPart3){
    return (
    <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
    </View>
    );
  } else{
  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getPracticePlanEnrollmentList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onLongPress={navigateToUpdatePracticePlanEnrollment(item)}
              onPress={navigateToExercises(item)}  >
                  <PracticePlanRow 
                  name={item.practice_plan.name} 
                  type={item.practice_plan_type.name} 
                  duration_days={item.practice_plan.duration_days} />
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
        <View style={styles.fab}>
            <FloatingPlusButton 
            onPress={navigateToEnrollPracticePlan()} />
        </View>
      </View>
  )
};
}

export default StudentPracticePlanHomePage;

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
