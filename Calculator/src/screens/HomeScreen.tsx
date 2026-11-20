import React, { Component } from "react";
import { View } from "react-native";
import HomeUIComponent from "../components/HomeUIComponent";

interface HomeScreenProps {
    navigation: any;
}

export default class HomeScreen extends Component<HomeScreenProps> {
    render() {
        return (
            <View>
                <HomeUIComponent navigation={this.props.navigation} />
            </View>
        );
    }
}