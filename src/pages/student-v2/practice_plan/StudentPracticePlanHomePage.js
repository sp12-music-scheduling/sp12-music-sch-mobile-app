import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticePlanRow from '../../../components/teacher/PracticePlanRow';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { getDBConnection, getPracticePlanEnrollmentByUser, getPracticePlans, getPracticeTypes } from "../../../services/database";
import { auth } from '../../../../firebase';

const device_height = Dimensions.get('window').height

const StudentPracticePlanHomePage = ({navigation}) => {

  const user = auth.currentUser;
  const [practicePlanEnrollment, setPracticePlanEnrollment] = useState([]);
  const [practicePlanLookup, setPracticePlanLookup] = useState({});
  const [practiceTypeLookup, setPracticeTypeLookup] = useState({});

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
    const ppe = await getPracticePlanEnrollmentByUser(db, user.uid);
    setPracticePlanEnrollment(ppe);
    // SET PRACTICE PLAN LOOKUP
    const pp = await getPracticePlans(db);
    const pp_lookup = {};
    pp.forEach(dict => {
      pp_lookup[dict.id] = dict;
    });
    setPracticePlanLookup(pp_lookup);
    // SET PRACTICE TYPE LOOKUP
    const pt = await getPracticeTypes(db);
    const pt_lookup = {};
    pt.forEach(dict => {
      pt_lookup[dict.id] = dict;
    });
    setPracticeTypeLookup(pt_lookup);
  }, []);
  
  const getPracticePlanEnrollmentList = () => {
    /*
    Returns a list of available Practice Plans.
    */
    const data = [];
    practicePlanEnrollment.forEach(dict => data.push({
      'id': dict.id,
      'practice_plan_id': dict.practice_plan_id,
      'user_uid': dict.user_uid,
      'practice_plan': practicePlanLookup[dict.practice_plan_id],
      'practice_plan_type': practiceTypeLookup[practicePlanLookup[dict.practice_plan_id].practice_type_id],
    }));
    return data;
  }

  const navigateToEnrollPracticePlan = () => {
    return () =>  navigation.push('Enroll');
  }

  const navigateToExercises = (item) => {

  }

  const navigateToUpdatePracticePlanEnrollment = (item) => {

  }

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
