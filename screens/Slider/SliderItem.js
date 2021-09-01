import React from 'react'
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import { Block } from '../../components'
import { theme } from '../../constants';
import SignUpForm1 from '../SignUpForms/SignUpForm1';
import SignUpForm2 from '../SignUpForms/SignUpForm2';
import SignUpForm3 from '../SignUpForms/SignUpForm3';
import SignUpForm4 from '../SignUpForms/SignUpForm4';
import SignUpForm5 from '../SignUpForms/SignUpForm5';
import SignUpForm6 from '../SignUpForms/SignUpForm6';



const SliderItem = ({ name, index }) => {


    const Components = {
        SignUpForm1: SignUpForm1,
        SignUpForm2: SignUpForm2,
        SignUpForm3: SignUpForm3,
        SignUpForm4: SignUpForm4,
        SignUpForm5: SignUpForm5,
        SignUpForm6: SignUpForm6,
    };

    const block = (name) => React.createElement(Components[name]);

    return (
        <Block
            key={`img-${index}`}
            style={{ width: theme.sizes.width, }}>
            {/* <Block flex={0.7} center style={{ width: theme.sizes.width / 1.5, }}  >
                <Image source={item.img} resizeMode="center" style={[{ width: '100%', height: '100%' }]} />
            </Block>
            <Block flex={0.3} center>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>                
            </Block> */}
            <Block padding={[0,theme.sizes.width *0.1]} style={{ width: theme.sizes.width}}  >
                {block(name)}
            </Block>
        </Block>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    image: {
        flex: 0.7,
        justifyContent: 'center',
    }
})
