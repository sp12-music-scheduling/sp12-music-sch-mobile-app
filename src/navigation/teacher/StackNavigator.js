import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VideosPage from '../../pages/teacher/video/VideosPage';

import StudentManagementPage from '../../pages/teacher/student_management/StudentManagementPage';
import StudentManagementEnrollmentPage from "../../pages/teacher/student_management/StudentManagementEnrollmentPage";

import PracticePlanListPage from '../../pages/teacher/practice_plan/PracticePlanListPage';
import CreatePracticePlanForm from '../../pages/teacher/practice_plan/CreatePracticePlanForm';
import UpdateOrDeletePracticePlanForm from "../../pages/teacher/practice_plan/UpdateOrDeletePracticePlanForm";

import ExercisesPage from '../../pages/teacher/exercise/ExercisesPage';
import CreateExerciseForm from '../../pages/teacher/exercise/CreateExerciseForm';
import UpdateOrDeleteExerciseForm from "../../pages/teacher/exercise/UpdateOrDeleteExerciseForm";
import ExerciseEnrollmentPage from "../../pages/teacher/exercise/ExerciseEnrollmentPage";

import PracticeTypeHomePage from "../../pages/teacher/practice_type/PracticeTypeHomePage";
import CreatePracticeTypeForm from "../../pages/teacher/practice_type/CreatePracticeTypeForm";
import UpdateOrDeletePracticeTypeForm from "../../pages/teacher/practice_type/UpdateOrDeletePracticeTypeForm";

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
      <Stack.Screen name="Exercise Entrollment" component={ExerciseEnrollmentPage} />
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
      <Stack.Screen name="Student Management Enrollment" component={StudentManagementEnrollmentPage} />
    </Stack.Navigator>
  );
}

const ManagePracticeTypeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Manage Practice Types" component={PracticeTypeHomePage} />
      <Stack.Screen name="Create Practice Type" component={CreatePracticeTypeForm} />
      <Stack.Screen name="Update or Delete Practice Type" component={UpdateOrDeletePracticeTypeForm} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, VideosStackNavigator, StudentManagementStackNavigator, ManagePracticeTypeStackNavigator };