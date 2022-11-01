import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-nativigation/native';
import {createNativeStackNavigation} from '@react-navigation/native-stack';
import CustomSectionList from '../../components/CustomizeableSectList'
import CustomStyles from '../../styles/student/DailyPracticeStyles'
const DAILY_PRACS =[
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
},
{
title: "Exercise Name",
data: ["Video Link:", "Description:", "Start Tempo:", "Goal Tempo:"]
}
];
export default function App(){
return(
<SafeAreaView style = {styles.container}>
<Text style = {styles.DayTitle}>Day 1</Text>
<CustomSectionList data = {DAILY_PRACS} />
</SafeAreaView>
)
}
const styles = StyleSheet.create({
container:{
flex: 1,

},
DayTitle:{
textAlign: 'center',
fontSize: 36,
margin: 10,
},
});