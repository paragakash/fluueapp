import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { MainNavigator } from './navigation/MainNavigator'
import { Provider, useStore } from 'react-redux';
import { store } from './store/store'
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  const [changeStatusbar, setchangeStatusbar] = useState(false)

  useEffect(() => {
    SplashScreen.hide()
    setchangeStatusbar(true)
  }, [changeStatusbar])

  return <Provider store={store}>
    {changeStatusbar && <StatusBar barStyle={'dark-content'} translucent backgroundColor="transparent" />}
    <MainNavigator />
  </Provider>
}

export default App

const styles = StyleSheet.create({})
