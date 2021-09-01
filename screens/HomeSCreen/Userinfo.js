import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, ScrollView, StatusBar, SafeAreaView, FlatList, Animated } from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
//import RadialGradient from 'react-native-radial-gradient';
import theme, { colors, fonts } from '../../constants/theme'
//import { BoxShadow } from 'react-native-shadow'
//import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import UserProfilespics from './UserProfilespics';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
//import MaskedView from '@react-native-community/masked-view';


const { width, height } = Dimensions.get('screen')

const shadowOpt = {
    width: 350,
    height: 95,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.1,
    x: 0,
    y: 0,
    style: { marginVertical: 5 }

}


const data = [
    {
        title: 'Afro vibes',
        location: 'Ambernath, Maharshtra,India',
        dob: 'Nov 17th, 2020',
        status: 0,
        coords: {
            "latitude": "19.20900000",
            "longitude": "73.18600000"
        },
        poster:
            'https://images.unsplash.com/photo-1580286923998-09fb88152cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',

    },
    {
        title: 'Jungle Party',
        location: 'Ulhasnagar,Maharshtra,India',
        dob: 'Sept 3rd, 2020',
        status: 0,
        coords: {
            "latitude": "19.21667000",
            "longitude": "73.15000000"
        },
        poster:
            'https://images.unsplash.com/photo-1610992235683-e39d69f54d20?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8NzIwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        title: '4th Of July',
        location: 'Thane,Maharshtra,India',
        dob: 'Oct 11th, 2020',
        status: 0,
        coords: {
            "latitude": "19.33333000",
            "longitude": "73.25000000"
        },
        poster:
            'https://images.unsplash.com/photo-1613989668327-fc08ea519c09?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8NzIwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        title: 'Summer festival',
        location: 'Delhi,India',
        dob: 'Aug 17th, 2020',
        status: 0,
        coords: {
            "latitude": "28.65195000",
            "longitude": "77.23149000"
        },
        poster:
            'https://images.unsplash.com/photo-1600251215707-95bb01c73f51?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fDcyMHB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        title: 'BBQ with friends',
        location: 'Nagapur,Maharshtra,India',
        dob: 'Sept 11th, 2020',
        status: 0,
        coords: {
            "latitude": "21.14631000",
            "longitude": "79.08491000"
        },
        poster:
            'https://images.unsplash.com/photo-1597281362711-7004802c6881?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fDcyMHB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        title: 'Festival music',
        location: 'Vadodara,Gujrat,India',
        dob: 'Apr 21th, 2021',
        status: 0,
        coords: {
            "latitude": "22.29941000",
            "longitude": "73.20812000"
        },
        poster:
            'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fDcyMHB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        title: 'Beach House',
        location: 'Goa,India',
        dob: 'Aug 12th, 2020',
        status: 0,
        coords: {
            "latitude": "15.59337000",
            "longitude": "73.87482000"
        },
        poster:
            'https://images.unsplash.com/photo-1517686668014-1740ede39ecb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fDcyMHB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
]




const Userinfo = ({ navigation, route }) => {


    console.log('paras', route.params)

    const userData = route.params.user;

    const Card = ({ title, children }) => {
        return <View style={{ display: 'flex', paddingHorizontal: 20, marginVertical: 10 }}>
            <View style={{ display: 'flex', marginBottom: -15, zIndex: 1, alignSelf: 'center', }}>
                <Text style={{ textTransform: 'capitalize', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: colors.black, color: colors.white, textAlign: 'center', borderRadius: 50 }}>
                    {title}
                </Text>
            </View>
            <View style={{ display: 'flex', padding: 30, borderRadius: 5, flexDirection: 'column', backgroundColor: colors.white }}>
                {children}
            </View>
        </View>
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={{ flex: 1, position: 'relative' }} >
                <View style={{ flex: 1 }}>
                    <UserProfilespics data={data} />
                </View>
            </View>

            <ScrollView style={{ flex: 1, padding: 5 }}>

                <View style={{ flex: 0.1, alignItems: 'center', paddingTop: 5, paddingHorizontal: 20, paddingTop: 5, paddingBottom: 10 }}>
                    {/* <BoxShadow setting={shadowOpt}> */}
                    <View style={{ flexDirection: 'row', borderWidth: 0, padding: 5, backgroundColor: '#fff', borderRadius: 5 }} >
                        <View style={{ flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                            <Text style={[fonts.h2, { color: colors.black }]}>28</Text>
                            <Text style={{ color: colors.gray, marginTop: 5 }}>Age</Text>
                        </View>
                        <View style={{ borderLeftWidth: 0.3, borderLeftColor: 'lightgrey', flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                            <Text style={[fonts.h2, { color: colors.black }]}>S</Text>
                            <Text style={{ color: colors.gray, marginTop: 5 }}>Status</Text>
                        </View>
                        <View style={{ borderLeftWidth: 0.3, borderLeftColor: 'lightgrey', flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                            <Text style={[fonts.h2, { color: colors.black }]}>73%</Text>
                            <Text style={{ color: colors.gray, marginTop: 5 }}>Matches</Text>
                        </View>
                    </View>
                    {/* </BoxShadow> */}
                </View>

                <Card title={'Basic'}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.3, borderBottomColor: colors.grey }} >
                        {/* <FontAwesome name={'user'} size={20} color={'#333'} /> */}
                        <AntDesign name={'user'} size={20} color={'#333'} />
                        <View style={{ marginLeft: 15, width: '85%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[{ color: '#000' }]}>jhon abcd D.</Text>
                                <Text style={[{ color: '#000' }]}>1 march 1998</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.3, borderBottomColor: colors.grey }} >

                        <Entypo name={'graduation-cap'} size={20} color={'#333'} />
                        <View style={{ marginLeft: 15, width: '85%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[{ color: '#000' }]}>B.Sc. I.T.</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }} >
                        <MaterialIcons name={'work'} size={20} color={'#333'} />
                        <View style={{ marginLeft: 15, width: '85%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[{ color: '#000' }]}>Infosysy</Text>
                                <Text style={[{ color: '#000' }]}>Developer</Text>
                            </View>
                        </View>
                    </View>
                </Card>


                <Card title={'Interested'}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                                <View style={{ width: 80, height: 80, borderRadius: 1, borderWidth: 0.1, padding: 5, marginHorizontal: 5 }} >
                                    <ImageBackground source={require('../../Assets/images/Styles/casual.png')} resizeMode={'contain'} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                                    </ImageBackground>
                                </View>
                                <View style={{ width: 80, height: 80, borderRadius: 1, borderWidth: 0.1, padding: 5, marginHorizontal: 5 }} >
                                    <ImageBackground source={require('../../Assets/images/Styles/dancer.png')} resizeMode={'contain'} style={{ width: '100%', height: '100%' }} >
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Stylish & Casual</Text>
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={fonts.largeTitle}>Bike Riding</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Prefred Date</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: '120%', height: 200, borderRadius: 5, borderWidth: 0.1, overflow: 'hidden' }} >
                                    <ImageBackground source={require('../../Assets/images/Nights/watchingTv.jpg')} resizeMode={'stretch'} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                            <Text style={[fonts.h1, { color: colors.white2 }]}>Watching TV</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Prefred Night</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={fonts.h1}>Mountains </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Travel </Text>
                            </View>

                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[fonts.h1, { color: 'green' }]}>Veg</Text>
                                <Text style={[fonts.h1]}> & </Text>
                                <Text style={[fonts.h1, { color: 'red' }]}>Nonvege</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[fonts.h4, { color: colors.gray }]}>Sweet</Text>
                                <Text style={[fonts.h4]}> & </Text>
                                <Text style={[fonts.h4, { color: colors.gray }]}>Spicy</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Food Preference </Text>
                            </View>
                        </View>
                    </View>
                </Card>


                <Card title={'Hohhiess & Habits'}>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                            <Text style={{}} >Hobbies</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[{ marginHorizontal: 5, backgroundColor: colors.blue, color: colors.white, borderWidth: 0.5, borderColor: colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 2 }]}>Singing</Text>
                            <Text style={[{ marginHorizontal: 5, backgroundColor: colors.blue, color: colors.white, borderWidth: 0.5, borderColor: colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 2 }]}>Dansing</Text>
                            <Text style={[{ marginHorizontal: 5, backgroundColor: colors.blue, color: colors.white, borderWidth: 0.5, borderColor: colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 2 }]}>Traveling</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                            <Text style={{}} >Mood</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[fonts.largeTitle, { textTransform: 'uppercase', color: 'lightgrey' }]}>Confused</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                            <Text style={{}} >Beliefs</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: 80, height: 80, borderRadius: 1, borderWidth: 0.1, padding: 5, marginHorizontal: 5 }} >
                                <ImageBackground source={require('../../Assets/images/beleifs/yoga.png')} resizeMode={'contain'} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </Card>





                {/* <Shadow
                            style={{
                                borderRadius: 10,
                                shadowOpacity: 0.1,
                                shadowColor: 'black',
                                shadowRadius: 10,
                                backgroundColor: '#fff',
                                width: 300,
                                height: 80,
                                margin: 20
                            }}
                        /> */}



            </ScrollView>
            <View style={{ position: 'absolute', bottom: 20,right:20, width: '100%' }}>
                <View style={{ alignSelf:'flex-end',paddingVertical: 10, paddingHorizontal: 30, borderRadius:50 ,backgroundColor: colors.blue }}>
                    <Text style={[fonts.h2, { color: colors.white }]}>Start Chat</Text>
                </View>
            </View>

        </View >
    )
}

export default Userinfo

const styles = StyleSheet.create({

})
