import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { theme, text } from '../styles';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';
import { isAuthenticated, login } from '../services/auth';
import { useNavigation } from '@react-navigation/core';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true);
    const [userFetchData, setUserFetchData] = useState({});

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });

    async function handleLogin() {
       const data = await login(userInfo);
       setUserFetchData(data);
       navigation.navigate("Dashboard");
    }

    return (
        <View style={theme.container}>
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>
                    Login
                </Text>
                <View style={theme.form}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={(e) => {
                            const newUserInfo = { ...userInfo };
                            newUserInfo.username = e;
                            setUserInfo(newUserInfo);
                        }}
                    />
                    <View style={theme.passwordContainer}>
                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            keyboardType={"default"}
                            style={theme.textInput}
                            value={userInfo.password}
                            secureTextEntry={hidePassword}
                            onChangeText={(e) => {
                                const newUserInfo = { ...userInfo };
                                newUserInfo.password = e;
                                setUserInfo(newUserInfo);
                            }}
                        />
                        <TouchableOpacity
                            style={theme.toggle}
                            onPress={() => setHidePassword(!hidePassword)}>
                            <Image
                                style={theme.eyes}
                                source={hidePassword ? eyesOpened : eyesClosed} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => handleLogin()}>
                    <View style={theme.buttonTextContainer}>
                        <Text style={text.primaryText}>Fazer login</Text>
                    </View>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )

}

export default Login;