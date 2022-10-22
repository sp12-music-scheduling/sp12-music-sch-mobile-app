import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PP_LandingPage from '../../src/pages/PP-LandingPage';
import ExsListPage from '../../src/ExcercisesListPage';

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
          </Stack.Navigator>
  </NavigationContainer>
   );
};
export default App;