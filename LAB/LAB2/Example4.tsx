import React, {Component} from "react";
import {AppRegistry, View} from "react-native";
import Component3 from "./Component3";


export default class Example4 extends Component  {
    render() {
    return (
      <View>
        <Component3 message="Hello, Cecilia!" />
      </View>
    );
  }
}

AppRegistry.registerComponent('Example4', () => Example4);