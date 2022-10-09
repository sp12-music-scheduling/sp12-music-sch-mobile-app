import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PracticePlan from '../../components/PracticePlan';

// TODO: Resolve an issue where limiting the table list
//       causes the bottom 90 or so pixles to show as grey.

const device_height = Dimensions.get('window').height

const ProjectPlanHomePage = ({navigation}) => {
  return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Practice Plan</Text>
        <View style={styles.sectionItems}>
          <FlatList
            data={[
              // DEMO INPUT DATA FOR TESTING
              {name: 'Fund 1', type: 'Fundamentals', duraction_weeks: '6', },
              {name: 'Etude 1', type: 'Etudes', duraction_weeks: '2', },
              {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Soflo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Soflo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Solfo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'f 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Solo 1', type: 'Solos', duraction_weeks: '3', },
              {name: 'Sfolo 1', type: 'Solos', duraction_weeks: '3', },
            ]}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => alert('I work!')}>
                <PracticePlan name={item.name} type={item.type} duraction_weeks={item.duraction_weeks}/>
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
      </View>
  )
};

export default ProjectPlanHomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 20,
    height: device_height - 115

  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#754747',
  },
  sectionItems: {
    marginTop: 30,
    
  },
});

