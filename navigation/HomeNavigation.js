import React from 'react'
import { StyleSheet, Text, View,StatusBar } from 'react-native'
//import { NavigationContainer } from '@react-navigation/native';

//import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
//import Home from './Home';
import Userinfo from '../screens/HomeSCreen/Userinfo';
import { enableScreens } from 'react-native-screens'
import Easing from 'react-native/Libraries/Animated/Easing';
import { TransitionPresets, cardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './HomeScreen/TabNavigator';


//enableScreens();
//const Stack = createSharedElementStackNavigator()
const Stack = createStackNavigator()
const HomeNavigation = () => {
    return <Stack.Navigator initialRouteName={'home'} headerMode={'none'} screenOptions={
        {

            ...TransitionPresets.SlideFromRightIOS,
            cardStyleInterpolator: ({ current }) => {
                return {
                    cardStyle: {
                        opacity: current.progress
                    },
                }
            },
            // // avoid lacking animation
            // transitionSpec: {
            //     open: { animation: 'timing', config: { duration: 400, easing: Easing.inOut(Easing.ease) } },
            //     close: { animation: 'timing', config: { duration: 400, easing: Easing.inOut(Easing.ease) } }
            // }
        }
    } >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="userinfo" component={Userinfo}
        />
    </Stack.Navigator>
}

export default HomeNavigation

const styles = StyleSheet.create({})
