import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/teacher/HomeScreen';
import VideoSubmissonScreen from '../screens/teacher/VideoSubmissonScreen';
import SideDrawerScreen from '../screens/teacher/SideDrawerScreen';

const Tab = createBottomTabNavigator();

// [10/08/2022]
// Leaving this section commented-out in the case we decide to use a custom
// center button.
// const CustomTabBarButton = ({children, onPress}) => (
// <TouchableOpacity
//     style={{
//         top: -5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         ... styles.shadow
//     }}
//     onPress={onPress}
// >
//     <View
//     styles={{
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#ffffff'
//     }}
//     >
//         {children}
//     </View>
// </TouchableOpacity>
// );

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                initialRouteName: "Home",  // TODO: Figure out how to make HOME the default bottom tab. This line is not working.
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#C3AAAA',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                },
                
                }}
        >
            <Tab.Screen 
                name="SideDrawer" 
                component={SideDrawerScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 15,
                            }}
                        >
                            <Image
                                source={require('../assets/icons/bars-solid.png')}
                                resizeMode='contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#2C0B0B' : '#754747'
                                }}
                            />
                        </View>
                    ),
                }}
            ></Tab.Screen>
            {/* 
            [10/08/2022]
            Leaving this section commeted in the case we decidee to use a custom
            Center button.
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{alignItems: 'center', justifyContent: 'center', top:15}}
                        >
                            <Image
                                source={require('../assets/icons/house-solid.png')}
                                resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    tintColor: focused ? '#2C0B0B' : '#754747'
                                }}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            ></Tab.Screen> */}
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{alignItems: 'center', justifyContent: 'center', top:10}}
                        >
                            <Image
                                source={require('../assets/icons/house-solid.png')}
                                resizeMode='contain'
                                style={{
                                    width: 45,
                                    height: 45,
                                    tintColor: focused ? '#2C0B0B' : '#754747'
                                }}
                            />
                        </View>
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen 
                name="VideoSubmission" 
                component={VideoSubmissonScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 15,
                                }}
                        >
                            <Image
                                source={require('../assets/icons/video-solid.png')}
                                resizeMode='contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#2C0B0B' : '#754747'
                                }}
                            />
                        </View>
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default Tabs;