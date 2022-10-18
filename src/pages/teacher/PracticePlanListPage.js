import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PracticePlan from '../../components/PracticePlan';
import FloatingPlusButton from '../../components/FloatingPlusButton';

const device_height = Dimensions.get('window').height

const PracticePlanListPage = ({navigation}) => {

  const getPracticePlanList = () => {
    // Temporarily return STATIC DATA for testing
    return [
        {name: 'Fund 1', type: 'Fundamentals', duraction_weeks: '6', },
        {name: 'Etude 1', type: 'Etudes', duraction_weeks: '2', },
        {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Soflo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Soflo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'f 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
        {name: 'Sfolo 1', type: 'Solos', duraction_weeks: '3', },
      ]
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
                duraction_weeks={item.duraction_weeks} />
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



