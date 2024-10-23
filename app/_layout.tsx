import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	// 프리텐다드 폰트를 불러옵니다.
	const [loaded] = useFonts({
		PretendardBold: require('../assets/fonts/Pretendard-Bold.ttf'),
		PretendardMedium: require('../assets/fonts/Pretendard-Medium.ttf'),
		PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{headerShown: false}}/>
				<Stack.Screen name="+not-found"/>
			</Stack>
		</ThemeProvider>
	);
}
