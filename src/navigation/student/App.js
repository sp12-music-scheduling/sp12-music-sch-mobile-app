import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PP_LandingPage from '../../pages/student/PP-LandingPage';
import ExsListPage from '../../pages/student/ExcercisesListPage';
import JoinPlanPage from '../../pages/student/JoinPlanPage'
import WklyPracticePage from '../../pages/student/WklyPracticePage'
import DailyPracticePage from '../../pages/student/DailyPractice'
const Stack = createNativeStackNavigator();
const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
            <Stack.Screen
              name = "Landing Page"
              component={PP_LandingPage}
              options = {{headerShown: false}}
            />
            <Stack.Screen
              name ="Exercises"
              component = {ExsListPage}
              options = {{headerShown: false}}
            />
           <Stack.Screen
              name = "Join Plan"
              component = {JoinPlanPage}
              options = {{headerShown: false}}
           />
             <Stack.Screen
               name = "Weekly Practice List"
               component = {WklyPracticePage}
               options = {{headerShown: false}}
            />
               <Stack.Screen
                name = "Daily Practice"
                component= {DailyPracticePage}
                options = {{headerShown: false}}
             />
          </Stack.Navigator>
  </NavigationContainer>
   );
};
export default App;