import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, SectionList, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-nativigation/native';
import {createNativeStackNavigation} from '@react-navigation/native-stack';


const WEEK_DATA = [
{
title: "Week 1",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 2",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 3",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 4",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 5",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 6",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 7",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
},
{
title: "Week 8",
data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
}
];

const WeekItem = ({title, navigation, onPress}) => (
<View style = {styles.content}>
<TouchableOpacity style = {styles.DaySection} onPress = {onPress}>
<Text style ={styles.listItems}>{title}</Text>
<Image source = {require('../../assets/icons/chevron.png')}/>
</TouchableOpacity>
</View>
);
const App = ({navigation}) => (
<SafeAreaView style = {styles.container}>
<Text style = {styles.PracticeListTitle}> Weekly Practices</Text>
<SectionList
sections = {WEEK_DATA}
keyExtractor = {(item, index) => item + index}
renderItem = {({item}) => <WeekItem title = {item}  onPress = {() => navigation.navigate('Daily Practice')} />}
renderSectionHeader = {({section: {title}}) => (
<Text style = {styles.header}> {title} </Text>
)}
/>
</SafeAreaView>
);
const styles = StyleSheet.create({
container:{
flex: 1,
marginHorizontal: 16
},
listItems:{
fontSize: 20
},
content:{
marginVertical: 8
},
header:{
fontSize: 28,
marginTop: 10,
color:'#794A4A'
},
DaySection :{
flexDirection: 'row',
justifyContent:'space-between',
paddingRight: 30
},
PracticeListTitle:{
textAlign: 'center',
margin: 20,
color:'#794A4A',
fontSize: 36
}
});
export default App;