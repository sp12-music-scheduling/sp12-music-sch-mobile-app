import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from './TabNavigator';
import { ManagePracticeTypeStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: "60%",
        },
        drawerActiveBackgroundColor: '#754747',
        drawerActiveTintColor: 'white',
      }}>
      <Drawer.Screen 
      name="Home" 
      component={TabNavigator} 
      initialParams={{screen:'PracticePlanHome'}} />
      <Drawer.Screen 
      name="Videos" 
      component={TabNavigator} 
      initialParams={{screen:'Video'}}/>
      <Drawer.Screen 
      name="Student Management" 
      component={TabNavigator} 
      initialParams={{screen:'StudentManagement'}}/>
      <Drawer.Screen 
      name="Manage Practice Types" 
      component={ManagePracticeTypeStackNavigator} 
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;