import React, { Component } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
    render() {
        return (
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        );
    }
}