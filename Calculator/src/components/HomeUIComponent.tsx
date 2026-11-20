import React, { Component } from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import { styles } from './ComponentsStyles';

interface HomeUIProps {
    navigation: {
        navigate: (routeName: string) => void;
    };
}

export default class HomeUIComponent extends Component<HomeUIProps> {
    render() {
        return (
            <ScrollView>
                <TouchableOpacity 
                    style={styles.optButton}
                    onPress={() => this.props.navigation.navigate('Factorial')}>
                        <Text style={styles.optButText}>Tính Giai Thừa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optButton}
                    onPress={() => this.props.navigation.navigate('Currency')}
                >
                    <Text style={styles.optButText}>Chuyển đổi tiền tệ</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}