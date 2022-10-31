import React, {useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';

import StudentRow from '../../../components/teacher/StudentRow';
import { 
  getDBConnection,
  getUsers,
 } from "../../../services/database";

const VIEWS = [
  { label: 'Student Progress', value: 0 },
  { label: 'Enrollment', value: 1 },
];

const DEVICE_HEIGHT = Dimensions.get('window').height


const StudentManagementPage = ({navigation}) => {

  const [currentSwitchSelection, setCurrentSwitchSelection] = useState(1);
  const [available_students, setAvailableStudents] = useState([]);

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
    This function is used to populate athis exercises Student
    Enrollment.
    */
    const db = await getDBConnection();
    const students = await getUsers(db);
    setAvailableStudents(students);
  }, []);

  const onSwitchChange = (value) => {
    /*
    We are setting the value to the index of the Array.
    That way we can then set it correctly.
    */
   setCurrentSwitchSelection(value);
  }

  const getEnrollmentViews = () => {
    /*
    */
   return <View style={styles.enrollment_container}>
            <View style={styles.enrollment_section_items}>
              <FlatList
              data={available_students}
              renderItem={({item}) =>
                  <TouchableOpacity 
                  onPress={navigateToEnrollmentRowSelect(item)}  >
                      <StudentRow 
                      name={item.name} 
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
    
    */
    return () =>  navigation.push('Student Management Enrollment', {
      'user': item,
    });
  }

  const getStudentProgresstViews = () => {
    /*
    */
    return <View style={styles.student_progress_container}>
      <Text>Coming soon!</Text>
    </View>

  }

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
};

export default StudentManagementPage;

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
 

 