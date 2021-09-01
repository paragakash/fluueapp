import React, { useEffect } from 'react'
import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import CardSlider from './CardSlider'
import HomeScreenHeader from './Components/HomeScreenHeader'

const HomeScreen = ({navigation}) => {

    useEffect(() => {
        // setTimeout(() => {
        //     navigation.navigate('HomeScreenSetting')
        // }, 3000);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <HomeScreenHeader  navigation={navigation} />
                <CardSlider navigation={navigation} />
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
