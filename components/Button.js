import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from ".";
//import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../constants";

class Button extends Component {

  handleMargins() {
    const { margin } = this.props;
    if (typeof margin === "number") {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin
      };
    }

    if (typeof margin === "object") {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0]
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1]
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1]
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3]
          };
      }
    }
  }

  handlePaddings() {
    const { padding } = this.props;
    if (typeof padding === "number") {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding
      };
    }

    if (typeof padding === "object") {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0]
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1]
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1]
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
          };
      }
    }
  }



  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      outline,
      title,
      margin,
      padding,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      margin && { ...this.handleMargins() },
      padding && { ...this.handlePaddings() },
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color, color: theme.colors.white }, // custom backgroundColor
      outline && { borderWidth: 1, borderColor: this.props.color, backgroundColor: theme.colors.white, color: color }
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          {/* <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          > */}
          {children}
          {/* </LinearGradient> */}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        { title ? <Text center color={ outline ? color : '#fff'}>{title}</Text> : children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    marginVertical: theme.sizes.padding / 3
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },

  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 }

});
