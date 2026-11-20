import React from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import { styles } from './ComponentsStyles';

interface LoginUIComponentProps {
    username: string;
    password: string;
    error: string;

    updateUsername: (text: string) => void;
    updatePassword: (text: string) => void;

    onLogin: () => void;
}

export const LoginUIComponent = ({
    username,
    password,
    error,
    updateUsername,
    updatePassword,
    onLogin,
}: LoginUIComponentProps) => {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Calculator</Text>

            <Text style={styles.label}>Username:</Text>

            <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={updateUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
            />

            <Text style={styles.label}>Password:</Text>

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={updatePassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
            />

            {error !== '' && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            <TouchableHighlight
                style={styles.button}
                onPress={onLogin}
                underlayColor="#ddd"
            >
                <Text>Login</Text>
            </TouchableHighlight>

        </View>
    );
};