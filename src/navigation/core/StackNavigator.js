import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VideosHomePage from '../../pages/teacher/video/VideosHomePage';

import StudentManagementHomePage from '../../pages/teacher/student_management/StudentManagementHomePage';
import StudentManagementEnrollmentPage from "../../pages/teacher/student_management/StudentManagementEnrollmentPage";

import PracticePlanHomePage from '../../pages/teacher/practice_plan/PracticePlanHomePage';
import CreatePracticePlanForm from '../../pages/teacher/practice_plan/CreatePracticePlanForm';
import UpdateOrDeletePracticePlanForm from "../../pages/teacher/practice_plan/UpdateOrDeletePracticePlanForm";

import ExerciseHomePage from '../../pages/teacher/exercise/ExerciseHomePage';
import CreateExerciseForm from '../../pages/teacher/exercise/CreateExerciseForm';
import UpdateOrDeleteExerciseForm from "../../pages/teacher/exercise/UpdateOrDeleteExerciseForm";
import ExerciseEnrollmentPage from "../../pages/teacher/exercise/ExerciseEnrollmentPage";
import EnrollmentCalendarPage from "../../pages/teacher/exercise/EnrollmentCalendarPage";

import PracticeTypeHomePage from "../../pages/teacher/practice_type/PracticeTypeHomePage";
import CreatePracticeTypeForm from "../../pages/teacher/practice_type/CreatePracticeTypeForm";
import UpdateOrDeletePracticeTypeForm from "../../pages/teacher/practice_type/UpdateOrDeletePracticeTypeForm";

import SignInScreen from '../../pages/login/SignInScreen';
import SignUpScreen from '../../pages/login/SignUpScreen';
import ConfirmEmailScreen from '../../pages/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../../pages/login/ForgotPasswordScreen';
import ResetPasswordScreen from '../../pages/login/ResetPasswordScreen';

import StudentPracticePlanHomePage from "../../pages/student-v2/practice_plan/StudentPracticePlanHomePage";
import NewEnrollForm from "../../pages/student-v2/practice_plan/NewEnrollForm";
import UpdateEnrollmentForm from "../../pages/student-v2/practice_plan/UpdateEnrollmentForm";

import StudentExerciseHomePage from "../../pages/student-v2/exercise/StudentExerciseHomePage";

import UserSettingsPage from "../../pages/shared/UserSettingsPage";

import StudentVideosHomePage from "../../pages/student-v2/video/StudentVideosHomePage";

import StudentProgressHomePage from "../../pages/student-v2/progress/StudentProgressHomePage";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#754747",
  headerBackTitle: "Back",
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name = "Sign In Screen" component={SignInScreen} />
      <Stack.Screen name = "Sign Up Screen" component={SignUpScreen} />
      <Stack.Screen name = "Confirm Email Screen" component={ConfirmEmailScreen} />
      <Stack.Screen name = "Forgot Password Screen" component={ForgotPasswordScreen} />
      <Stack.Screen name = "Reset Password Screen" component={ResetPasswordScreen} />
    </Stack.Navigator>      
  );
};

const ProfessorMainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Practice Plans" component={PracticePlanHomePage} />
      <Stack.Screen name="Create Practice Plan" component={CreatePracticePlanForm} />
      <Stack.Screen name="Update or Delete Practice Plan" component={UpdateOrDeletePracticePlanForm} />
      <Stack.Screen name="Exercises" component={ExerciseHomePage} />
      <Stack.Screen name="Create Exercise" component={CreateExerciseForm} />
      <Stack.Screen name="Update or Delete Exercise" component={UpdateOrDeleteExerciseForm} />
      <Stack.Screen name="Exercise Entrollment" component={ExerciseEnrollmentPage} />
      <Stack.Screen name="Select Start Date" component={EnrollmentCalendarPage} />
    </Stack.Navigator>
  );
}

const ProfessorVideosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Videos" component={VideosHomePage} />
    </Stack.Navigator>
  );
}

const ProfessortManageStudentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Student Management" component={StudentManagementHomePage} />
      <Stack.Screen name="Student Management Enrollment" component={StudentManagementEnrollmentPage} />
    </Stack.Navigator>
  );
}

const ProfessorManagePracticeTypeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Manage Practice Types" component={PracticeTypeHomePage} />
      <Stack.Screen name="Create Practice Type" component={CreatePracticeTypeForm} />
      <Stack.Screen name="Update or Delete Practice Type" component={UpdateOrDeletePracticeTypeForm} />
    </Stack.Navigator>
  );
}

const StudentMainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Practice Plans" component={StudentPracticePlanHomePage} />
      <Stack.Screen name="Enroll" component={NewEnrollForm} />
      <Stack.Screen name="Update Enrollment" component={UpdateEnrollmentForm} />
      <Stack.Screen name="Exercises" component={StudentExerciseHomePage} />
    </Stack.Navigator>
  );
}

const StudentVideosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Videos" component={StudentVideosHomePage} />
    </Stack.Navigator>
  );
}

const StudentProgressStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Progress" component={StudentProgressHomePage} />
    </Stack.Navigator>
  );
}

const UserSettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="User Settings" component={UserSettingsPage} />
    </Stack.Navigator>
  );
}

export { 
  LoginStackNavigator,
  ProfessorMainStackNavigator, 
  ProfessorVideosStackNavigator, 
  ProfessortManageStudentStackNavigator, 
  ProfessorManagePracticeTypeStackNavigator,
  StudentMainStackNavigator,
  StudentVideosStackNavigator,
  StudentProgressStackNavigator,
  UserSettingsStackNavigator,
};