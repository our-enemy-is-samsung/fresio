import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/constants/Color";
import Toast from "@/components/shared/Toast";
import useToastStore from "@/state/toast";

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
  initialRouteName: "(tabs)/onborad/onboardmain/AutoExpirationAlertScreen",
};

SplashScreen.preventAutoHideAsync();

interface RootLayoutNavProps {
    onLayout: (event: LayoutChangeEvent) => void;
}

const MyDefaultTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors['surface'],
    }
};

function RootLayoutNav({onLayout}: RootLayoutNavProps) {
    const {toasts} = useToastStore();

    return (
        <GestureHandlerRootView style={{flex: 1}} onLayout={onLayout}>
            <ThemeProvider value={MyDefaultTheme}>
                <Stack
                    initialRouteName="(tabs)/onborad/onboardmain/AutoExpirationAlertScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/onboardmain/AutoExpirationAlertScreen"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/onboardmain/SecondSlide"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/onboardmain/ThirdSlide"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/onboarddiet/SelectDietScreen"
                        options={{
                            headerShown: false,
                            title: '해당되는 식단을 알려주세요',
                            headerBackTitle: '',
                            animation: 'default'
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/onboarddiet/SelectNetworkScreen"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)/onborad/ConnectionPreparationScreen"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen 
                        name="index" 
                        options={{animation: 'none'}} 
                    />
                    <Stack.Screen 
                        name="food/index" 
                        options={{animation: 'none'}}
                    />
                </Stack>
            </ThemeProvider>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    pointerEvents: 'box-none'
                }}
            >
                {toasts.map((toast, index) => (
                    <View
                        key={toast.id}
                        style={{
                            marginTop: 30 + (index * 30),
                            marginHorizontal: 10,
                        }}
                    >
                        <Toast
                            text={toast.text}
                            duration={toast.duration}
                            type={toast.type}
                        />
                    </View>
                ))}
            </View>
        </GestureHandlerRootView>
    );
}

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        'PretendardBold': require('../assets/fonts/Pretendard-Bold.otf'),
        'PretendardMedium': require('../assets/fonts/Pretendard-Medium.otf'),
        'PretendardSemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    });

    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                setAppReady(true);
            }
        };

        prepareApp();
    }, [fontsLoaded]);

    useEffect(() => {
        if (fontError) {
            console.error('Font loading error:', fontError);
            throw fontError;
        }
    }, [fontError]);

    const onLayoutRootView = useCallback(() => {
        if (appReady) {
            SplashScreen.hideAsync();
        }
    }, [appReady]);

    if (!appReady) {
        return null;
    }

    return <RootLayoutNav onLayout={onLayoutRootView}/>;
}