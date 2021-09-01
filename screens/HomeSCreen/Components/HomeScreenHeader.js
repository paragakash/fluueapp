import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import {SIZES,FONTS, sizes, colors} from '../../../constants/theme'
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreenHeader = ({navigation}) => {
    return (
        <View style={{ flex: 0.05,justifyContent: 'center', paddingHorizontal: sizes.width * 0.08, paddingTop: 50 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 50, overflow: 'hidden', padding: 3, borderWidth: 0.5, borderColor: 'lightgrey' }}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/86.jpg' }} resizeMode={'cover'} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                </View>
                <View>
                    <Ionicons onPress={()=>navigation.navigate("HomeScreenSetting")} name={'md-options-sharp'} size={30} color={colors.black} />
                </View>
            </View>
        </View>
    )
}

export default HomeScreenHeader

const styles = StyleSheet.create({})
