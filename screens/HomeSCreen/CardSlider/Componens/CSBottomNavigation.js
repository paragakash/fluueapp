import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CSBottomNavigation = ({ isbackbtnDisabled, isRejected, isLiked, isSupperLiked, onNextClicked, onBackCliked }) => {
    return (
        <View style={{ backgroundColor: '#effafc', borderWidth: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 20 }}>
            {!isbackbtnDisabled ? <Ionicons onPress={onBackCliked} name="chevron-back" size={30} color={'#333'} /> : null}
            {isRejected ? <Ionicons name="ios-close-outline" size={30} color={'red'} /> : <Ionicons name="ios-close-outline" size={30} color={'#333'} />}
            {isLiked ? <Ionicons name="ios-heart-circles" size={30} color={'#333'} /> : <Ionicons name="ios-heart-circle-outline" size={30} color={'#333'} />}
            {isSupperLiked ? <Ionicons name="ios-heart" size={30} color={'#333'} /> : <Ionicons name="ios-heart-outline" size={30} color={'#333'} />}
            <Ionicons onPress={onNextClicked} name="chevron-forward" size={30} color={'#333'} />
        </View>

    )
}

export default CSBottomNavigation

const styles = StyleSheet.create({})
