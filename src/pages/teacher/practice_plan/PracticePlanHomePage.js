import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticePlanRow from '../../../components/teacher/PracticePlanRow';
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { auth, firestore } from '../../../../firebase';

const device_height = Dimensions.get('window').height

const PracticePlanHomePage = ({navigation}) => {

  const user = auth.currentUser;

  const [practicePlanTypeLookup, setPracticePlanTypeLookup] = useState({});
  const [practicePlanTypeOptions, setPracticePlanTypeOptions] = useState([]);
  const [practicePlanPlans, setPracticePlanPlans] = useState([]);

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

  const loadDataCallback = useCallback( () => {
    /*
    This function is used to populate available Practice Plans
    and Practice Plan Types.
    */
    firestoreGetPracticePlans();
    firestoreGetPracticeTypes();
  }, []);

  const firestoreGetPracticeTypes = () => {
    firestore.collection('practice_types')
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
        sortArrayOfDictByName(data);
        setPracticePlanTypeOptions(data)
        const lookup = {};
        data.forEach(dict => {
          lookup[dict.key] = dict.name;
        });
        setPracticePlanTypeLookup(lookup);
        setIsLoadingPart2(false);
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

  const firestoreGetPracticePlans =  () => {
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
        sortArrayOfDictByName(data);
        setPracticePlanPlans(data);
        setIsLoadingPart1(false);
    });
  }
  
  const getPracticePlanList = () => {
    /*
    Returns a list of available Practice Plans.
    */
    const data = [];
    practicePlanPlans.forEach(dict => data.push({
      'key': dict.key,
      'name': dict.name,
      'duration_days': dict.duration_days,
      'code': dict.code,
      'practice_type_doc': dict.practice_type_doc,
      'type': practicePlanTypeLookup[dict.practice_type_doc],
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

  const searchPracticePlanTypes = (key) => {
    /*
    Function that returns a dict whose key mathces
    an entry on practicePlanTypeOptions.
    */
    const type = practicePlanTypeOptions.find((element, index) => {
       return element.key === key;
    });
    return type;
  }

  const generatePracticePlanTypeDict = (item) => {
    /*
    Function that returns a Practice Plan Type formatted
    to be used an the parameter 'defaultOption' by a SelectList.
    */
    const type = searchPracticePlanTypes(item.practice_type_doc);
    return {
      "key": type.key,
      "value": type.sub_type == "" ? type.name : type.name + ": " + type.sub_type
    }
  }

  const navigateToUpdateOrDeletePracticePlan = (item) => {
    /*
    Function to navigate to the UPDATE_OR_CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Update or Delete Practice Plan', {
      "practice_plan": {
        "key": item.key,
        "name": item.name,
        "code": item.code,
        "duration_days": item.duration_days,
        "user_uid": item.user_uid
      },
      "practice_type": generatePracticePlanTypeDict(item),
      'availablePracticePlanTypes': practicePlanTypeOptions,
    });
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
  }
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
