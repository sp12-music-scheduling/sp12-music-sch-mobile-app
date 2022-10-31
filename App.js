import React, {useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
import { 
  getDBConnection, 
  createTables, 
  clearDatabase, 
  getPracticeTypes, 
  insertDefaultPracticeTypes,
  insertDemoStudentUsers,
  getUsers,
 } from "./src/services/database";

 const App = () => {
  
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      // await clearDatabase(db); // Useed to manually clear table
      await createTables(db);
      /** 
       * Default Pratice Types
       * Inject the default practice types of empty.
      */
      const practice_types = await getPracticeTypes(db);
      if (practice_types.length == 0) {
        await insertDefaultPracticeTypes(db);
      }
      /**
       * Demo Users creasted to allow for testing.
       */
      const demo_users = await getUsers(db);
      if (demo_users.length == 0) {
        await insertDemoStudentUsers(db);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;

/**
 * 
 * 
 * BATSI TESTING LOGIN
 * 
 */

//  import React from 'react';
//  import {SafeAreaView, StyleSheet, Text} from 'react-native';
//  import Navigation from './src/navigation/login';
 
 
 
//  const App = () => {
//    return (
//      <SafeAreaView style={styles.root}>
//        <Navigation />
//      </SafeAreaView>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    root: {
//      flex: 1,
//      backgroundColor: '#F9FBFC'
//    },
//  });
 
//  export default App;
 