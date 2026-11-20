import React, { Component } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { login } from '../lib/Auth';
import { LoginUIComponent } from '../components/LoginUIComponent';

import { RootStackParamList } from '../navigation/NavigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface LoginScreenState {
    username: string;
    password: string;
    error: string;
}

export default class LoginScreen extends Component<Props, LoginScreenState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
        };
    }

    // Cập nhật Username
    updateUsername = (text: string) => {
        this.setState({ username: text });
    };

    // Cập nhật Password
    updatePassword = (text: string) => {
        this.setState({ password: text });
    };

    // Xử lý đăng nhập
    handleLogin = () => {
        const { username, password } = this.state;

        // Kiểm tra dữ liệu rỗng
        if (!username.trim() || !password) {
            this.setState({
                error: 'Vui lòng nhập đầy đủ thông tin!',
            });
            return;
        }

        // Kiểm tra đăng nhập
        const user = login(username, password);

        if (user !== null) {

            // Lấy thông tin User
            const userInfo = {
                username: user.getUsername(),
            };

            // Chuyển sang HomeScreen
            this.props.navigation.replace('Home', {
                user: userInfo,
            });

        } else {

            // Đăng nhập thất bại
            this.setState({
                error: 'Username hoặc Password không chính xác!',
            });
        }
    };

    render() {
        return (
            <LoginUIComponent
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                username={this.state.username}
                password={this.state.password}
                error={this.state.error}
                onLogin={this.handleLogin}
            />
        );
    }
}