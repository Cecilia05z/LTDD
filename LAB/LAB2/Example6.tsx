import React, { Component } from "react";
import { Text, View } from "react-native";
import Component4 from "./Component4";

export default class Example6 extends Component<{}, { segment: number }> {
    state = { segment: 1 };

    render() {
        return (
            <View>
                {(this.state.segment === 1) &&
                <Text>Puppies Selected</Text>
                }
                {(this.state.segment === 2) &&
                <Text>Cubs Selected</Text>
                }
                <Component4 message="Name:" />
            </View>
        );
    }
}