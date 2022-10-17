import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PracticePlanListPage from '../pages/teacher/PracticePlanListPage';
import ExercisesPage from '../pages/teacher/ExercisesPage';
import VideosPage from '../pages/teacher/VideosPage';
import StudentManagementPage from '../pages/teacher/StudentManagementPage'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#754747",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Practice Plans" component={PracticePlanListPage} />
      <Stack.Screen name="Exercises" component={ExercisesPage} />
    </Stack.Navigator>
  );
}

const VideosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Videos" component={VideosPage} />
    </Stack.Navigator>
  );
}

const StudentManagementStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Student Management" component={StudentManagementPage} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, VideosStackNavigator, StudentManagementStackNavigator };