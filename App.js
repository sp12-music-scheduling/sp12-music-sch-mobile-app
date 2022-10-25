// import React, {useState, useCallback, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
// import { getDBConnection, createTables, clearDatabase, getPracticeTypes, insertDefaultPracticeTypes, insertDefaultUserRoles, getUserRoles, getDemoTeacherUser } from "./src/services/database";

//  const App = () => {
  
//   const [user, setUser] = useState('');

//   const loadDataCallback = useCallback(async () => {
//     try {
//       const db = await getDBConnection();
//       // await clearDatabase(db);
//       await createTables(db);
//       const user_roles = await getUserRoles(db);
//       if (user_roles.length == 0) {
//         await insertDefaultUserRoles(db);
//       }
//       const practice_types = await getPracticeTypes(db);
//       if (practice_types.length == 0) {
//         await insertDefaultPracticeTypes(db);
//       }
//       // TMP CREATING USER
//       setUser(await getDemoTeacherUser(db));
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);
  
//   useEffect(() => {
//     loadDataCallback();
//   }, [loadDataCallback]);

//   console.log('APP <user>',user);
//   return (
//     <NavigationContainer>
//       <DrawerNavigator user={user} />
//     </NavigationContainer>
//   );
// }

// export default App;

/**
 * 
 * 
 * BATSI TESTING LOGIN
 * 
 */

 import React from 'react';
 import {SafeAreaView, StyleSheet, Text} from 'react-native';
 import Navigation from './src/navigation/login';
 
 
 
 const App = () => {
   return (
     <SafeAreaView style={styles.root}>
       <Navigation />
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   root: {
     flex: 1,
     backgroundColor: '#F9FBFC'
   },
 });
 
 export default App;
 