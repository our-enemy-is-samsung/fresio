import {DefaultTheme, Theme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, Redirect} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, View,} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Colors} from "@/constants/Color";
import Toast from "@/components/shared/Toast";
import useToastStore from "@/state/toast";
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

function RootLayoutNav({onLayout}: RootLayoutNavProps) {
	const {toasts} = useToastStore();

	return (
		<GestureHandlerRootView style={{flex: 1}} onLayout={onLayout}>
			<ThemeProvider value={MyDefaultTheme}>
				<Stack
					initialRouteName="index"
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
					<Stack.Screen name="index" options={{animation: 'none'}}/>
					<Stack.Screen name="food/index" options={{animation: 'none'}}/>
					<Stack.Screen name="timer/index" options={{animation: 'none'}}/>
					<Stack.Screen name="timer/create"/>
					<Stack.Screen name="timer/detail/[id]"/>
					<Stack.Screen name="food/detail/[id]"/>
					<Stack.Screen name="search/index"/>
					<Stack.Screen name="recipe/[id]" />
					<Stack.Screen name="setting/index"/>
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