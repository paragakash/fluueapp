import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, useWindowDimensions, Animated, Easing, Pressable, Alert, PermissionsAndroid, FPlatform, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Block, Button, Text } from '../../components'
import { theme } from '../../constants'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    PlayBackType,
    RecordBackType,
} from 'react-native-audio-recorder-player';

import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';


const audioRecorderPlayer = new AudioRecorderPlayer();

const SignUpForm5 = () => {

    const { width, height } = useWindowDimensions()


    const [rocordingSate, setrocordingSate] = useState('stop')

    const animation = useRef(new Animated.Value(0))


    const anim = useRef(
        Animated.loop(
            Animated.timing(animation.current, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
                isInteraction: false,
            })
        )
    ).current;


    const [state, setState] = useState({
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
    })



    const [recordingStatus, setrecordingStatus] = useState("")


    const dirs = RNFetchBlob.fs.dirs;
    let path = Platform.select({
        ios: 'hello.m4a',
        android: `${dirs.CacheDir}/hello.mp3`,
    });

    //console.log("path", path)

    audioRecorderPlayer.setSubscriptionDuration(0.1)


    useEffect(async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }, [])


    useEffect(() => {
        if (rocordingSate == "record") {
            anim.start()
        } else {
            //When stopping reset the value to 0 so animated item doesn't stop in a random position
            anim.stop()
            animation.current.setValue(0)
        }
        //Return a function from useEffect to stop the animation on unmount
        return () => anim.stop()
        //This useEffect should rerun if "running" or "anim" changes (but anim won't change since its a ref we never modify)
    }, [rocordingSate, anim])



    const RotateData = animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const [transfered, settransfered] = useState(0)


    const uplaodMp3 = async () => {
        const uploadUri = path;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const task = storage().ref(fileName).putFile(uploadUri)

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            settransfered(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
        });


        try {
            await task;
            Alert.alert("File Uploaded", "Your Image has been uploaded")

        }
        catch (e) {
            console.log(e)
        }
    }


    const onStartRecord = async () => {
        var data = {
            rec_sec: 0,
            rec_time: '00:00:00'
        }

        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };

        console.log('audioSet', audioSet);
        setrocordingSate('record')
        setrecordingStatus('start Recording')
        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log('', e)
            setrecordingStatus('Recording')
        });

        console.log(`uri: ${uri}`);

    };

    const onPauseRecord = async () => {
        try {
            await audioRecorderPlayer.pauseRecorder();
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };

    const onResumeRecord = async () => {
        await audioRecorderPlayer.resumeRecorder();
    };


    const onStopRecord = async () => {
        try {
            //await audioRecorderPlayer.pauseRecorder();
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setrecordingStatus('stoped Recording')
            setState({
                ...state,
                recordSecs: 0,
            });
            setrocordingSate('stop')
            console.log(result);
        }
        catch (err) {
            console.log(err)
        }

    };

    const deleteFile = async () => {
        try {
            await RNFetchBlob.fs.unlink(path).then(res => console.log(res))
            console.log("deleted")
            setrecordingStatus('Deleted Previous Recording')
            setState({
                isLoggingIn: false,
                recordSecs: 0,
                recordTime: '00:00:00',
                currentPositionSec: 0,
                currentDurationSec: 0,
                playTime: '00:00:00',
                duration: '00:00:00',
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const reset = () => {
        setrocordingSate('reset')
        try {
            deleteFile()
            setrecordingStatus('')
            Alert.alert("Reset", "Audio Deleted")
        }
        catch (err) {
            console.log(err)
        }
    }


    const onStopPlay = async (e) => {
        console.log('onStopPlay');
        try {
            await audioRecorderPlayer.stopPlayer();
            //console.log(status)
            audioRecorderPlayer.removePlayBackListener();
            //deleteFile()
        }
        catch (err) {
            console.log("err", err)
        }
    };

    const onStartPlay = async (e) => {
        setrecordingStatus('Playing..')
        try {
            console.log('onStartPlay');
            setrocordingSate('play')

            const msg = await audioRecorderPlayer.startPlayer(path);
            audioRecorderPlayer.setVolume(1.0);
            console.log("msg", msg);
            audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.currentPosition === e.duration) {
                    console.log('finished');
                    onStopPlay()
                    setrecordingStatus('')
                }
                else {
                    setState({
                        ...state,
                        currentPositionSec: e.currentPosition,
                        currentDurationSec: e.duration,
                        playTime: audioRecorderPlayer.mmssss(
                            Math.floor(e.currentPosition),
                        ),
                        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                    });
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    };


    const onPausePlay = async (e) => {
        await audioRecorderPlayer.pausePlayer();
    };

    var playWidth = Math.floor((state.currentPositionSec / state.currentDurationSec) * (width + 9.5) / width * 100);
    //console.log(playWidth  )
    if (!playWidth) {
        playWidth = 0;
    }




    return (
        <Block >
            <Block flex={0.1} center middle>
                <Text h3 color={theme.colors.gray} > Les't Record Your Voice</Text>
                <Text  > for verification </Text>
            </Block>
            <Block flex={0.3} >
                <Block row center middle  >
                    <Animated.Image source={require('../../Assets/static/cd.png')} style={[styles.image, { transform: [{ rotate: RotateData }] }]} ></Animated.Image>
                </Block>
            </Block>
            <Block flex={0.1} center middle>
                <Text primary > {recordingStatus} </Text>
            </Block>
            <Block row flex={0.1} center >
                <Block style={styles.viewBarWrapper}>
                    <View style={styles.viewBar}>
                        <View style={[styles.viewBarPlay, { width: `${playWidth}%` }]} />
                    </View>
                </Block>
            </Block>

            <Block flex={0.1} center middle >
                <Block row >
                    <Block flex={false} center rounded margin={[0, 5]} middle color={rocordingSate == "record" ? theme.colors.primary : theme.colors.gray2} >
                        <Pressable onPress={() => onStartRecord()} style={{ display: 'flex', paddingHorizontal: 15, paddingVertical: 5 }} >
                            <Icon name={'ios-mic-sharp'} size={24} color={rocordingSate == "record" ? theme.colors.white : theme.colors.gray} />
                        </Pressable>
                    </Block>
                    <Block flex={false} center rounded margin={[0, 5]} middle color={rocordingSate == "stop" ? theme.colors.primary : theme.colors.gray2} >
                        <Pressable onPress={() => onStopRecord()} style={{ display: 'flex', paddingHorizontal: 15, paddingVertical: 5 }} >
                            <Icon name={'stop'} size={24} color={rocordingSate == "stop" ? theme.colors.white : theme.colors.gray} />
                        </Pressable>
                    </Block>
                    <Block flex={false} center rounded margin={[0, 5]} middle color={rocordingSate == "play" ? theme.colors.primary : theme.colors.gray2} >
                        <Pressable onPress={() => onStartPlay()} style={{ display: 'flex', paddingHorizontal: 15, paddingVertical: 5 }} >
                            <Icon name={'ios-play'} size={24} color={rocordingSate == "play" ? theme.colors.white : theme.colors.gray} />
                        </Pressable>
                    </Block>
                    <Block flex={false} center rounded margin={[0, 5]} middle color={rocordingSate == "reset" ? theme.colors.primary : theme.colors.gray2} >
                        <Pressable onPress={() => reset()} style={{ display: 'flex', paddingHorizontal: 15, paddingVertical: 5 }} >
                            <Icon name={'ios-repeat'} size={24} color={rocordingSate == "reset" ? theme.colors.white : theme.colors.gray} />
                        </Pressable>
                    </Block>
                </Block>
            </Block>
            <Block flex={false} margin={[10, 0, 0, 0]}  >
                <Button onPress={() => uplaodMp3()} color={theme.colors.primary} title="Done"></Button>
            </Block>
            <Block flex={0.1} center middle>
                <Block flex={false} row   >
                    <Text title primary >Almost Done</Text>
                </Block>
                <Block flex={false} row   >
                    <Text title primary>Just another step to go!</Text>
                </Block>
            </Block>
        </Block>

        // <Block>
        //     <Block>
        //        
        //     </Block>
        // </Block>
        // </Block>
    )
}

export default SignUpForm5

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    viewBarWrapper: {
        alignSelf: 'stretch',
    },
    viewBar: {
        backgroundColor: '#ccc',
        height: 4,
        alignSelf: 'stretch',
    },
    viewBarPlay: {
        backgroundColor: theme.colors.gray,
        height: 4,
        width: 0,
    },
})
