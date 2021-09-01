import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import {  fonts,colors,  fontss, sizes } from '../../constants/theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
//import mapData from '../WorldMap'
//import CustomLabel from './CustomLabel';
import { beliefs, educations, ethics, relationships, zodiacSigns } from '../../constants/StaticData';
//import { Slider } from "@miblanchard/react-native-slider";
import CustomeSlider from './RangeSlider/CustomeSlider';

const HomeScreenSetting = ({ navigation }) => {

    const [multiSliderValue, setMultiSliderValue] = React.useState([1825]);

    const [sliderValue, setsliderValue] = useState(0.2)

    const [searchCriteria, setsearchCriteria] = useState({
        drinker: 0,
        agegrp: [18, 25]
    })

    const multiSliderValueCallback = (values) => {
        console.log(values[0], " ", values[1])
        setsearchCriteria({ ...searchCriteria, agegrp: [values[0], values[1]] })
        setMultiSliderValue(values)
    }

    return (
        <View style={[styles.flex, { paddingHorizontal: sizes.width * 0.05, paddingVertical: sizes.height * 0.05 }]}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()} ><Ionicons name={'ios-arrow-back'} size={35} color={'black'} /></Pressable>
                <Text style={[{ marginHorizontal: 10,color:'#333',fontSize:35 }]}>Settings</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <View>
                    <Text style={[fonts.h3,{color:colors.black}]}>How your partner sholuld be..</Text>
                </View>
                <ScrollView scrollEnabled style={{ display: 'flex', height: sizes.height * 0.75, marginTop: 20 }}>
                    <View style={{}}>
                        <Text style={[fonts.h4,{color:colors.black}]}> Age </Text>
                        <View style={{paddingTop:10}}>
                            <CustomeSlider
                                min={18}
                                max={40}
                                LRpadding={40}
                                callback={multiSliderValueCallback}
                                single={false}
                                defalutgrup={searchCriteria.agegrp}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Distance </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '15' })}>{searchCriteria.distanceInkm == '15' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> 15km </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '25' })}>{searchCriteria.distanceInkm == '25' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> 25km </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '50' })}>{searchCriteria.distanceInkm == '50' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> 50km </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '100' })}>{searchCriteria.distanceInkm == '100' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> 100km </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: 'Any' })}>{searchCriteria.distanceInkm == 'Any' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Any </Text></Pressable>
                        </View>
                        {/* <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={['item1', 'item2', 'item3', 'item4']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }} />
                            <ModalDropdown options={['All', 'between 25km', 'between 50km', 'between 100km', 'In Area', 'In City', 'In State']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width *0.91, marginTop: -20, marginLeft:-sizes.width *0.34 }} />
                            <ModalDropdown options={['All', 'between 25km', 'between 50km', 'between 100km', 'In Area', 'In City', 'In State']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginRight: -sizes.width * 0.04  }} />
                        </View> */}
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Education</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={educations} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }} textStyle={{color:colors.black}} />
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Zodiac Sign</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={zodiacSigns.map(item => item.title)} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }} textStyle={{color:colors.black}} />
                        </View>
                    </View>

                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Ethics</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={ethics} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }}  textStyle={{color:colors.black}} />
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Relationships Type</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={relationships} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }}  textStyle={{color:colors.black}} />
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Food Preference</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 0 })}>{searchCriteria.vegNonveg == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Veg </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 1 })}>{searchCriteria.vegNonveg == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Non-Veg </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 2 })}>{searchCriteria.vegNonveg == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Vegan </Text></Pressable>
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Smoker</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 0 })}>{searchCriteria.smoker == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> No </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 1 })}>{searchCriteria.smoker == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Yes </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 2 })}>{searchCriteria.smoker == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Sometime </Text></Pressable>
                        </View>

                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Drinker</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 0 })}>{searchCriteria.drinker == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> No </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 1 })}>{searchCriteria.drinker == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Yes </Text></Pressable>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 2 })}>{searchCriteria.drinker == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text style={{color:colors.black}}> Sometime </Text></Pressable>
                        </View>
                    </View>
                    <View>
                        <Text style={[fonts.h4,{color:colors.black}]}> Religious Beliefs</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={beliefs} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }}  textStyle={{color:colors.black}} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreenSetting

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row'
    },
})
