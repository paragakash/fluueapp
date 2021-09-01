import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as Icon from "react-native-vector-icons";

import Text from "./Text";
import Block from "./Block";
import Button from "./Button";
import { theme } from "../constants";

export default class Input extends Component {
  state = {
    toggleSecure: false
  };

  renderLabel() {
    const { label, error } = this.props;

    return (
      <Block flex={false}>
        {label ? (
          <Text gray2={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon.Ionicons
            color={theme.colors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? "md-eye" : "md-eye-off"}
            
          />
        )}
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const { email, phone, number, secure, error, style,flex,border,editable,maxLength ,...props } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input ,
      border && styles.border ,
      error && { borderColor: theme.colors.accent },
      style 
    ];

    const inputType = email
      ? "email-address"
      : number
      ? "numeric"
      : phone
      ? "phone-pad"
      : "default";

    return (
      <Block flex={false} >
        {this.renderLabel()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          editable={editable}
          maxLength={maxLength}
          placeholderTextColor={theme.colors.gray}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({

  border:{
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base * 3,
    backgroundColor:theme.colors.secondary,
    paddingLeft:10,
    marginVertical:5,
    marginHorizontal:5,
  },
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0
  }
});
