import {DarkTheme, DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, Redirect} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, useColorScheme} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/shared/constants/Color";

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
		background: Colors['light']['grayScale5'],
	}
};

const MyDarkTheme: Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: Colors['dark']['grayScale5'],
	},
};

function RootLayoutNav({onLayout}: RootLayoutNavProps) {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={{flex: 1}} onLayout={onLayout}>
			<ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name="onborad/onboardmain/AutoExpirationAlertScreen"
						options={{animation: 'none'}}
					/>
					<Stack.Screen
						name="onborad/onboarddiet/SelectDietScreen"
						options={{
							headerShown: true,
							title: '해당되는 식단을 알려주세요',
							headerBackTitle: '',
							animation: 'default'
						}}
					/>
					<Stack.Screen name="(tabs)/index" options={{animation: 'none'}} />
					<Stack.Screen name="(tabs)/(food)/index" options={{animation: 'none'}} />
				</Stack>
			</ThemeProvider>
			<Redirect href="/onborad/onboardmain/AutoExpirationAlertScreen" />
		</GestureHandlerRootView>
	);
}

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		'PretendardBold': require('../assets/fonts/Pretendard-Bold.otf'),
		'PretendardMedium': require('../assets/fonts/Pretendard-Medium.otf'),
		'PretendardSemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
	});

	useCallback(() => {
		if (fontError) {
			console.error('Font loading error:', fontError);
			throw fontError;
		}
	}, [fontError]);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (fontsLoaded) {
		return <RootLayoutNav onLayout={onLayoutRootView}/>;
	}
}