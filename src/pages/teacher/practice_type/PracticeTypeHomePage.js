import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticeTypeRow from '../../../components/teacher/PracticeTypeRow'; 
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { getDBConnection, getPracticeTypes } from "../../../services/database";


const DEVICE_HEIGHT = Dimensions.get('window').height

const PracticeTypeHomePage = ({navigation}) => {

   const [practiceTypes, setPracticeTypes] = useState([]);
 
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
    */
    const db = await getDBConnection();
    const pt = await getPracticeTypes(db);
    setPracticeTypes(pt);
  }, []);
  
  const getPracticeTypeList = () => {
    /*
    */
    return practiceTypes;
  }

  const navigateToCreate = () => {
    /*
    Function to navigate to the CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Create Practice Type');
  }

  const navigateToUpdateOrDelete = (item) => {
    /*
    Function to navigate to the UPDATE_OR_CREATE form with
    required parameters.
    */
    return () =>  navigation.push('Update or Delete Practice Type', {
      "practice_type": item,
    });
  }

  return (
      <View style={styles.container}>
        <View style={styles.sectionItems}>
          <FlatList
          data={getPracticeTypeList()}
          renderItem={({item}) =>
              <TouchableOpacity 
              onLongPress={navigateToUpdateOrDelete(item)} 
              >
                  <PracticeTypeRow 
                  name={item.name} 
                  sub_type={item.sub_type}/>
              </TouchableOpacity> 
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </View>
        <View style={styles.fab}>
            <FloatingPlusButton 
            onPress={navigateToCreate()} />
        </View>
      </View>
  )
};

export default PracticeTypeHomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    height: DEVICE_HEIGHT - 60
  },
  fab: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionItems: {
    marginTop: -30,    
  },
});
