import React from "react";
import { Button, Image } from "react-native";
import { styles } from "./Styles";

export default class Example1 extends React.Component {
  render() {

    return (
      <>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/77/8a/6a/778a6ab0902f224dd672f65b2fec508c.jpg' }}
          style={styles.image}
        />
        <Button
          title="Red Button"
          onPress={() => {console.log('Button pressed!');}}
          color="red"
        />
      </>
    );
  }
}

AppRegistry.registerComponent('Example1', () => Example1);