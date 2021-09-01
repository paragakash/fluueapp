
import {
    Dimensions,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    //Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    Button
} from 'react-native';

import React, { Component, useEffect, useState } from 'react';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    PlayBackType,
    RecordBackType,
} from 'react-native-audio-recorder-player';

import { Text } from '../components'

import RNFetchBlob from 'rn-fetch-blob'
//import SoundRecorder from 'react-native-sound-recorder';

// private dirs = RNFetchBlob.fs.dirs;
// private path = Platform.select({
//   ios: 'hello.m4a',
//   android: `${this.dirs.CacheDir}/hello.mp3`,
// });



const AudioManager = () => {

    const [state, setState] = useState({
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
    })

    const { width, height } = useWindowDimensions();

    const dirs = RNFetchBlob.fs.dirs;
    let path = Platform.select({
        ios: 'hello.m4a',
        android: `${dirs.CacheDir}/hello.mp3`,
    });

    //console.log("path", path)

    var audioRecorderPlayer = new AudioRecorderPlayer()
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
        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log('', e)
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
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setState({
            ...state,
            recordSecs: 0,
        });
        console.log(result);
    };

    const deleteFile = async () => {
        try {
            await RNFetchBlob.fs.unlink(path).then(res => console.log(res))
            console.log("deleted")
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


    const onStopPlay = async (e) => {
        console.log('onStopPlay');
        try {
            await audioRecorderPlayer.stopPlayer();
            //console.log(status)
            audioRecorderPlayer.removePlayBackListener();
            deleteFile()
        }
        catch (err) {
            console.log("err", err)
        }
    };

    const onStartPlay = async (e) => {
        try {
            console.log('onStartPlay');
            const msg = await audioRecorderPlayer.startPlayer(path);
            audioRecorderPlayer.setVolume(1.0);
            console.log("msg", msg);
            audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.currentPosition === e.duration) {
                    console.log('finished');
                    onStopPlay()
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

    var playWidth = Math.floor( (state.currentPositionSec / state.currentDurationSec) * (width + 9.5) / width * 100);
    //console.log(playWidth  )
    if (!playWidth) {
        playWidth = 0;
    }


    return (
        <View>
            {/* <Text>{state.recordTime}</Text> */}
            <Button onPress={() => onStartRecord()} title="RECORD" ></Button>
            <Button onPress={() => onPauseRecord()} title="pause" ></Button>
            <Button onPress={() => onResumeRecord()} title="Rusume" ></Button>
            <Button onPress={() => onStopRecord()} title="STOP" ></Button>
            <Text>{state.playTime} / {state.duration}</Text>
            <Button onPress={() => onStartPlay()} title="PLAY" ></Button>
            <Button onPress={() => onPausePlay()} title="PAUSE" ></Button>
            <Button onPress={() => onStopPlay()} title="STOP" ></Button>

            <TouchableOpacity
                style={styles.viewBarWrapper}
                //onPress={this.onStatusPress}
                >
                <View style={styles.viewBar}>
                    <View style={[styles.viewBarPlay, { width: `${playWidth}%` }]} />
                </View>
            </TouchableOpacity>

        </View >
    )
}

export default AudioManager

const styles = StyleSheet.create({
    viewBarWrapper: {
        marginTop: 28,
        marginHorizontal: 28,
        alignSelf: 'stretch',
      },
      viewBar: {
        backgroundColor: '#ccc',
        height: 4,
        alignSelf: 'stretch',
      },
      viewBarPlay: {
        backgroundColor: 'red',
        height: 4,
        width: 0,
      },
})
