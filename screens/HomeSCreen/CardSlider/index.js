import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { SIZES, FONTS, sizes } from '../../../constants/theme'
//import Actions from '../Components/Actions';
import { users } from '../api'
import Title from '../Components/Title'
import GetLocation from 'react-native-get-location'
//import { getDistance, convertDistance } from 'geolib';
//import { set } from 'react-native-reanimated';
import CSBottomNavigation from './Componens/CSBottomNavigation';
import { useDispatch, useSelector } from "react-redux";
import { setuserData, getUsers } from "../../../store/actions/authAction";

const CardSlider = ({ data, navigation }) => {

  const [curruntPosition, setcurruntPosition] = useState({})
  const [state, setstate] = useState([])

  const userdata = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  console.log("insex:", userdata)

  useEffect(() => {
    dispatch(getUsers())

  }, [])

  React.useEffect(async () => {
    await asynchronousFunction()
  }, [])

  const asynchronousFunction = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(res => {
      var arr = users.map((i, ind) => {
        console.log(i)
        // a = convertDistance(getDistance({ latitude: res.latitude, longitude: res.longitude }, i.location.coords), 'km');
        return { ...i, distance: '55' }
      })
      setstate(arr)
    }).catch((err) => err)
  }

  const t = {};

  const onNextClicked = () => {
    t.swiper.swipeLeft()
  }

  const onBackCliked = () => {
    t.swiper.goBackFromLeft()
  }

  return (
    <View style={styles.container}>

      <Text>{state.length}</Text>
      <CardStack
        style={styles.content}
        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
        ref={swiper => {
          t.swiper = swiper
        }}
        onSwiped={(e) => console.log('e', e)}
      // onSwipedLeft={() => console.log('onSwipedLeft')}
      >

        {
          // state.map((item, index) => {
          //   console.log('index', index)
          //   return <Card key={index.toString()} style={[styles.card]}>
          //     <View style={{ flex: 1 }} >
          //       <View style={{ flex: 1 }}>
          //         <View style={{ width: '100%', height: '90%' }}>
          //           <Pressable onPress={() => navigation.navigate('userinfo', { user: item })}>
          //             <Image source={{ uri: item?.profileimages }} style={{ width: '100%', height: '100%' }} resizeMode={'cover'} />
          //           </Pressable>
          //           <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '15%', display: 'flex', justifyContent: 'center' }}>
          //             <Title name={item.username} location={item.location.state} distance={item.distance} />
          //           </View>
          //         </View>
          //         <View>
          //           <CSBottomNavigation onBackCliked={() => onBackCliked()} onNextClicked={() => onNextClicked()} />
          //         </View>
          //       </View>
          //     </View>
          //   </Card>
          // })
        }

        {
          userdata && userdata.map((item, index) => {
            console.log(Object.values(item)[0].profileimages)
            
            return <Card key={index.toString()} style={[styles.card]}>
              <View style={{ flex: 1 }} >
                <View style={{ flex: 1 }}>
                  <View style={{ width: '100%', height: '90%' }}>
                    <Pressable onPress={() => navigation.navigate('userinfo', { user: Object.values(item)[0] })}>
                      <Image source={{ uri: Object.values(item)[0].profileimages }} style={{ width: '100%', height: '100%' }}  />
                    </Pressable>
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '15%', display: 'flex', justifyContent: 'center' }}>
                      <Title name={Object.values(item)[0].username} location={Object.values(item)[0].location.state} distance={Object.values(item)[0].distance} />
                    </View>
                  </View>
                  <View>
                    <CSBottomNavigation onBackCliked={() => onBackCliked()} onNextClicked={() => onNextClicked()} />
                  </View>
                </View>
              </View>
            </Card>
          })
        }
      </CardStack>
    </View>
  )
}

export default CardSlider

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',

  },
  card: {
    width: sizes.width,
    height: sizes.height * 0.8,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
  },
});


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#f2f2f2',
//     },
//     content: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',

//     },
//     card: {
//         overflow: 'hidden',
//         width: theme.SIZES.width * .9,
//         height: theme.SIZES.height * 0.75,
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         shadowColor: 'rgba(0,0,0,0.5)',
//         shadowOffset: {
//             width: 0,
//             height: 1
//         },
//         shadowOpacity: 0.5,
//         overflow: 'hidden'
//     },
//     card1: {
//         backgroundColor: '#FE474C',
//     },
//     card2: {
//         backgroundColor: '#FEB12C',
//     },
//     label: {
//         lineHeight: 400,
//         textAlign: 'center',
//         fontSize: 55,
//         fontFamily: 'System',
//         color: '#ffffff',
//         backgroundColor: 'transparent',
//     },
//     footer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     buttonContainer: {
//         width: 220,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     button: {
//         shadowColor: 'rgba(0,0,0,0.3)',
//         shadowOffset: {
//             width: 0,
//             height: 1
//         },
//         shadowOpacity: 0.5,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 0,
//     },
//     orange: {
//         width: 55,
//         height: 55,
//         borderWidth: 6,
//         borderColor: 'rgb(246,190,66)',
//         borderRadius: 55,
//         marginTop: -15
//     },
//     green: {
//         width: 75,
//         height: 75,
//         backgroundColor: '#fff',
//         borderRadius: 75,
//         borderWidth: 6,
//         borderColor: '#01df8a',
//     },
//     red: {
//         width: 75,
//         height: 75,
//         backgroundColor: '#fff',
//         borderRadius: 75,
//         borderWidth: 6,
//         borderColor: '#fd267d',
//     }
// });