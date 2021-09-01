import React from 'react'
//import GetStarted from '../screens/GetStarted';
//import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
//import Signup from '../screens/Signup';
//import HomScreen from '../screens/HomScreen';
import HomeNavigation from './HomeNavigation';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: null
        }} initialRouteName="Homescreen" >

        <Stack.Screen
            name="Homescreen"
            component={HomeNavigation}
        />
        
    </Stack.Navigator>
}

export default AppNavigator
