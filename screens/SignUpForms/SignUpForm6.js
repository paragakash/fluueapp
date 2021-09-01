import React, { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Pressable } from 'react-native'
import { Block, Text } from '../../components'
import { SIZES, FONTS, colors, sizes, fonts } from '../../constants/theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
//import CustomeSlider from './RangeSlider/CustomeSlider';
import { educations, ethics, relationships, zodiacSigns,beliefs } from '../../constants/StaticData';
import CustomeSlider from '../HomeSCreen/RangeSlider/CustomeSlider';

const SignUpForm6 = () => {

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
        <Block >
            <Block flex={0.4}>
                <Block flex={false} row   >
                    <Text caption uppercase >Questionnaire</Text>
                </Block>
                <Block flex={false} row   >
                    <ScrollView scrollEnabled nestedScrollEnabled style={{ display: 'flex', height: sizes.height * 0.5, marginTop: 20,marginBottom:10 }}>
                        <View style={{}}>
                            <Text style={fonts.h4}> Age </Text>
                            <View style={{marginTop:10,paddingHorizontal:10}}>
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
                            <Text style={fonts.h4}> Distance </Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '15' })}>{searchCriteria.distanceInkm == '15' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> 15km </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '25' })}>{searchCriteria.distanceInkm == '25' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> 25km </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '50' })}>{searchCriteria.distanceInkm == '50' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> 50km </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: '100' })}>{searchCriteria.distanceInkm == '100' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> 100km </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, distanceInkm: 'Any' })}>{searchCriteria.distanceInkm == 'Any' ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Any </Text></Pressable>
                            </View>
                            {/* <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                            <ModalDropdown options={['item1', 'item2', 'item3', 'item4']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }} />
                            <ModalDropdown options={['All', 'between 25km', 'between 50km', 'between 100km', 'In Area', 'In City', 'In State']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width *0.91, marginTop: -20, marginLeft:-sizes.width *0.34 }} />
                            <ModalDropdown options={['All', 'between 25km', 'between 50km', 'between 100km', 'In Area', 'In City', 'In State']} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginRight: -sizes.width * 0.04  }} />
                        </View> */}
                        </View>
                       
                        <View>
                            <Text style={fonts.h4}> Zodiac Sign</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <ModalDropdown options={zodiacSigns.map(item => item.title)} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.80, marginTop: -20, marginLeft: -15 }} dropdownTextStyle={{backgroundColor:colors.white2}} textStyle={{color:colors.black,width:'100%'}}  />
                            </View>
                        </View>

                        <View>
                            <Text style={fonts.h4}> Ethics</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <ModalDropdown options={ethics} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.80, marginTop: -20, marginLeft: -15 }} dropdownTextStyle={{backgroundColor:colors.white2}} textStyle={{color:colors.black,width:'100%'}} />
                            </View>
                        </View>

                        <View>
                            <Text style={fonts.h4}> Relationship</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <ModalDropdown options={relationships} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.80, marginTop: -20, marginLeft: -15 }} dropdownTextStyle={{backgroundColor:colors.white2}} textStyle={{color:colors.black,width:'100%'}} />
                            </View>
                        </View>
                      
                        <View>
                            <Text style={fonts.h4}> Food Preference</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 0 })}>{searchCriteria.vegNonveg == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Veg </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 1 })}>{searchCriteria.vegNonveg == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Non-Veg </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, vegNonveg: 2 })}>{searchCriteria.vegNonveg == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Vegan </Text></Pressable>
                            </View>
                        </View>
                        <View>
                            <Text style={fonts.h4}> Smoker</Text>

                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 0 })}>{searchCriteria.smoker == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> No </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 1 })}>{searchCriteria.smoker == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Yes </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, smoker: 2 })}>{searchCriteria.smoker == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Sometime </Text></Pressable>
                            </View>

                        </View>
                        <View>
                            <Text style={fonts.h4}> Drinker</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 0 })}>{searchCriteria.drinker == 0 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> No </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 1 })}>{searchCriteria.drinker == 1 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Yes </Text></Pressable>
                                <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => setsearchCriteria({ ...searchCriteria, drinker: 2 })}>{searchCriteria.drinker == 2 ? <Ionicons name={'ios-checkmark-circle'} size={24} color={colors.blue} /> : <Ionicons name={'ios-checkmark-circle'} size={20} color={'lightgrey'} />}<Text> Sometime </Text></Pressable>
                            </View>
                        </View>
                        <View>
                            <Text style={fonts.h4}> Religious Beliefs</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <ModalDropdown options={beliefs} style={{ flex: 1, borderWidth: 0.3, padding: 15, borderRadius: 1 }} dropdownStyle={{ width: sizes.width * 0.91, marginTop: -20, marginLeft: -15 }} textStyle={{color:colors.black,width:'100%'}} />
                            </View>
                        </View>
                    </ScrollView>
                </Block>
            </Block>

        </Block>
    )
}

export default SignUpForm6

const styles = StyleSheet.create({})
