import React, { Component } from "react";
import { Alert, View } from "react-native";
import { MyPresentationComponent } from "./MyPresentationComponent";

interface Example5State {
    email: string;
    password: string;
}

export default class Example5 extends Component<{}, Example5State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    updateEmail = (text: string) => {
        this.setState({ email: text });
    };

    updatePassword = (text: string) => {
        this.setState({ password: text });
    };

    login = () => {
        Alert.alert('Login', 'email: ' + this.state.email + ' password: ' + this.state.password);
    }

    render() {
        return (
            <View>
                <MyPresentationComponent 
                    email={this.state.email}
                    password={this.state.password}
                    updateEmail={this.updateEmail}
                    updatePassword={this.updatePassword}
                    login={this.login}
                />
            </View>
        )
    }
}