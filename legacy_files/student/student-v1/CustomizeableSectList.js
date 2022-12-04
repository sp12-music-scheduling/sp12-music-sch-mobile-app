import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, SectionList} from 'react-native';
import CustomStyles from '../assets/styles/DailyPracticeStyles'
export default function CustomSectionList(props){
const Item = ({title}) => (
    <View style = {CustomStyles.content}>
      <Text style= {CustomStyles.ExerciseItems}>{title}</Text>
     </View>
    )
    return(
      <SafeAreaView style = {CustomStyles.container}>
      <SectionList
      sections = {props.data}
      keyExtractor = {(item, index) => item + index}
      renderItem = {({item}) => <Item title = {item} />}
      renderSectionHeader = {({section:{title}}) => (
      <Text style = {CustomStyles.header}>{title}</Text>
      )
    }
      />
      </SafeAreaView>
    )
}
