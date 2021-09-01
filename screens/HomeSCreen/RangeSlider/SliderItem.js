import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';


const SliderItem = ({ value, first, second }) => {

    const checkActive = () => {
        if (value >= first && value <= second)
            return true
        else
            return false
    }

    return (
        <View>
            <Text style={[checkActive() ? styles.active : styles.inactive]}>{value}</Text>
            <Text style={[checkActive() ? styles.line : {}]}> {checkActive() ? '|' : ''}</Text>
        </View>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    active:{
        textAlign: 'center',
        fontWeight:'bold',
        bottom:10,
        color:'#5e5e5e',
    },
    inactive:{
        flex:1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        fontSize:10,
        textAlign: 'center',
    }
});