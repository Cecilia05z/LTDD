import React, { Component } from "react";
import { View } from 'react-native'
import CurrencyUIComponent from "../components/CurrencyUIComponent";


export default class CurrencyScreen extends Component {
    render() {
        return (
            <View>
                <CurrencyUIComponent />
            </View>
        );
    }
}