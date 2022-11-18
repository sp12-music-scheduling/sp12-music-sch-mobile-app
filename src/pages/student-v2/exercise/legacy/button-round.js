import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Used this Component in Exercise and Celebration Page
const Roundbutton = ({title, onPress}) => {
return(
<TouchableOpacity style = {{
width: 254,
height: 45,
borderRadius: 52,
backgroundColor: '#C3AAAA',
margin: 20,
flexDirection:'column',
justifyContent: 'center',
alignItems: 'center',
}}
onPress = {onPress}
>
<Text style= {{color: 'white', fontSize: 18}}>{title}</Text>
</TouchableOpacity>
);
};
export default Roundbutton;