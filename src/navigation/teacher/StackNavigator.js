import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PracticePlanListPage from '../../pages/teacher/practice_plan/PracticePlanListPage';
import ExercisesPage from '../../pages/teacher/ExercisesPage';
import VideosPage from '../../pages/teacher/VideosPage';
import StudentManagementPage from '../../pages/teacher/StudentManagementPage';
import CreatePracticePlanForm from '../../pages/teacher/practice_plan/CreatePracticePlanForm';
import UpdateOrDeletePracticePlanForm from "../../pages/teacher/practice_plan/UpdateOrDeletePracticePlanForm";

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
      <Stack.Screen name="Create Practice Plan" component={CreatePracticePlanForm} />
      <Stack.Screen name="Update or Delete Practice Plan" component={UpdateOrDeletePracticePlanForm} />

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