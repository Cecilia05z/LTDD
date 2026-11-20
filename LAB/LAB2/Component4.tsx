import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Component4 extends Component<
    { message: string },
    { name: string; showName: boolean }
> {
    constructor(props: { message: string }) {
        super(props);
        this.state = {
            name: "Brad",
            showName: true
        };
    }

    render() {
        let name = this.state.showName ? this.state.name : 'No name';
        return (
            <View>
                <Text>{this.props.message}</Text>
                <Text>{name}</Text>
            </View>
        );
    }
}