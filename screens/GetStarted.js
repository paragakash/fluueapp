import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Block, Button, Card, Text } from '../components'
import { colors } from '../constants/theme';
import { useDispatch, useSelector } from "react-redux";
import { setuserData, getUsers } from "../store/actions/authAction";
const { width, height } = Dimensions.get('screen');

const GetStarted = ({navigation}) => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <Block middle padding={30} color={colors.white} >
            <Block center middle flex={false} padding={[0,0,0,20]} >
                <Image source={require('../Assets/static/Logo.png')}  />
            </Block>
            <Button color={colors.primary} onPress={() => navigation.navigate('Signup')} margin={[100,0,0,0]} title={'GET STARTED'}></Button>
            <Button color={colors.primary} onPress={() => navigation.navigate('Login')} outline title={'Already a Member? Log in'}></Button>
        </Block>
    )
}

export default GetStarted

const styles = StyleSheet.create({})
