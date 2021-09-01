import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import theme, { colors, fonts, sizes } from '../../../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons';

const CSTitle = ({ name, location, distance }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 15 }}>
            <View>
                <Text style={[fonts.largeLightTitle, { color: '#fff', fontSize: sizes.body1 }]}>{name}</Text>
                <Text style={[fonts.body4, { color: '#fff' }]}>{location} </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Icon name="heart-half" size={25} color={colors.darkGreen} />
                <Text style={[fonts.body4, { color: '#fff' }]}>{(Math.round(distance * 100) / 100).toFixed(2)} Km</Text>
            </View>
        </View>
    )
}

export default CSTitle

const styles = StyleSheet.create({})
