import * as React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button, FlatList} from "react-native";
import {NavigatorContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

 const ExsDATA =[
      {
      id: 'Ex1',
      title: 'Exercise-1'
      },
      {
       id: 'Ex2',
       title: 'Exercise-2'
      },
      {
       id: 'Ex3',
       title: 'Exercise-3'
      },
      {
        id: 'Ex4',
        title: 'Exercise-4'
      },
      {
        id: 'Ex5',
        title: 'Exercise-5'
      },
      {
        id: 'Ex6',
        title: 'Exercise-6'
      },
      {
        id: 'Ex7',
        title: 'Exercise-7'
      },
      {
        id: 'Ex8',
        title: 'Exercise-8'
      },
      {
        id: 'Ex9',
        title: 'Exercise-9'
      },
      {
        id: 'Ex10',
        title: 'Exercise-10'
      },
      ]
      const ExsItem = ({title}) => (
        <View style ={styles.content}>
          <Text style = {styles.ExItem}> {title}</Text>
        </View>
        );

const App = ({navigation}) => {
const renderItem = ({item}) => (
<ExsItem title = {item.title} />
 );

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <View style = {styles.topSection}>
      <TouchableOpacity onPress ={() => navigation.goBack()}>
        <Image style= {styles.backArrow} source= {require('./assets/icons/backArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.ExerciseTitle}>
          Exercises
        </Text>
      </View>
      </View>
      <FlatList
      data= {ExsDATA}
      renderItem = {renderItem}
      keyExtractor = {item => item.id}
      />
    </SafeAreaView>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: 'Inter',
  },
  backArrow:{
    margin: 20,
},
  ExerciseTitle:{
    color: "#754747",
    textAlign: "center",
    fontSize: 36,
    padding: 20,
    },
    content:{
     backgroundColor: "#C3AAAA",
     padding:20,
     marginVertical: 8,
     marginHorizontal: 16
    },
    ExItem:{
    fontSize: 25,
    color: "white"

    }
});
