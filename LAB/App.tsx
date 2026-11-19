import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Example1 from './LAB2/Example1';

export default class App extends Component<{}, { message: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: 'Hello, World!',
    };
  }
  render() {
    return (
      <View>
        <Text>{this.state.message}</Text>
        <Example1 />
      </View>
    );
  }
}