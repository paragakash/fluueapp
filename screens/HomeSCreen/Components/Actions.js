import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Actions = () => {
    return (
        <View style={{ backgroundColor: '#effafc'  ,borderWidth: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',paddingHorizontal:50,paddingVertical:20 }}>
            <Icon name="ios-close-outline" size={30} color={'#333'} />
            <Icon name="ios-heart-circle-outline" size={30} color={'#333'} />
            {/* <Icon name="ios-heart-circles" size={30} color={'#333'} /> */}
            <Icon name="ios-heart-outline" size={30} color={'#333'} />
            {/* <Icon name="ios-heart" size={30} color={'#333'} /> */}
            <Icon name="chevron-forward" size={30} color={'#333'} />
        </View>

    )
}

export default Actions

const styles = StyleSheet.create({})
