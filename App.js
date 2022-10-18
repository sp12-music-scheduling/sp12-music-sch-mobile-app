import React, {useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
import { getDBConnection, createTables } from "./src/testing/services/database";

 const App = () => {
  
  const loadDataCallback = useCallback(async () => {
    console.log('Creating DB')
    try {
      const db = await getDBConnection();
      await createTables(db);
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