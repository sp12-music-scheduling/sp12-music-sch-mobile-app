import React, {useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";
import { getDBConnection, createTables, clearDatabase, getPracticeTypes, insertDefaultPracticeTypes, insertDefaultUserRoles, getUserRoles } from "./src/services/database";

 const App = () => {
  
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      // console.log('Clearing DB');
      // await clearDatabase(db);
      await createTables(db);
      const user_roles = await getUserRoles(db);
      if (user_roles.length == 0) {
        await insertDefaultUserRoles(db);
      }
      const practice_types = await getPracticeTypes(db);
      if (practice_types.length == 0) {
        await insertDefaultPracticeTypes(db);
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