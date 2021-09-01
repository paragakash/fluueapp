import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View, Image } from 'react-native'
import { Block } from '../components'
import { theme } from '../constants'
import FastImage from 'react-native-fast-image'
import SliderComponent from './Slider/SliderComponent'
import SignUpForm1 from './SignUpForms/SignUpForm1'



const Signup = ({navigation}) => {
    const { width, height } = useWindowDimensions()
    return (
        <Block padding={[20, 0]} color={theme.colors.white}>
            <Block top left flex={false} padding={[height * 0.05, width * 0.1]}  >
                <FastImage
                    style={{ width: 150, height: 150 }}
                    source={require('../Assets/static/Logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Block>
            <SliderComponent navigation={navigation} />
        </Block>
    )
}

export default Signup

const styles = StyleSheet.create({})
