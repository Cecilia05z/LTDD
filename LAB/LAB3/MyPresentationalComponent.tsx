import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./Styles";

export const MyPresentationalComponent = (props: { listItems: { id: React.Key; name: string }[] }) => {
    const createItem = (item: { id: React.Key; name: string }) => (
        <Text
            style={styles.item}
            key={item.id}>
            {item.name}
        </Text>
    );

    return (
        <View style={styles.container}>
            <ScrollView 
                style={ styles.scrollView }
                nestedScrollEnabled={true}>
                {props.listItems.map(createItem)}
            </ScrollView>
        </View>
    );
}