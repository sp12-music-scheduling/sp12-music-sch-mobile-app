import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet,View,FlatList,Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PracticeTypeRow from '../../../components/teacher/PracticeTypeRow'; 
import FloatingPlusButton from '../../../components/teacher/FloatingPlusButton';
import { auth, firestore } from '../../../../firebase';


const DEVICE_HEIGHT = Dimensions.get('window').height

const PracticeTypeHomePage = ({navigation}) => {

  const user = auth.currentUser;

  const [practiceTypes, setPracticeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
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
    Pulls data required to load this page.
    */
    firestoreGetPracticeTypes();
  }, []);
  
  const firestoreGetPracticeTypes =  () => {
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
        setPracticeTypes(data);
        setIsLoading(false);
    });
  }

  const getPracticeTypeList = () => {
    /*
    Returns an array of practice type(s).
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

  if (isLoading){
    return (
    <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
    </View>
    );
  } else{
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
  }
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
