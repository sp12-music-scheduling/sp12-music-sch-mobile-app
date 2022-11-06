import React, { useEffect, useState }  from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import TabNavigator from './TabNavigator';
import { ProfessorManagePracticeTypeStackNavigator, LoginStackNavigator } from "./StackNavigator";
import { auth } from '../../../firebase';

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
    return subscriber; // unsubscribe on unmount
  }, []);

  const getUserViews = () => {
    if (user.email.endsWith('@kennesaw.edu')){
          return professorViews();
    } else{
      // TODO: Add student views function
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
        component={TabNavigator} 
        initialParams={{screen:'PracticePlanHome'}} />
        <Drawer.Screen 
        name="Videos" 
        component={TabNavigator} 
        initialParams={{screen:'Video'}}/>
        <Drawer.Screen 
        name="Student Management" 
        component={TabNavigator} 
        initialParams={{screen:'StudentManagement'}}/>
        <Drawer.Screen 
        name="Manage Practice Types" 
        component={ProfessorManagePracticeTypeStackNavigator} 
        />
      </Drawer.Navigator>
    );
  }

  return auth.currentUser == null ? <LoginStackNavigator/>: getUserViews();
}

export default DrawerNavigator;