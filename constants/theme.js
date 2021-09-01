import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const colors = {
  accent: "#F3534A",
  primary: "#67D6E8",
  secondary: "#f0fbfd",
  tertiary: "#FFE358",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  gray2: "#F6F3F3",

  darkGreen: "#229879",
  darkLime: "#1A8871",
  lightLime: "#BBD6C5",
  lime: "#2AD699",
  lightGreen: "#E7F9EF",
  lightGreen1: "#8EbCA0",
  background: '#F3F5F9',

  white: "#fff",
  white2: '#F9F9F9',
  black: "#020202",
  black2: "#333",
  blue: "#67D6E8",
  gray: "#777777",
  gray2: '#F8F8F8',
  lightGray: "#F5F6FB",
  lightGray2: '#757575',

  transparentBlack1: 'rgba(2, 2, 2, 0.1)',
  transparentBlack3: 'rgba(2, 2, 2, 0.3)',
  transparentBlack5: 'rgba(2, 2, 2, 0.5)',
  transparentBlack7: 'rgba(2, 2, 2, 0.7)',
  transparentBlack9: 'rgba(2, 2, 2, 0.9)',

  transparentGray: 'rgba(77,77,77, 0.8)',
  transparentDarkGray: 'rgba(20,20,20, 0.9)',

  transparent: 'transparent',

};

const sizes = {

  width: width,
  height: height,
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,

  //base: 8,
  //font: 14,
  //radius: 12,
  //padding: 24,
  //spacing: 20,

  // font sizes
  largeTitle: 40,
  //h1: 30,
  //h2: 22,
  //h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width: width,
  height: height,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,


};

const SIZES = {


}

const fonts = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
  largeLightTitle: { fontFamily: "Roboto-Light", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4 },
  h1_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h1 },
  h2_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h2 },
  h3_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h3 },
  h4_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h4 },
  body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1 },
  body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2 },
  body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3 },
  body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4 },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5 },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  }
};

export { colors, sizes, fonts };
