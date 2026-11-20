import React, {Component} from "react";
import {AppRegistry, View} from "react-native";
import Component2 from "./Component2";

export default class Example3 extends Component  {
    render() {
    return (
      <View>
        <Component2 message="Hello" />
      </View>
    );
  }
}

AppRegistry.registerComponent('Example3', () => Example3);