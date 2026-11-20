import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import { RootStackParamList } from './NavigationTypes';
import FactorialScreen from '../screens/FactorialScreen';
import CurrencyScreen from '../screens/CurrencyScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen as React.ComponentType<any>}
                    options={{
                        title: 'Trang chủ',
                        headerBackTitle: 'Quay lại',
                    }}
                />

                <Stack.Screen
                    name="Factorial"
                    component={FactorialScreen}
                    options={{
                        title: 'Tính Giai Thừa',
                        headerBackTitle: 'Quay lại',
                    }}
                />

                <Stack.Screen
                    name='Currency'
                    component={CurrencyScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;