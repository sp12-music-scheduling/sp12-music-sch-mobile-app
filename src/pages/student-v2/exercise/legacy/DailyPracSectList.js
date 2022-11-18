import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, SectionList, TouchableOpacity, Linking} from 'react-native';
import CustomStyles from './DailyPracticeStyles'
import Roundbutton from './button-round'
import {description, goalTempoNum, startTempoNum} from './DummyExerciseValues'
import {link, videoID} from './UrlExtractor';
import VideoPlayer from './YTPlayer';
import {NavigationContainer} from '@react-nativigation/native';
import {createNativeStackNavigation} from '@react-navigation/native-stack';

export default function CustomSectionList({navigation}){

const DAILY_PRACS =[
{
title: "Exercise Name",
data: [{ videoLabel: "Video Link:  ", videoLink: link, descLabel: "Description:  ", desc: description, startTempoLabel: "START Tempo:  ", startTempo: startTempoNum, goalTempoLabel:"GOAL Tempo:  ", goalTempo: goalTempoNum}]
},
];

// Displays the YouTube Video Component if a link is provided
function isValidLink(link){
if (link !== ''){
return(
<View><VideoPlayer/></View>
)
}
}
//Displays the Item Component which takes in the data from DAILY_PRACS and displays on screen
const Item = ({item}) => (
<SafeAreaView>
    {isValidLink(link)}
    <View style = {CustomStyles.content}>
      <Text style= {CustomStyles.ExerciseItems}>{item.videoLabel}</Text>
      <Text style={[CustomStyles.ExerciseItems, CustomStyles.YTlink]} onPress= {() => Linking.openURL(item.videoLink)}>{item.videoLink} </Text>
      <Text style= {CustomStyles.ExerciseItems}>{item.descLabel}</Text>
       <Text style= {CustomStyles.ExerciseItems}>{item.desc}</Text>
      <Text style= {CustomStyles.ExerciseItems}>{item.startTempoLabel}{item.startTempo}</Text>
      <Text style= {CustomStyles.ExerciseItems}>{item.goalTempoLabel}{item.goalTempo}</Text>
     </View>
</SafeAreaView>
    )
    // The Item Component is rendered here with a Button to mark exercise as completed
    return(
      <SafeAreaView style = {CustomStyles.container}>
        <SectionList
         sections = {DAILY_PRACS}
         keyExtractor = {(item,index) => item + index}
         renderItem = {({item}) =>
         <Item item = {item} />
         }
         renderSectionHeader = {({section:{title}}) => (
           <Text style = {CustomStyles.header}>{title}</Text>
          )
             }
           />
           <View style = {{ flexDirecton: 'column', alignItems:'center'}}>
           {navigation}
           <Roundbutton title = "Mark as Complete" onPress = {() => navigation.navigate('Celebration Page')}/>
           </View>
      </SafeAreaView>
    )
}
