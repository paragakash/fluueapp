import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { Svg, Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { Block } from '../../components';
import { theme } from '../../constants';

const NextButton = ({ percentage, scrollTo }) => {

    const size = 40;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;


    //const progressAnimation = useRef(new Animated.Value(0));
    const [progressBarValue, setprogressBarValue] = useState(new Animated.Value(0))
    const progressRef = useRef(null)


    const animation = (toValue) => {
        return Animated.timing(progressBarValue, {
            toValue,
            duration: 100,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        if (percentage) {
            animation(percentage)
        }
    }, [percentage])


    useEffect(() => {
        progressBarValue.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        }, [percentage]);
        return () => {
            progressBarValue.removeAllListeners();
        }
    }, [])


    //strokeDashoffset={circumference - (circumference * 30) / 100}
    return (
        <TouchableOpacity onPress={scrollTo} activeOpacity={0.6} >
            <Block row flex={false} center middle style={{position:'relative'}} >
                <Svg width={size} height={size} >
                    <G rotation="-90" origin={center}>
                        <Circle stroke="#e6e7e8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                        <Circle ref={progressRef} stroke="black" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={circumference} />
                    </G>
                </Svg>
                <Icon name={'ios-arrow-forward-circle'} size={30} color={theme.colors.primary} style={styles.button} />
            </Block>
        </TouchableOpacity>
    )
}

export default NextButton

const styles = StyleSheet.create({
    button:{
        position:'absolute'
    }
})
