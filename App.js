import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/teacher/DrawerNavigator";

 const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
export default App;