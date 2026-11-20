import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";

export default class Component1 extends Component {
    render() {
        return (
            <View>
                <Text>Hello, World!</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('Component1', () => Component1);