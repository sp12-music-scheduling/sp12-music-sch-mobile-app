import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PracticePlan from '../../components/PracticePlan';
import FloatingPlusButton from '../../components/FloatingPlusButton';
import { getDBConnection, getPracticePlans, getPracticeTypes } from "../../services/database";


const device_height = Dimensions.get('window').height

const PracticePlanListPage = ({navigation}) => {
  const [practicePlanTypeLookup, setPracticePlanTypeLookup] = useState({});
  const [practicePlanTypeOptions, setPracticePlanTypeOptions] = useState([]);
  const [practicePlanPlans, setPracticePlanPlans] = useState([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const practice_plans = await getPracticePlans(db);
      setPracticePlanPlans(practice_plans);
      const practice_types = await getPracticeTypes(db);
      setPracticePlanTypeOptions(practice_types);
      const practice_type_lookup = {};
      practice_types.forEach(dict => {
        practice_type_lookup[dict["id"]] = dict["name"];
      });
      setPracticePlanTypeLookup(practice_type_lookup);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          loadDataCallback();
    });
    return unsubscribe;
  }, []);

  const getPracticePlanList = () => {
    const data = [];
    practicePlanPlans.forEach(dict => data.push({
          'name': dict.name,
          'duration_days': dict.duration_days,
          'code': dict.code,
          'practice_type_id': dict.practice_type_id,
          'type': practicePlanTypeLookup[dict.practice_type_id]
      }));
    return data;
  }

  const navigateToCreatePracticePlan = () => {
    return () =>  navigation.push('Create Practice Plan', {
      'practicePlanTypes': practicePlanTypeOptions,
    });
  }
  const navigateToUpdateOrDeletePracticePlan = (item) => {
    return () =>  navigation.push('Update or Delete Practice Plan',{
      "name": item.name,
      "code": item.code,
      "duration_days": item.duration_days,
      "practice_type": {
        "key": item.practice_type_id.toString(),
        "value": practicePlanTypeLookup[item.practice_type_id]
      },
      'practicePlanTypes': practicePlanTypeOptions,
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
