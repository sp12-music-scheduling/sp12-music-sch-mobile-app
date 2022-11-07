 import {SafeAreaView, StyleSheet, Text} from 'react-native';
 

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './src/navigation/core/DrawerNavigator';

 
 const App = () => {
   return (
     <NavigationContainer>
       <DrawerNavigator />
     </NavigationContainer>
   );
 };

 export default App;
