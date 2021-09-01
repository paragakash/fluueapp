import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DropDownPicker from "react-native-custom-dropdown";
//import ModalDropdown from 'react-native-modal-dropdown';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { Block } from './Block';



const DropDown = ({ data, placeholder, selectedValue, }) => {

    console.log("selectedValue : ", selectedValue)

    return (
        <View>
            <Popover
                backgroundStyle={false}
                placement={PopoverPlacement.BOTTOM}
                from={(
                    <TouchableOpacity>
                        <Block>
                            <Text>Press here to open popover!</Text>
                        </Block>
                    </TouchableOpacity>
                )}>
                <Text>This is the contents of the popover</Text>
            </Popover>
        </View>
    )
}

export default DropDown

const styles = StyleSheet.create({})
