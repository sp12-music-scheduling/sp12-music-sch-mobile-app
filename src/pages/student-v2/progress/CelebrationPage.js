import React from 'react';
import {View, Image, Text, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-nativigation/native';
import {createNativeStackNavigation} from '@react-navigation/native-stack';
import Roundbutton from '../exercise/button-round'

// Simple Page if 'Mark as Complete' Button is Pressed

const CompleteExercise = ({navigation}) =>{
return(
<SafeAreaView>
<View>
<Text style={styles.txt}>Congrats !!</Text>
<Image source={require('../../../assets/icons/undraw_celebration.png')} style= {{width:360, height:250, margin: 20}} />
<Text style={styles.txt}>You Completed the Exercises!</Text>
</View>
<View style ={{alignItems:'center', flex: 1, justifyContent:'center' }}>
<Roundbutton title= "Return Home"  onPress = {() => navigation.navigate('Celebration Page')} />
</View>
</SafeAreaView>
)
}
const styles = StyleSheet.create({
txt:{
textAlign:'center',
margin: 50,
color:'black',
fontSize: 30
}
})

export default CompleteExercise;