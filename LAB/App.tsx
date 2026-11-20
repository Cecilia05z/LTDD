import React, { Component } from 'react';
import { View } from 'react-native';

import Example1 from './LAB2/Example1';
import Example2 from './LAB2/Example2';
import Example3 from './LAB2/Example3';
import Example4 from './LAB2/Example4';
import Example5 from './LAB2/Example5';
import Example6 from './LAB2/Example6';

export default class App extends Component {
  render() {
    return (
      <View>
        <Example1 />
        <Example2 />
        <Example3 />
        <Example4 />
        <Example5 />
        <Example6 />
      </View>
    );
  }
}