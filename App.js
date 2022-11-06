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


// // import React, {useState, useCallback, useEffect } from "react";
// // import { NavigationContainer } from "@react-navigation/native";
// // import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
// // import {
// //   getDBConnection,
// //   createTables,
// //   clearDatabase,
// //   getPracticeTypes,
// //   insertDefaultPracticeTypes,
// //   insertDemoStudentUsers,
// //   getUsers,
// //  } from "./src/services/database";


// //  const App = () => {

// //   const loadDataCallback = useCallback(async () => {
// //     try {
// //       const db = await getDBConnection();
// //       // await clearDatabase(db);
// //       await createTables(db);

// //       /**
// //        * Default Pratice Types
// //        * Inject the default practice types of empty.
// //       */

// //       const practice_types = await getPracticeTypes(db);
// //       if (practice_types.length == 0) {
// //         await insertDefaultPracticeTypes(db);
// //       }
// //       // TMP CREATING USER
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }, []);


// //   useEffect(() => {
// //     loadDataCallback();
// //   }, [loadDataCallback]);


// //   return (
// //     <NavigationContainer>
// //       <DrawerNavigator/>
// //     </NavigationContainer>
// //   );
// // }

// // export default App;

// /**
//  * 
//  * 
//  * BATSI TESTING LOGIN
//  * 
//  */

// /* Student View */

// //import * as React from "react";
// //import {NavigationContainer} from '@react-navigation/native';
// //import { createNativeStackNavigator } from '@react-navigation/native-stack';
// //import PP_LandingPage from './src/pages/student/PP-LandingPage';
// //import ExsListPage from './src/pages/student/ExcercisesListPage';
// //import JoinPlanPage from './src/pages/student/JoinPlanPage';
// //import WklyPracticePage from './src/pages/student/WklyPracticePage';
// //import DailyPracticePage from './src/pages/student/DailyPractice';
// //const Stack = createNativeStackNavigator();
// //const App = () => {
// //  return (
// //  <NavigationContainer>
// //    <Stack.Navigator>
// //            <Stack.Screen
// //              name = "Landing Page"
// //              component={PP_LandingPage}
// //              options = {{headerShown: false}}
// //            />
// //            <Stack.Screen
// //              name ="Exercises"
// //              component = {ExsListPage}
// //              options = {{headerShown: false}}
// //            />
// //            <Stack.Screen
// //              name = "Join Plan"
// //              component = {JoinPlanPage}
// //              options = {{headerShown: false}}
// //            />
// //             <Stack.Screen
// //               name = "Weekly Practice List"
// //               component = {WklyPracticePage}
// //               options = {{headerShown: false}}
// //            />
// //             <Stack.Screen
// //               name = "Daily Practice"
// //               component= {DailyPracticePage}
// //               options = {{headerShown: false}}
// //            />
// //          </Stack.Navigator>
// //  </NavigationContainer>
// //   );
// //};
// //export default App;
