import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image } from 'react-native'
//import DatePicker from 'react-native-modern-datepicker';
import { Block, Button } from '../../components';
import { theme } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';

const SignUpForm2 = () => {

    const { width, height } = useWindowDimensions();

    const [images, setimages] = useState({ images: [{}, {}, {}, {}] })

    const launchCamera = (index) => {

        ImagePicker.openPicker({
            //multiple: true,
            mediaType: 'photo'

        }).then(img => {
            console.log(img);
            let items = images.images;
            items[index] = img;
            setimages({ ...images, images: items })

        }).catch(error => {
            console.log(error)
        });

        //setimages(data)
    }


    //console.log(images)


    const uplaodTask = async (task) => {
        return await task;
    }


    const onSave = async () => {
        var data = images.images
        try {
            data && data?.map(image => {
                const uploadUri = image.path;
                let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

                const task = storage().ref(fileName).putFile(uploadUri)

                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    //settransfered(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
                });
                
                try {
                    uplaodTask(task)
                    //Alert.alert("Image Uploaded", "Your Image has been uploaded")
                }
                catch (e) {
                    console.log(e)
                }
            });
            
        }
        catch (err) {
            console.log(err)
        }
    }



    const renderUI = () => {
        return <>
            <Pressable onPress={() => launchCamera(0)} style={{ flex: 0.6 }} >
                <Block center middle style={{ backgroundColor: theme.colors.gray2 }}>
                    {
                        images && images.images[0]?.path ? <Image source={{ uri: images.images[0]?.path }} style={{ flex: 1, width: '100%' }} resizeMode={'stretch'} /> : <Icon name={"camera-sharp"} size={25} color={theme.colors.gray} />
                    }
                </Block>
            </Pressable>

            <Block flex={0.3} border margin={[height * 0.02, 0]}>
                <Block row >
                    <Block middle margin={[0, 2]} style={{ backgroundColor: theme.colors.gray2 }}  >
                        <Pressable onPress={() => launchCamera(1)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            {
                                Object.keys(images.images[1]).length > 0 ?
                                    <Image source={{ uri: images.images[1]?.path }} style={{ flex: 1, width: '100%' }} resizeMode={'stretch'} /> :
                                    <Icon name={"camera-sharp"} size={25} color={theme.colors.gray} />
                            }
                        </Pressable>
                    </Block>
                    <Block middle margin={[0, 2]} style={{ backgroundColor: theme.colors.gray2 }}  >
                        <Pressable onPress={() => launchCamera(2)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            {
                                Object.keys(images.images[2]).length > 0 ?
                                    <Image source={{ uri: images.images[2]?.path }} style={{ flex: 1, width: '100%' }} resizeMode={'stretch'} /> :
                                    <Icon name={"camera-sharp"} size={25} color={theme.colors.gray} />
                            }
                        </Pressable>
                    </Block>
                    <Block middle margin={[0, 2]} style={{ backgroundColor: theme.colors.gray2 }}  >
                        <Pressable onPress={() => launchCamera(3)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            {
                                Object.keys(images.images[3]).length > 0 ?
                                    <Image source={{ uri: images.images[3]?.path }} style={{ flex: 1, width: '100%' }} resizeMode={'stretch'} /> :
                                    <Icon name={"camera-sharp"} size={25} color={theme.colors.gray} />
                            }
                        </Pressable>
                    </Block>
                </Block>
            </Block>
            <Block flex={0.1}>
                <Button color={theme.colors.primary} title={"Save"} onPress={() => onSave()} ></Button>
            </Block>
        </>
    }

    return (
        <Block>
            {images && renderUI()}
            <Block flex={0.1}>
                <Block flex={false} row right  >
                    <Text >We suggest using a picture of your face</Text>
                </Block>
                <Block flex={false} row right >
                    <Text>as cover photo</Text>
                </Block>
            </Block>
        </Block>
    )
}

export default SignUpForm2
