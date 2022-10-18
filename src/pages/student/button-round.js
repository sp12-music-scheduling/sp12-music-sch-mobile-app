import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
const Roundbutton = (props, {style}) => {
return(
<TouchableOpacity style = {[{
width: 254,
height: 40,
borderRadius: 52,
backgroundColor: '#C3AAAA',
margin: 20,
flexDirection:'column',
justifyContent: 'center',
alignItems: 'center',
},
style,
]}
>
<Text>{props.title}</Text>
</TouchableOpacity>
);
};
export default Roundbutton;