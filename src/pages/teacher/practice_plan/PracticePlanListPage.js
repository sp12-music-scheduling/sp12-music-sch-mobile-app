import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticePlan from '../../../components/PracticePlan';
import FloatingPlusButton from '../../../../components/FloatingPlusButton';
import { getDBConnection, getPracticePlans, getPracticeTypes } from "../../../services/database";


const device_height = Dimensions.get('window').height

const PracticePlanListPage = ({navigation}) => {

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
    const db = await getDBConnection();
    const practice_plans = await getPracticePlans(db);
    setPracticePlanPlans(practice_plans);
    const practice_types = await getPracticeTypes(db);
    setPracticePlanTypeOptions(practice_types);
    const practice_type_lookup = {};
    practice_types.forEach(dict => {
      practice_type_lookup[dict.id] = dict.name;
    });
    setPracticePlanTypeLookup(practice_type_lookup);
  }, []);
  
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
      'type': practicePlanTypeLookup[dict.practice_type_id]
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
              onPress={()=>navigation.navigate('Exercises')}  >
                  <PracticePlan 
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

export default PracticePlanListPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    height: device_height - 115
  },
  fab: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionItems: {
    marginTop: -30,    
  },
});
