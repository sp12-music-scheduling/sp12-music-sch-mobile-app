import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PracticePlan from '../../components/PracticePlan';


const ProjectPlanHomePage = ({navigation}) => {
  return (
      <View style={styles.container}>
         <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>Practice Plan</Text>
            <View style={styles.items}>
            <TouchableOpacity onPress={() => alert('I work!')}>
              <PracticePlan name='Test 1' type='Fundamentals' duraction_weeks='6'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('I work!')}>
              <PracticePlan name='Plan 2' type='Etudes' duraction_weeks='2'/>
            </TouchableOpacity>
            </View>
         </View>
      </View>
  )
};

export default ProjectPlanHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#754747',
  },
  items: {
    marginTop: 30,
  },
});

