import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-nativigation/native';
import {createNativeStackNavigation} from '@react-navigation/native-stack';
//import DropDownPicker from 'react-native-dropdown-picker';
import CustomSectionList from './DailyPracSectList'
import CustomStyles from './DailyPracticeStyles'

// The Exercise Page is displayed dere
// The CustomSectionList contains the Section List and rendering for the Exercise Page
// TO DO: Have a dynamic way of displaying each 'Day #'
export default function App(){
return(
<SafeAreaView style = {styles.container}>
<Text style = {styles.DayTitle}>Day 1</Text>
<CustomSectionList/>
</SafeAreaView>
)
}

const styles = StyleSheet.create({
container:{
flex: 1,
},
DayTitle:{
textAlign: 'center',
fontSize: 38,
margin: 10,
},
});