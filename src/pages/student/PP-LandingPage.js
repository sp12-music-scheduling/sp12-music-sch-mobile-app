import * as React from "react";
import {StyleSheet,Text, View, Image, TouchableOpacity, SafeAreaView, Button, Alert} from "react-native";
import {NavigatorContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Roundbutton from '././components/button-round'
import AddButton from '././components/button-add'
import BottomTabNavigator from '././navigation/teacher/TabNavigator'

export default function App({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.StudentViewMenu}>
        <Text style={styles.fontColor}>All</Text>
        <Text style={styles.fontColor}>Etudes</Text>
        <Text style={styles.fontColor}>Solos</Text>
        <Text style={styles.fontColor}>Fundamentals</Text>
      </View>
      <View style={styles.PracticePlanTitle}>
        <Text
          style={{
            color: "#754747",
            textAlign: "center",
            fontSize: 38,
            padding: 20
          }}
        >
          Practice Plan
        </Text>
        <View style= {styles.buttonViewStyle}>
        <Roundbutton title ='Plan A' onPress = {() => navigation.navigate('Exercises')}/>
        <Roundbutton title ='Plan B' onPress = {() => navigation.navigate('Exercises')}/>
        </View>
        <View>
        <AddButton onPress = {() => Alert.alert('Button pressed')}/>
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
  StudentViewMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
  fontColor: {
  color: "#754747",
  fontSize: 17,
  },
  buttonViewStyle: {
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  }
});
