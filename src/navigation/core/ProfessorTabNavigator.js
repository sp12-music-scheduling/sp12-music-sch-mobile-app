import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
  ProfessorMainStackNavigator, 
  ProfessorVideosStackNavigator, 
  ProfessortManageStudentStackNavigator 
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName={"PracticePlanHome"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#C3AAAA',
            borderRadius: 15,
            height: 90,
            ...styles.shadow
        },
      }}
    >
      <Tab.Screen 
        name="StudentManagement" 
        component={ProfessortManageStudentStackNavigator} 
        options={{
          tabBarIcon: ({focused}) => (
              <View
                  style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: 15,
                  }}
              >
                  <Image
                      source={require('../../assets/icons/bars-solid.png')}
                      resizeMode='contain'
                      style={{
                          width: 35,
                          height: 35,
                          tintColor: focused ? '#2C0B0B' : '#754747'
                      }}
                  />
              </View>
          ),
        }}
      />
      <Tab.Screen 
        name="PracticePlanHome" 
        component={ProfessorMainStackNavigator} 
        options={{
          tabBarIcon: ({focused}) => (
              <View
                  style={{alignItems: 'center', justifyContent: 'center', top:10}}
              >
                  <Image
                      source={require('../../assets/icons/house-solid.png')}
                      resizeMode='contain'
                      style={{
                          width: 45,
                          height: 45,
                          tintColor: focused ? '#2C0B0B' : '#754747'
                      }}
                  />
              </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Video" 
        component={ProfessorVideosStackNavigator} 
        options={{
          tabBarIcon: ({focused}) => (
              <View
                  style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: 15,
                      }}
              >
                  <Image
                      source={require('../../assets/icons/video-solid.png')}
                      resizeMode='contain'
                      style={{
                          width: 35,
                          height: 35,
                          tintColor: focused ? '#2C0B0B' : '#754747'
                      }}
                  />
              </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
  }
})
