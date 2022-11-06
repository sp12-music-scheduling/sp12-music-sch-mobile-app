import React, { useEffect, useState }  from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import ProfessorTabNavigator from './ProfessorTabNavigator';
import StudentTabNavigator from './StudentTabNavigator';
import { ProfessorManagePracticeTypeStackNavigator, LoginStackNavigator } from "./StackNavigator";
import { auth } from '../../../firebase';

import {
  getDBConnection,
  createTables,
  clearDatabase,
  getPracticeTypes,
  insertDefaultPracticeTypes,
 } from "../../services/database";

function SignOutDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Signout" onPress={() => auth.signOut()} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    createDatabaseDefaults();
    return subscriber; // unsubscribe on unmount
  }, []);

  const createDatabaseDefaults = async () => {
    const db = await getDBConnection();
    // await clearDatabase(db);
    await createTables(db);
    const practice_types = await getPracticeTypes(db);
    if (practice_types.length == 0) {
      await insertDefaultPracticeTypes(db);
    }
  }

  const getUserViews = () => {
    if (user.email.endsWith('@kennesaw.edu')){
          return professorViews();
    } else{
      return studentViews();
    }
  }

  const professorViews = () => {
    /*

    */
    return (
      <Drawer.Navigator 
        drawerContent={props => <SignOutDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "white",
            width: "60%",
          },
          drawerActiveBackgroundColor: '#754747',
          drawerActiveTintColor: 'white',
        }}>
        <Drawer.Screen 
        name="Home" 
        component={ProfessorTabNavigator} 
        initialParams={{screen:'PracticePlanHome'}} />
        <Drawer.Screen 
        name="Videos" 
        component={ProfessorTabNavigator} 
        initialParams={{screen:'Video'}}/>
        <Drawer.Screen 
        name="Student Management" 
        component={ProfessorTabNavigator} 
        initialParams={{screen:'StudentManagement'}}/>
        <Drawer.Screen 
        name="Manage Practice Types" 
        component={ProfessorManagePracticeTypeStackNavigator} 
        />
      </Drawer.Navigator>
    );
  }

  const studentViews = () => {
    /*

    */
    return (
      <Drawer.Navigator 
        drawerContent={props => <SignOutDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "white",
            width: "60%",
          },
          drawerActiveBackgroundColor: '#754747',
          drawerActiveTintColor: 'white',
        }}>
        <Drawer.Screen 
        name="Home" 
        component={StudentTabNavigator} 
        initialParams={{screen:'PracticePlanHome'}} />
        <Drawer.Screen 
        name="Videos" 
        component={StudentTabNavigator} 
        initialParams={{screen:'Video'}}/>
      </Drawer.Navigator>
    );
  }

  return auth.currentUser == null ? <LoginStackNavigator/>: getUserViews();
}

export default DrawerNavigator;