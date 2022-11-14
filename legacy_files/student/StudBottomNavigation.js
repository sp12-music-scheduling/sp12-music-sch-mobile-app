import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from './PP-LandingPage';
import DrawerNav from './DrawerNavigation'
// import Video from 'VideoLibrary'
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
return(
<Tab.Navigator
initialRouteName = "Home"
screenOptions = {{
headerShown: false,
tabBarShowLabel: false,
tabBarStyle: {
position: 'absolute',
backgroundColor: '#C3AAAA',
borderRadius:15
},
}}
>
<Tab.Screen
name ="Drawer Nav"
component = {DrawerNav}
screenOptions = {{
tabBarLabel : 'Menu',
tabBarIcon : () => (
<Image source = {require('./assets/icons/bars-solid.png')} />
)
}}
/>
<Tab.Screen
name = "Home"
component ={Homepage}
screenOptions = {{
tabBarLabel: 'Home'
}}
/>
</Tab.Navigator>
)
}
export default BottomNavigation;
