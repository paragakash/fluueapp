import React, { useState } from 'react'
import { StyleSheet, View, useWindowDimensions, Pressable, Image } from 'react-native'
import { Block, Text, Button } from '../../components'
import { theme } from '../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AudioManager from '../AudioManager';



const SignUpForm3 = () => {

    const { width, height } = useWindowDimensions();

    const [selfiIamge, setselfiIamge] = useState()
    const [state, setstate] = useState({})
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer())


    const getSelfi = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setselfiIamge(image)
        }).catch(e => {
            console.log(e)
        })
    }

    //console.log(selfiIamge?.path)

    return (
        <Block >
            {/* <AudioManager /> */}
            <Block flex={0.7}  >
                <Text uppercase>Voice clip</Text>
                <Block flex={false}>
                    <Block row spaceBetween>
                        <Block margin={[0, 20, 0, 0]}><Button color={theme.colors.primary} outline title={'Record Voice'}></Button></Block>
                        <Text underline primary >Heared Sample ?</Text>
                    </Block>
                </Block>
                <Text uppercase>Selfe Verification </Text>

                {
                    selfiIamge?.path ?
                        <Block row padding={[20, 0]} >
                            <Block rounded flex={0.5} padding={[0, 10, 0, 0]}   >
                                <Image source={{ uri: selfiIamge?.path }} style={{ flex: 1, width: '100%', borderRadius: 5 }} resizeMode={'stretch'} />
                            </Block>
                            <Block center bottom flex={0.6} >
                                <Text primary> Your looking so amaizing <Icon name={'checkmark-circle'} color={theme.colors.primary} size={15} /> </Text>
                            </Block>
                        </Block>
                        : <Block flex={false}>
                            <Block row spaceBetween>
                                <Block flex={0.6} >
                                    <TouchableOpacity onPress={() => getSelfi()} style={{ display: 'flex' }}>
                                        <Block margin={[0, 20, 0, 0]}><Button color={theme.colors.primary} outline title={'Click Selfie'}></Button></Block>
                                    </TouchableOpacity>
                                </Block>
                                <Block flex={0.4} >
                                    <Text primary>Upload a selfie to get verified <Icon name={'checkmark-circle'} color={theme.colors.primary} size={15} /> </Text>
                                </Block>
                            </Block>
                        </Block>
                }

            </Block>
            <Block flex={0.3} center middle>
                <Block flex={false} row   >
                    <Text title primary >Almost Done</Text>
                </Block>
                <Block flex={false} row   >
                    <Text title primary>Just another step to go!</Text>
                </Block>
            </Block>
        </Block>
    )
}

export default SignUpForm3

const styles = StyleSheet.create({})
