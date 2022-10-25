import * as React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button} from "react-native";
import {NavigatorContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Roundbutton from '././components/button-round'
import BottomTabNavigator from '././navigation/teacher/TabNavigator'
export default function App({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <View style = {styles.topSection}>
      <TouchableOpacity onPress ={() => navigation.goBack()}>
        <Image style= {styles.backArrow} source= {require('././assets/icons/backArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.ExerciseTitle}>
          Exercises
        </Text>
        </View>
        <View style= {styles.buttonViewStyle}>
        <Roundbutton title ='Exercise-1' />
        <Roundbutton title ='Exercise-2'/>
        <Roundbutton title ='Exercise-3' />
        </View>
        <BottomTabNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: 'Inter',
  },
//  topSection: {
//  flexDirection: "column",
//   justifyContent: "space-between",
//  },
backArrow:{
margin: 20,
},
  StudentViewMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
  fontColor: {
  color: "#754747",
  fontSize: 21,
  },
  ExerciseTitle:{
    color: "#754747",
    textAlign: "center",
    fontSize: 32,
    padding: 20,
    },
  buttonViewStyle: {
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  }
});
