import React from 'react'
import { StyleSheet, Text, View, Animated, useWindowDimensions } from 'react-native'
import { Block } from '../../components';
import { theme } from '../../constants';
import { colors } from '../../constants/theme';


export default Indicator = ({ data, scrollX }) => {
    
    const { width } = useWindowDimensions();
   
    return (
        <Block flex={false} row >
            {
                data.map((_, i) => {
                    const inputRange = [(i - 1) * theme.sizes.width, i * theme.sizes.width, (i + 1) * theme.sizes.width]
                    const width=scrollX.interpolate({
                        inputRange,
                        outputRange:[5,20,5],
                        extrapolate:'clamp' 
                    })
                    const opacity=scrollX.interpolate({
                        inputRange,
                        outputRange:[0.3,1,0.3],
                        extrapolate:'clamp' 
                    })

                    return <Animated.View style={[styles.dot, { width,opacity }]} key={i.toString()} />
                })
            }
        </Block>
    )
}

const styles = StyleSheet.create({
    dot: {
        marginHorizontal:2,
        height: 5,
        borderRadius: 5,
        backgroundColor: colors.black
    }
})
