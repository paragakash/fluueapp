import React from 'react'

import GetStarted from '../screens/GetStarted';
import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import AppNavigator from './AppNavigator';


const Stack = createStackNavigator();

const AuthNavogator = () => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: null
        }} initialRouteName="Getstarted" >

        <Stack.Screen
            name="Getstarted"
            component={GetStarted}
        />
        <Stack.Screen
            name="Login"
            component={Login}
        />
         <Stack.Screen
            name="Signup"
            component={Signup}
        />
        <Stack.Screen
            name="App"
            component={AppNavigator}
        />
        {/* 
        <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
        />
        <Stack.Screen
            name="OtpSignUp"
            component={OtpSignUp}
        /> */}
    </Stack.Navigator>
}

export default AuthNavogator
