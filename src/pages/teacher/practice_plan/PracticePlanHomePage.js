import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticePlanRow from '../../../components/teacher/PracticePlanRow';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
// import { getDBConnection, getPracticePlansByUser, getPracticeTypesByUser, insertDefaultPracticeTypes } from "../../../services/database";
import { auth, firestore } from '../../../../firebase';

const device_height = Dimensions.get('window').height

const PracticePlanHomePage = ({navigation}) => {

  const user = auth.currentUser;

  const [practicePlanTypeLookup, setPracticePlanTypeLookup] = useState({});
  const [practicePlanTypeOptions, setPracticePlanTypeOptions] = useState([]);
  const [practicePlanPlans, setPracticePlanPlans] = useState([]);
 
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
    // const db = await getDBConnection();
    // const practice_plans = await getPracticePlansByUser(db, user.uid);
    // setPracticePlanPlans(practice_plans);
    firestoreGetPracticePlans();
    firestoreGetPracticeTypes();
  }, []);

  const firestoreGetPracticeTypes = async () => {
    /*
    */
    let ptRef = firestore.collection('practice_types');
    let ptStore = await ptRef.orderBy('name', 'asc').get();
    const ptLocal = [];
    for(const doc of ptStore.docs){
      ptLocal.push({
        ...doc.data(),
        key: doc.id,
      });
    }
    setPracticePlanTypeOptions(ptLocal);
    const practice_type_lookup = {};
    practicePlanTypeOptions.forEach(dict => {
      practice_type_lookup[dict.key] = dict.name;
    });
    setPracticePlanTypeLookup(practice_type_lookup);
  }

  const firestoreGetPracticePlans = async () => {
    /*
    */
    let ppRef = firestore.collection('practice_plans');
    let ppStore = await ppRef.orderBy('name', 'asc').get();
    const ppLocal = [];
    for(const doc of ppStore.docs){
      ppLocal.push({
        ...doc.data(),
        key: doc.id,
      });
    }
    setPracticePlanPlans(ppLocal);
  }
  
  const getPracticePlanList = () => {
    /*
    Returns a list of available Practice Plans.
    */
    const data = [];
    practicePlanPlans.forEach(dict => data.push({
      'id': dict.id,
      'name': dict.name,
      'duration_days': dict.duration_days,
      'code': dict.code,
      'practice_type_id': dict.practice_type_id,
      'type': practicePlanTypeLookup[dict.practice_type_id],
      'user_uid': user.uid
    }));
    return data;
  }

  const navigateToCreatePracticePlan = () => {
    /*
    Function to navigate to the CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Create Practice Plan', {
      'availablePracticePlanTypes': practicePlanTypeOptions,
    });
  }

  const navigateToExercises = (item) => {
    /*
    Function to navigate to the CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Exercises', {
      'practice_plan': item,
    });
  }

  const searchPracticePlanTypes = (id) => {
    /*
    Function that returns a dict whose key mathces
    an entry on practicePlanTypeOptions.
    */
    const type = practicePlanTypeOptions.find((element, index) => {
       return element.id === id;
    });
    return type;
  }

  const generatePracticePlanTypeDict = (item) => {
    /*
    Function that returns a Practice Plan Type formatted
    to be used an the parameter 'defaultOption' by a SelectList.
    */
    const type = searchPracticePlanTypes(item.practice_type_id);
    return {
      "key": item.practice_type_id.toString(),
      "value": type.sub_type == "" ? type.name : type.name + ": " + type.sub_type
    }
  }

  const navigateToUpdateOrDeletePracticePlan = (item) => {
    /*
    Function to navigate to the UPDATE_OR_CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Update or Delete Practice Plan', {
      "id": item.id,
      "name": item.name,
      "code": item.code,
      "duration_days": item.duration_days,
      "practice_type": generatePracticePlanTypeDict(item),
      'availablePracticePlanTypes': practicePlanTypeOptions,
      "user_uid": item.user_uid
    });
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getPracticePlanList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onLongPress={navigateToUpdateOrDeletePracticePlan(item)}
              onPress={navigateToExercises(item)}  >
                  <PracticePlanRow 
                  name={item.name} 
                  type={item.type} 
                  duration_days={item.duration_days} />
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
        <View style={styles.fab}>
            <FloatingPlusButton 
            onPress={navigateToCreatePracticePlan()} />
        </View>
      </View>
  )
};

export default PracticePlanHomePage;

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
