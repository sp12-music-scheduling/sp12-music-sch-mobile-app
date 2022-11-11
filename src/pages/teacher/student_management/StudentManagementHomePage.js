import React, {useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';

import StudentRow from '../../../components/teacher/ExerciseEntrollmentRow';
import { auth, firestore } from '../../../../firebase';


const VIEWS = [
  { label: 'Student Progress', value: 0 },
  { label: 'Enrollment', value: 1 },
];

const DEVICE_HEIGHT = Dimensions.get('window').height

const StudentManagementHomePage = ({navigation}) => {

  const user = auth.currentUser;


  const [currentSwitchSelection, setCurrentSwitchSelection] = useState(1);

  const [userSettingLookup, setUserSettingLookup] = useState({});
  const [practicePlans, setPracticePlans] = useState({});
  const [practicePlanEnrollment, setPracticeEnrollmentPlan] = useState([]);


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
    Pulls data required to load this page.
    */
    firestoreGetPracticePlans();
    firestoreGetPracticePlanEnrollments();
    firestoreUserSettings();
  }, []);

  const firestoreGetPracticePlans = () => {
    firestore.collection('practice_plans')
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
        setPracticePlans(data)
        setIsLoadingPart1(false);
    });
  }

  const firestoreGetPracticePlanEnrollments = () => {
    firestore.collection('practice_plan_enrollments')
    .get()
    .then( querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        // const lookup = {};
        // data.forEach(dict => {
        //   lookup[dict.practice_plan_doc] = dict;
        // });
        setPracticeEnrollmentPlan(data)
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
        setUserSettingLookup(lookup);
        setIsLoadingPart3(false);
    });
  }

  const onSwitchChange = (value) => {
    /*
    We are setting the value to the index of the Array.
    That way we can then set it correctly.
    */
   setCurrentSwitchSelection(value);
  }

  const getStudentList = () => {
    const data = [];
    practicePlans.forEach(pp => {
      practicePlanEnrollment.forEach(ppe => {
        if (pp.key == ppe.practice_plan_doc){
          const user = userSettingLookup[ppe.user_uid];
          data.push(user);
        }
      });
    });
  
    return data;
  }

  const getEnrollmentViews = () => {
    /*
    VIEW when the Student Enrollment Toggle is Selected.
    */
   return <View style={styles.enrollment_container}>
            <View style={styles.enrollment_section_items}>
              <FlatList
              data={getStudentList()}
              renderItem={({item}) =>
                  <TouchableOpacity 
                  onPress={navigateToEnrollmentRowSelect(item)}  >
                      <StudentRow 
                      name={item.display_name} 
                      email={item.email}
                      />
                  </TouchableOpacity> 
                }
                maintainVisibleContentPosition={{
                  minIndexForVisible: 0,
                }}
              />
            </View>
          </View>
  }

  const navigateToEnrollmentRowSelect = (item) => {
    /*
    Navigates to the Enrollement exercises by the selected Student User.
    */
    return () =>  navigation.push('Student Management Enrollment', {
      'student': item,
    });
  }

  const getStudentProgresstViews = () => {
    /*
    VIEW when the Student Progress Toggle is Selected.
    < PLACEHOLDER >
    */
    return <View style={styles.student_progress_container}>
      <Text>Coming soon!</Text>
    </View>
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
          {/* Switch */}
            <SwitchSelector 
            options={VIEWS} 
            initial={currentSwitchSelection} 
            selectedColor={'white'}
            buttonColor={'#C3AAAA'}
            backgroundColor={'white'}
            textColor={'#2C0B0B'}
            onPress={value => onSwitchChange(value)} />
            {/* Switch Content Here */}
            {currentSwitchSelection == 0 ? getStudentProgresstViews(): getEnrollmentViews()}
        </View>
    )
  }
};

export default StudentManagementHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  student_progress_container: {
    paddingTop: 200,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrollment_section_items: {
    marginTop: -30,    
  },
  enrollment_container: {
    backgroundColor: 'white',
    paddingTop: 80,
    height: DEVICE_HEIGHT - 210
  },
});
