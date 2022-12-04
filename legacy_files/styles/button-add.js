import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, Alert} from 'react-native';
const AddButton = ({onPress}) => {
return(
<TouchableOpacity style = {[
{
width:45,
height: 45,
borderRadius: 35,
fontSize: 32,
backgroundColor: '#C3AAAA',
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
alignSelf: 'flex-end',
margin: 20,
},
]}
onPress = {onPress}
>
<Text style = {styles.plusIcon}>+</Text>
</TouchableOpacity>
);
};
const styles = StyleSheet.create({
plusIcon:{
color: 'white',
textAlign: 'center',
fontSize: 30,
fontWeight: '500',
}
});
export default AddButton;