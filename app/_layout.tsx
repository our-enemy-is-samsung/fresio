import {DarkTheme, DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, useColorScheme} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/shared/constants/Color";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
					initialRouteName="(tabs)/index"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(tabs)/index"/>
					<Stack.Screen name="(tabs)/(food)/index" />
				</Stack>
			</ThemeProvider>
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