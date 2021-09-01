import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Block } from '.';
import { theme } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const BottomModal = ({ isOpen, children,resetState,modalHeight }) => {

    const [openModel, setopenModel] = useState(false);
    const {width,height} = useWindowDimensions()

    useEffect(() => {
        if(isOpen){
            setopenModel(isOpen)
        }
        else{
            setopenModel(false)
        }
       
    }, [isOpen])

    const scroller = useRef()
    const toggleModakl = () => {
        setopenModel(!openModel)  
        resetState(!openModel)
    }

    const handleScrollTo = p => {
        if (scroller.current) {
            scroller.current.scrollTo(p);
        }
    };


    const renderModal = (modalHeight) => {
        return <Modal
            //testID={'modal'}
            isVisible={openModel}
            //onSwipeComplete={this.close}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={100}
            animationInTiming={300}
            propagateSwipe={true}
            hideModalContentWhileAnimating
            avoidKeyboard
            useNativeDriver
            useNativeDriverForBackdrop
            animationIn={'slideInUp'}
            style={styles.modal}>
            <Pressable onPress={() => toggleModakl()}>
                <Block flex={false} center middle row padding={[5, 5]}>
                    <Icon name={'ios-close-circle-sharp'} size={40} color={'#fff'} />
                </Block>
            </Pressable>
            <View style={[styles.scrollableModal,{height: modalHeight ? modalHeight : theme.sizes.height *0.45 }]}>
                {children}
            </View>
        </Modal>
    }


    return (
        <View>
            {openModel && renderModal(modalHeight)}
        </View>
    )

}


export default BottomModal

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        backgroundColor: theme.colors.white,
        paddingTop:10,
        paddingHorizontal:10,
    },
    
})
