import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View, Image, Alert } from 'react-native'
import { Block, Button, Text } from '../../components'
import auth from '@react-native-firebase/auth';
import { theme } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/theme';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const SignUpForm4 = () => {

    const { width, height } = useWindowDimensions()
    const [selfiIamge, setselfiIamge] = useState()
    const [transfered, settransfered] = useState(0)
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


    useEffect(() => {
        auth().signInAnonymously()
    }, [])



    console.log("transferd", transfered)

    const submitImage = async () => {
        const uploadUri = selfiIamge.path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const task = storage().ref(fileName).putFile(uploadUri)

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            settransfered(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
        });


        try {
            await task
            Alert.alert("Image Uploaded", "Your Image has been uploaded")

        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <Block >
            <Block flex={0.1} padding={[5, 0]} >
                <Block flex={false} center middle >
                    <Text h1 uppercase color={theme.colors.gray} >Take A Selfi here</Text>
                    <Text caption > Click here to take a clear shot </Text>
                </Block>
            </Block>
            <Block flex={0.9} padding={[5, width * 0.15]} >
                <Block row color={theme.colors.secondary} rounded middle >
                    {
                        selfiIamge && selfiIamge.path ?
                            <Block>
                                <Image source={{ uri: selfiIamge?.path }} style={{ flex: 1, width: '100%', borderRadius: 5 }} resizeMode={'stretch'} />
                            </Block>
                            :
                            <Pressable onPress={() => getSelfi()} style={selfiIamge && selfiIamge.path ? { display: 'flex' } : { display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'camera'} size={50} color={theme.colors.primary} />
                            </Pressable>
                    }


                </Block>
            </Block>
            {
                selfiIamge && selfiIamge.path ?
                    <Block flex={0.1} row middle padding={[20, 0, 0, 0]}  >
                        <Pressable onPress={() => submitImage()}>
                            <Block flex={false} center middle style={{ marginHorizontal: 5 }}  >
                                <Block color={theme.colors.primary} padding={[10, 10]} rounded style={{ borderRadius: 50 }} >
                                    <Icon name={'check'} size={30} color={theme.colors.white} />
                                </Block>
                            </Block>
                        </Pressable>
                    </Block>
                    : <Block flex={0.1} row middle padding={[20, 0, 0, 0]} ></Block>
            }
        </Block>
    )
}

export default SignUpForm4

const styles = StyleSheet.create({})
