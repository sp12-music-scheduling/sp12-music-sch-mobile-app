import * as React from "react";
import {StyleSheet, Text, View,TouchableOpacity, SafeAreaView, Button, Image, TextInput, Alert} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Roundbutton from '../../components/button-round';
export default function App({navigation}) {
  return (
  <SafeAreaView style ={styles.container}>
  <View style ={styles.header}>
  <View style = {styles.backArrow}>
  <TouchableOpacity onPress = {() => navigation.goBack()}>
  <Image source = {require('../../assets/icons/backArrow.png')} />
  </TouchableOpacity>
  </View>
  <Text style = {styles.JoinPlanTitle}> Practice Plan</Text>
  </View>
  <View style = {styles.BorderBox}>
  <View style = {styles.section}>
  <TextInput style ={{margin: 20, fontSize: 18}} placeholder="Enter Code" />
  <Roundbutton title ="Submit" onPress = {() => alert('Clicked')} />
  </View>
  </View>
  </SafeAreaView>
  );
  }

  const styles = StyleSheet.create({
  container:{
  flex: 1,
  backgroundColor: "#F5F5F5",
  fontFamily: 'Inter',
  },
  header:{
   flexDirection: 'row',
//   justifyContent: 'space-between',
   alignItems: 'center',
  },
  JoinPlanTitle:{
      color: "#754747",
      fontSize: 32,
      textAlign: 'center',
      padding: 20,
      marginRight: 5,
    },
  BorderBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    width: 300,
    backgroundColor: 'white',
    marginTop: 20,
    },
  section:{
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'flex-start',
  padding:30,
  backgroundColor: 'white',
  },
  backArrow:{
  marginRight: 20,
  padding: 10,
  }
  });