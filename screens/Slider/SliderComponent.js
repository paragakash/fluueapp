import React, { useState, useRef, useEffect } from 'react'
import { Animated, BackHandler, TouchableOpacity, FlatList, KeyboardAvoidingView, KeyboardAvoidingViewComponent, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Block, Text } from '../../components';
import { theme } from '../../constants';

import Indicator from './Indicator';
import NextButton from './NextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import SliderItem from './SliderItem';
import { colors, sizes } from '../../constants/theme';

const backgrounds = [
    {
        title: "Secured, forever.",
        description:
            "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
        img: require('../../Assets/slider/slider1.png')
    },
    {
        title: "Encrypted, forever.",
        description:
            "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
        img: require('../../Assets/slider/slider2.png')
    },
    {
        title: "Privacy, forever.",
        description:
            "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
        img: require('../../Assets/slider/slider3.png')
    }
];

const SliderComponent = ({navigation }) => {
   

    const components = ['SignUpForm1', 'SignUpForm2', 'SignUpForm4', 'SignUpForm5', 'SignUpForm6']

    const scrollX = useRef(new Animated.Value(0)).current;
    const sliderRef = useRef()

    const [currentIndex, setcurrentIndex] = useState(0)

    const { width, height } = useWindowDimensions();

    const onViewDimentionChanged = useRef(({ viewableItems }) => {
        console.log("demenstion", viewableItems)
        setcurrentIndex(viewableItems[0].index)
    }).current;


    const scrollTo = () => {
        //console.log(currentIndex," : ", components.length)
        if (currentIndex < components.length - 1) {
            sliderRef.current.scrollToIndex({ index: currentIndex + 1 })
        }
    }


    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const onBackHandler = () => {
        try {
            sliderRef.current.scrollToIndex({ index: currentIndex - 1 })
        }
        catch (err) { }
    }

    console.log("currnt Index", currentIndex)

    return (
        <KeyboardAwareScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.1, paddingVertical: height * 0.02 }} >
                <Text black title uppercase >Set up Your Profile</Text>
                <Indicator data={components} scrollX={scrollX} width={width} />
            </View>
            <Block center middle >
                <Block>
                    <FlatList data={components}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        scrollEnabled={false}
                        bounces={false}
                        keyExtractor={(item, index) => `items-${index}`}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                        onViewableItemsChanged={onViewDimentionChanged}
                        viewabilityConfig={viewConfig}
                        ref={sliderRef}
                        renderItem={({ item, index }) => {
                            const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0],
                                extrapolate: 'clamp'
                            })
                            return <Animated.View style={{ opacity }}><SliderItem name={item} index={index} /></Animated.View>
                        }} />
                </Block>
            </Block>
            <Block flex={false} row center margin={[height * 0.01, width * 0.1]} >
                <Block row>
                    <Icon name={'ios-arrow-back-circle'} size={30} color={'grey'} onPress={() => onBackHandler()} style={[styles.button, currentIndex == 0 ? { display: "none" } : null]} />
                </Block>
                <Block>
                    {
                        // currentIndex == components.length -1 ? : null
                    }
                </Block>
                <Block row right >
                    {
                        currentIndex < components.length - 1 ? <NextButton percentage={(currentIndex + 1) * (100 / components.length)} scrollTo={scrollTo} /> : <TouchableOpacity onPress={()=>navigation.navigate('App')} >
                            <View style={{ backgroundColor: colors.blue, padding: 10, width:140,borderRadius:5 }}><Text white title uppercase >Go To Home</Text></View>
                        </TouchableOpacity>
                    }
                </Block>
            </Block>
        </KeyboardAwareScrollView>


    )
}

export default SliderComponent

const styles = StyleSheet.create({})
