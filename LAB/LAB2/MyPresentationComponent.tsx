import React from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { styles } from "./Styles";

export const MyPresentationComponent = (props: any) => {
    return (
        <View>
            <TextInput 
                style= {styles.input}
                placeholder= "Email"
                autoCapitalize= "none"
                onChangeText= {props.updateEmail}
            />
            <TextInput 
                style= {styles.input} 
                placeholder= "Password" 
                secureTextEntry= {true}
                onChangeText= {props.updatePassword}
            />
            <TouchableHighlight
                style= {styles.submit}
                onPress= { () => props.login(props.email, props.password) }
            >
                <Text style= {styles.submitText}>Submit</Text>
            </TouchableHighlight>
        </View>
    );
}