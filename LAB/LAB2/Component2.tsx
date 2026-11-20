import React, { Component } from "react";
import { View, Text, AppRegistry } from "react-native";

export default class Component2 extends Component<{ message: string }> {
  constructor(props: { message: string }) {
    super(props);
  }

  render() {
    return (
        <View>
            <Text>{this.props.message}</Text>
        </View>
    );
  }
}

AppRegistry.registerComponent('Component2', () => Component2);