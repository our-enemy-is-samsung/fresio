import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, } from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/constants/Color";
// import * as Updates from 'expo-updates';

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
		background: Colors['surface'],
	}
};

function RootLayoutNav({onLayout}: RootLayoutNavProps) {
	return (
		<GestureHandlerRootView style={{flex: 1}} onLayout={onLayout}>
			<ThemeProvider value={MyDefaultTheme}>
				<Stack
					initialRouteName="index"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="index" options={{animation: 'none'}}/>
					<Stack.Screen name="food/index" options={{animation: 'none'}}/>
					<Stack.Screen name="onboard/connectDevice" options={{animation: 'none'}}/>
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}

// async function checkForUpdates() {
// 	try {
// 		const update = await Updates.checkForUpdateAsync();
// 		if (update.isAvailable) {
// 			await Updates.fetchUpdateAsync();
// 			await Updates.reloadAsync();
// 		}
// 	} catch (error) {
// 		console.error('Error checking for updates:', error);
// 	}
// }

export default function RootLayout() {
	// useEffect(() => {
	// 	checkForUpdates();
	// }, []);

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