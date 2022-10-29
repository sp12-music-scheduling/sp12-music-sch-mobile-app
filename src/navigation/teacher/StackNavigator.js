import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VideosPage from '../../pages/teacher/video/VideosPage';
import StudentManagementPage from '../../pages/teacher/student_management/StudentManagementPage';

import PracticePlanListPage from '../../pages/teacher/practice_plan/PracticePlanListPage';
import CreatePracticePlanForm from '../../pages/teacher/practice_plan/CreatePracticePlanForm';
import UpdateOrDeletePracticePlanForm from "../../pages/teacher/practice_plan/UpdateOrDeletePracticePlanForm";

import ExercisesPage from '../../pages/teacher/exercise/ExercisesPage';
import CreateExerciseForm from '../../pages/teacher/exercise/CreateExerciseForm';
import UpdateOrDeleteExerciseForm from "../../pages/teacher/exercise/UpdateOrDeleteExerciseForm";


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
      <Stack.Screen name="Create Practice Plan" component={CreatePracticePlanForm} />
      <Stack.Screen name="Update or Delete Practice Plan" component={UpdateOrDeletePracticePlanForm} />
      <Stack.Screen name="Exercises" component={ExercisesPage} />
      <Stack.Screen name="Create Exercise" component={CreateExerciseForm} />
      <Stack.Screen name="Update or Delete Exercise" component={UpdateOrDeleteExerciseForm} />
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