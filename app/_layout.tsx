import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import {useColorScheme} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/shared/constants/Color";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		PretendardBold: require('../assets/fonts/Pretendard-Bold.otf'),
		PretendardRegular: require('../assets/fonts/Pretendard-Medium.otf'),
		PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.otf'),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav/>;
}

const MyDefaultTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: Colors['light']['grayScale5'],
	}
};

const MyDarkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: Colors['dark']['grayScale5'],
	},
};

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
				<Stack
					initialRouteName="(tabs)/(connect)/testingCamera"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(tabs)/index"/>
					<Stack.Screen name="(tabs)/(connect)/bluetoothRequired"/>
					<Stack.Screen name="(tabs)/(connect)/findingDevice"/>
					<Stack.Screen name="(tabs)/(connect)/wifiList"/>
					<Stack.Screen name="(tabs)/(connect)/attachToFridge"/>
					<Stack.Screen name="(tabs)/(connect)/testingCamera"/>
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}