import React, {useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
import { getDBConnection, createTables, clearDatabase, getPracticeTypes, initPracticeTypes } from "./src/services/database";

 const App = () => {
  
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      // console.log('Clearing DB');
      // await clearDatabase(db);
      await createTables(db);
      const practice_types = await getPracticeTypes(db);
      if (!practice_types.length) {
        await initPracticeTypes(db);
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