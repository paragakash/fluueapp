import React, { useEffect, useState, useRef } from 'react'
import { Dimensions, Image, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Pressable, Keyboard } from 'react-native'

import { Block, Button, Card, Input, OtpInput, Text } from '../components'

//import RNOtpVerify from 'react-native-otp-verify/';

import { theme } from '../constants';
import { countries } from 'country-data-list'
//import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Auth } from '../services/'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";


const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
    //console.log(Object.values(countries).filter((v, i) => i !== 0).filter((item, pos, self) => self.findIndex((v) => v.alpha2 == item.alpha2) == pos))
    //console.log(Object.values(countries).filter((v, i) => i !== 0).filter((item, pos, self) => self.findIndex((v) => v.alpha2 == item.alpha2) == pos).map(v => { return { emoji: v.emoji, code: v.countryCallingCodes[0], name: v.name, shortCode: v.alpha3 } }).filter(v => v.emoji !== undefined && v.emoji !== "" && v.code !== undefined && v.code !== ""))

    const [openModel, setopenModel] = useState(false)
    const [scrollOffset, setscrollOffset] = useState(null)
    const [countriesData, setcountries] = useState(countries && Object.values(countries).filter((v, i) => i !== 0).filter((item, pos, self) => self.findIndex((v) => v.alpha2 == item.alpha2) == pos).map(v => { return { emoji: v.emoji, code: v.countryCallingCodes[0], name: v.name, shortCode: v.alpha3 } }).filter(v => v.emoji !== undefined && v.emoji !== "" && v.code !== undefined && v.code !== ""))
    const [selectedCode, setselectedCode] = useState('+91')
    const [confirm, setConfirm] = useState(null)
    const [codeArr, setCodeArr] = useState([])
    const [number, setNumber] = useState('')
    const code = codeArr.join("")


    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const scroller = useRef()
    const toggleModakl = () => {
        setopenModel(!openModel)
        setcountries(countries && Object.values(countries).filter((v, i) => i !== 0).filter((item, pos, self) => self.findIndex((v) => v.alpha2 == item.alpha2) == pos).map(v => { return { emoji: v.emoji, code: v.countryCallingCodes[0], name: v.name, shortCode: v.alpha3 } }).filter(v => v.emoji !== undefined && v.emoji !== "" && v.code !== undefined && v.code !== ""))
    }

    const handleScrollTo = p => {
        if (scroller.current) {
            scroller.current.scrollTo(p);
        }
    };

    useEffect(() => {
        // getHash()
        // startListeningForOtp()
        dispatch(getUsers())
    })


    // const getHash = () =>
    //     RNOtpVerify.getHash()
    //         .then(console.log)
    //         .catch(console.log);

    // const startListeningForOtp = () => {
    //     RNOtpVerify.getOtp()
    //         .then(p => RNOtpVerify.addListener(otpHandler))
    //         .catch(p => console.log(p));
    // }

    // const otpHandler = (message) => {
    //     console.log(message);
    //     const otp = /(\d{6})/g.exec(message)[1];
    //     console.log(otp);
    //     //this.setState({ otp });
    //     RNOtpVerify.removeListener();
    //     // Keyboard.dismiss();
    // }

    const handleCode = (e, index) => {
        const codeArray = [...code];
        codeArray[index] = e;
        setCodeArr(codeArray)
    }


    const onSearch = (e) => {
        console.log(e)
        if (e?.length > 0) {
            let result = countriesData.filter(v => v.name.toLowerCase().includes(e.toLowerCase()) || v.code.includes(e))
            setcountries(result)
        }
        else setcountries(countries && Object.values(countries).filter((v, i) => i !== 0).filter((item, pos, self) => self.findIndex((v) => v.alpha2 == item.alpha2) == pos).map(v => { return { emoji: v.emoji, code: v.countryCallingCodes[0], name: v.name, shortCode: v.alpha3 } }).filter(v => v.emoji !== undefined && v.emoji !== "" && v.code !== undefined && v.code !== ""))
    }


    const handleSetCode = (item) => {
        setselectedCode(item.code)
        toggleModakl()
    }


    const _sendOtp = () => {
        Auth.sendOtp(selectedCode + number)
            .then(confirmation => setConfirm(confirmation))
    }


    const renderModel2 = () => {
        return <Modal
            //testID={'modal'}
            isVisible={openModel}
            //onSwipeComplete={this.close}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={100}
            animationInTiming={300}
            propagateSwipe={true}
            hideModalContentWhileAnimating
            avoidKeyboard
            useNativeDriver
            useNativeDriverForBackdrop
            animationIn={'slideInUp'}
            style={styles.modal}>
            <Pressable onPress={() => toggleModakl()}>
                <Block flex={false} center middle row padding={[5, 5]}>
                    <Icon name={'ios-close-circle-sharp'} size={40} color={'#fff'} />
                </Block>
            </Pressable>
            <View style={styles.scrollableModal}>
                <Block flex={false} row center padding={[10, 30]}>
                    {/* <Block color={theme.colors.grey2} row center >
                        <Input onChangeText={(e) => onSearch(e)} placeholder={'Search Your Country'} style={{ fontSize: 20 }} />
                    </Block>
                    <Block>
                        <Icon name="ios-search" size={30} color={theme.colors.gray} />
                    </Block> */}
                    <Block row>
                        <Block >
                            <Input onChangeText={(e) => onSearch(e)} placeholder={'Search Your Country'} style={{ fontSize: 20 }} />
                        </Block>
                        <Block middle padding={[0, 10]} flex={false}   >
                            <Icon name="ios-search" size={30} color={theme.colors.gray} />
                        </Block>
                    </Block>
                </Block>
                <FlatList
                    data={countriesData && countriesData}
                    keyExtractor={(item, i) => `country${i}`}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => handleSetCode(item)}>
                            <Block flex={false} row padding={[10, 30]} border >
                                <Block flex={1} row>
                                    <Text h2 style={{ marginRight: 10 }} >{item.emoji}</Text>
                                    <Text h2 style={{ marginRight: 10 }} >{item.name}({item.shortCode})</Text>
                                </Block>
                                <Text style={{ backgroundColor: '#fff' }} h2>{item.code}</Text>
                            </Block>
                        </TouchableOpacity>}
                />
            </View>
        </Modal>
    }


    return (
        <>
        
            {openModel && renderModel2()}
            <Block top center flex={false} padding={[height * 0.05, width * 0.02]} color={theme.colors.white} >
                <Pressable >
                    <Image source={require('../Assets/static/Logo.png')} style={{ marginLeft: '4%' }} />
                </Pressable>
            </Block>
            <Block  padding={[0, width * 0.05]} color={theme.colors.white}>
                <Block row color={theme.colors.grey} flex={false}  margin={[height * 0.1, 0, 0, 0]} style={{ borderRadius: 10, overflow: 'hidden' }}  >
                    <Block middle padding={[0, 10]} color={theme.colors.secondary} flex={false}  >
                        <Pressable onPress={() => toggleModakl()}>
                            <Text color={theme.colors.black} title bold>{selectedCode}</Text>
                        </Pressable>
                    </Block>
                    <Block color={theme.colors.secondary} >
                        <Input editable={false} onChangeText={e => setNumber(e)}  maxLength={10} placeholder="Enter Your Phone Number" number style={{ paddingLeft: 10 }} />
                    </Block>
                    <Block middle color={theme.colors.primary} flex={false} border  >
                        <Pressable style={{ paddingHorizontal: 20 }} onPress={() => _sendOtp(number)}>
                            <Icon name={'ios-send'} size={24} color={theme.colors.white} />
                        </Pressable>
                    </Block>
                </Block>

                {/* OTP Screen */}
                {/* <Block center color={theme.colors.grey} flex={false} margin={[height * 0.1, 0, 0, 0]}   >
                    <Block row flex={false} margin={[10, 0]}>
                        <Text>Enter OTP</Text>
                    </Block>
                    <Block row flex={false} >
                        <OtpInput
                            onChangeText={(e, index) => handleCode(e, index)}
                            value={codeArr}
                            noOfInput={6}
                        />
                    </Block>
                </Block>
                <Block>
                    <Button color={theme.colors.primary} onPress={() => Auth.confirmCode(confirm, code)} title={'verify'}></Button>
                </Block> */}

                <View style={{ width: '100%', height: 2, backgroundColor: theme.colors.primary, position: 'relative', marginVertical: height * 0.03 }}>
                    <Text style={{ position: 'absolute', top: -10, left: width * 0.5 - 40, paddingHorizontal: 10, backgroundColor: '#fff', color: theme.colors.primary }} >OR</Text>
                </View>
                <Block row middle flex={false} >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => Auth.googleLogin()}>
                            <Image source={require('../Assets/static/googleLogo.png')} style={{ width: 30, height: 30 }} />
                        </Pressable>
                        <Pressable onPress={() => Auth.facebookSignIn()}>
                            <Image source={require('../Assets/static/facebookLogo.png')} style={{ width: 30, height: 30, marginHorizontal: 20 }} />
                        </Pressable>
                        <Image source={require('../Assets/static/instagramLogo.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </Block>
            </Block>
            <Block color={theme.colors.white} center bottom  padding={[0, 0, height * 0.05, 0]}>
                <Text color={theme.colors.primary} >Already a Member? Log in</Text>
            </Block>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 400,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: theme.colors.white,
    },
    scrollableModalContent1: {
        height: 200,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
    },
    scrollableModalContent2: {
        height: 200,
        backgroundColor: '#A9DCD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText2: {
        fontSize: 20,
        color: 'white',
    },
})

