import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderItem from './SliderItem';
import { colors } from '../../../constants/theme'


const CustomeSlider = ({ max, min, single, LRpadding, callback,defalutgrup }) => {

    const [state, setstate] = useState({
        multiSliderValue: [min, max],
        first: min,
        second: max,
    })


    const multiSliderValuesChange = values => {
        if (single) {
            setstate({
                ...state,
                second: values[0],
            })
        } else {
            setstate({
                ...state,
                multiSliderValue: values,
                first: values[0],
                second: values[1],
            })
        }
        callback(values)
    }

    const renderScale = () => {
        const items = [];
        for (let i = min; i <= max; i++) {
            items.push(
                <SliderItem
                    key={i}
                    value={i}
                    first={state.first}
                    second={state.second}
                />
            );
            i = Math.ceil(i + 2.5);
        }
        return items;
    }

    return (
        <View>
            <View style={[styles.column, {}]}>
                {/* {renderScale()} */}
               <Text style={{color:'#333'}} >{state.multiSliderValue[0]}</Text>
               <Text style={{color:'#333'}} >{state.multiSliderValue[1]}</Text>
            </View>
            <View style={styles.container}>

                <MultiSlider
                    trackStyle={{ backgroundColor: '#bdc3c7' }}
                    selectedStyle={{ backgroundColor: "#5e5e5e" }}
                    values={single ?
                        [state.multiSliderValue[1]] :
                        [state.multiSliderValue[0], state.multiSliderValue[1]]}
                    sliderLength={Dimensions.get('window').width - LRpadding * 3}
                    onValuesChange={multiSliderValuesChange}
                    min={min}
                    max={max}
                    enabledTwo
                    values={defalutgrup}
                    //customLabel={(e)=><View><Text>{e.oneMarkerValue}</Text></View>}
                  
                    allowOverlap={false}
                    markerStyle={{
                        backgroundColor: colors.blue
                    }}
                //customMarker={CustomMarker}
                />
            </View>
        </View>
    )
}

export default CustomeSlider

const styles = StyleSheet.create({
    container: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       paddingLeft:5,
        //borderWidth:1
    },
    column: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
    },
    active: {
        textAlign: 'center',
        fontSize:12,
        color: '#5e5e5e',
    },
    inactive: {
        textAlign: 'center',
        color: '#bdc3c7',
        fontSize:12,
    },
    line: {
        textAlign: 'center',
    }
});
