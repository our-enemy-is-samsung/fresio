import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import {LayoutChangeEvent, View,} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/constants/Color";
import useToastStore from "@/state/toast";
import useAuth from "@/state/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Updates from 'expo-updates';

export {
	ErrorBoundary,
} from 'expo-router';

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

const AuthFlow = () => {
	return (
		<Stack
			initialRouteName="index"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" options={{animation: 'none'}}/>
			<Stack.Screen name="food/index" options={{animation: 'none'}}/>
			<Stack.Screen name="timer/index" options={{animation: 'none'}}/>
			<Stack.Screen name="timer/create"/>
			<Stack.Screen name="timer/detail/[id]"/>
			<Stack.Screen name="timer/run/[id]"/>
			<Stack.Screen name="food/detail/[id]"/>
			<Stack.Screen name="search/index"/>
			<Stack.Screen name="recipe/[id]"/>
			<Stack.Screen name="setting/index"/>
			<Stack.Screen name="setting/ageSetting"/>
			<Stack.Screen name="setting/dietPreferencePage"/>
			<Stack.Screen name="setting/usernameSettings"/>
			<Stack.Screen name="setting/deviceVolumn"/>
		</Stack>
	)
}

const OnboardFlow = () => {
	return (
		<Stack
			initialRouteName="onboard/onboardmain/AutoExpirationAlertScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="onboard/onboardmain/AutoExpirationAlertScreen"
				options={{animation: 'none'}}
			/>
			<Stack.Screen
				name="onboard/onboarddiet/SelectDietScreen"
			/>
			<Stack.Screen name={'onboard/beforeCamera'}/>
			<Stack.Screen name="onboard/weHaveLocationPermission"/>
			<Stack.Screen name="onboard/nowPersonalSetting"/>
			<Stack.Screen name="onboard/ageSelect"/>
			<Stack.Screen name="onboard/foodCheckPasta" options={{animation: 'none'}}/>
			<Stack.Screen name="onboard/foodCheckBibimbap" options={{animation: 'none'}}/>
			<Stack.Screen name="onboard/foodCheckRamen" options={{animation: 'none'}}/>
			<Stack.Screen name="onboard/foodCheckCutlet" options={{animation: 'none'}}/>
			<Stack.Screen name="onboard/foodCheckPizza" options={{animation: 'none'}}/>
		</Stack>
	)
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// AsyncStorage.clear();
	const {toasts} = useToastStore();
	const [fontsLoaded, fontError] = useFonts({
		'PretendardBold': require('../assets/fonts/Pretendard-Bold.otf'),
		'PretendardMedium': require('../assets/fonts/Pretendard-Medium.otf'),
		'PretendardSemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
	});

	const {isAuthenticated, setIsAuthenticated} = useAuth();

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const token = await AsyncStorage.getItem('access_token');
				setIsAuthenticated(!!token);
			} catch (error) {
				console.error('Failed to get token:', error);
			}
		};

		checkAuthStatus();
	}, []);

	useEffect(() => {
		const hideSplash = async () => {
			try {
				// fontsLoaded가 true일 때만 스플래시 화면을 숨깁니다
				if (fontsLoaded) {
					await SplashScreen.hideAsync();
				}
			} catch (e) {
				console.warn('Error hiding splash screen:', e);
			}
		};

		hideSplash();
	}, [fontsLoaded]);

	// 폰트나 에러 상태를 처리하는 부분
	if (!fontsLoaded && !fontError) {
		return null;
	}

	if (fontError) {
		console.error('Font loading error:', fontError);
		return null;
	}

	return (
		<View style={{flex: 1}}>
			<GestureHandlerRootView style={{flex: 1}}>
				<ThemeProvider value={MyDefaultTheme}>
					{isAuthenticated ? <AuthFlow/> : <OnboardFlow/>}
				</ThemeProvider>
			</GestureHandlerRootView>
		</View>
	);
}