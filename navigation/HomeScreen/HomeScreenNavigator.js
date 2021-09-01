//import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../../screens/HomeSCreen/HomeScreen';
import HomeScreenSetting from '../../screens/HomeSCreen/HomeScreenSetting';


const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
    return <Stack.Navigator headerMode={'none'} initialRouteName={'MachupScreen'} screenOptions={{
        ...TransitionPresets.SlideFromRightIOS
    }} >
        <Stack.Screen name={'HomeScreenSetting'} component={HomeScreenSetting} />
        <Stack.Screen name={'MachupScreen'} component={HomeScreen} />
    </Stack.Navigator>
}

export default HomeScreenNavigator

const styles = StyleSheet.create({})
