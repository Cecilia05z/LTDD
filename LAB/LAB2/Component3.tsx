import React, { Component } from "react";
import { Text } from "react-native";

export default class Component3 extends Component<{ message: string }, { name: string }> {
    constructor(props: { message: string }) {
        super(props);
        this.state = {
            name: "Brian",
        };
    }
  render() {
    return (
      <>
        <Text>{this.props.message}</Text>
        <Text>{this.state.name}</Text>
      </>
    );
  }
}