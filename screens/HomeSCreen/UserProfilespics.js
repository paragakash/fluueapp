import React from 'react'
import { StyleSheet, Text, View, Animated, Image, Dimensions } from 'react-native'
import theme, { colors, fonts, sizes } from '../../constants/theme'

const { width, height } = Dimensions.get('screen')

const SPACING = 10;
const ITEM_SIZE = width * 0.7;
const BACKDDROP_HEIGT = height * 0.6;
const _scrollX = new Animated.Value(0)

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

const UserProfilespics = () => {
    return (
        <View>


            <Animated.FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingRight: sizes.width - ITEM_SIZE - SPACING,
                    marginLeft: sizes.width / 2 - ITEM_SIZE / 2 - SPACING * .02,
                }}
                bounces
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
                    { useNativeDriver: true },
                )}
                //onScrollBeginDrag={(e)=>setstate(Math.floor(e.nativeEvent.contentOffset.x))}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE
                    ]
                    const translateY = _scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -20, 0]
                    })
                    const opacity = _scrollX.interpolate({
                        inputRange,
                        outputRange: [0.7, 1, 0.7]
                    })

                    return (
                        <View key={`item-${item.title}`} style={{ width: ITEM_SIZE, height: '85%', display: 'flex', justifyContent: 'flex-end', marginTop: 80 }}>
                            <Animated.View style={{
                                marginHorizontal: SPACING,
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                transform: [{ translateY }],
                                opacity,

                            }}>
                                <Image source={{ uri: item.poster }} style={styles.posterImg} resizeMode={'cover'} />
                            </Animated.View>
                        </View>
                    )
                }}
            />
            <View style={{ position: 'absolute', bottom: height * .03, width: sizes.width }}>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={[fonts.largeTitle, { color: colors.white }]}>Jhon Dev</Text>
                    <Text style={{ fontSize: 12, color: colors.white }}>Mumbai, India </Text>
                </View>
            </View>
        </View>
    )
}

export default UserProfilespics

const styles = StyleSheet.create({
    posterImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
})
