import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import Component1 from "./Component1";

export default class Example2 extends Component {
  render() {
    return (
      <View>
        <Component1 />
      </View>
    );
  }
}

AppRegistry.registerComponent('Example2', () => Example2);