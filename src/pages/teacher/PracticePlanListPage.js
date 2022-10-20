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
import { getDBConnection, getPracticePlans } from "../../services/database";


const device_height = Dimensions.get('window').height

const PracticePlanListPage = ({navigation}) => {
  const [practicePlanPlans, setPracticePlanPlans] = useState([]);

  const loadDataCallback = useCallback(async () => {
    // TODO: Figure out how to get this to reload after a
    //       new row has been inserted.
    try {
      const db = await getDBConnection();
      const practice_plans = await getPracticePlans(db);
      setPracticePlanPlans(practice_plans);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const getPracticePlanList = () => {
    // TODO: Figure out how to go from TYPE ID to TYPE NAME
    const data = [];
    practicePlanPlans.forEach(dict => data.push({
          'name': dict["name"],
          'duration_days': dict['duration_days'],
          'type': 'Etude' // <-- FIX ME I AM MANUALLY SET!
      }));
    return data
  }

  const onFloatingPlusButtonPressed = () => {
    return () =>  navigation.navigate('Create Practice Plan');
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getPracticePlanList()}
          renderItem={({item}) =>
              <TouchableOpacity 
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
            onPress={onFloatingPlusButtonPressed()} />
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
