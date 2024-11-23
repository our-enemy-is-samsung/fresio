import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalSearchParams, useRouter} from 'expo-router';
import LottieView from "lottie-react-native";
import WifiManager from 'react-native-wifi-reborn';
import {TextSize} from "@/enums/TextSize";
import StyledText from "@/components/shared/Text";
import useToastStore from "@/state/toast";
import {Colors} from "@/constants/Color";

const WIFI_PREFIX = 'FRESIO_';

const WifiLoadingScreen = () => {
	const {ssid} = useLocalSearchParams<{ ssid: string }>();
	const router = useRouter();
	const {addToast} = useToastStore();

	const requestLocationPermission = async () => {
		try {
			if (Platform.OS === 'android') {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: '위치 권한 요청',
						message: 'Wi-Fi 검색을 위해 위치 권한이 필요합니다.',
						buttonNeutral: '나중에',
						buttonNegative: '거절',
						buttonPositive: '허용',
					}
				);

				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					return true;
				} else {
					addToast('위치 권한이 거부되었습니다. Wi-Fi 검색이 불가능합니다.', 'error');
					return false;
				}
			}
			return true; // iOS는 앱 설정에서 권한 설정
		} catch (err) {
			addToast('권한 요청 중 오류가 발생했습니다.', 'error');
			console.warn(err);
			return false;
		}
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		const scanWifi = async () => {
			try {
				const hasPermission = await requestLocationPermission();
				if (!hasPermission) return;

				if (Platform.OS === 'android') {
					const wifiList = await WifiManager.loadWifiList();
					// Bl로 시작하는 WiFi만 필터링
					const filteredWifiList = wifiList.filter(wifi => wifi.SSID.startsWith(WIFI_PREFIX));
					console.log('Available Bl WiFi networks:', filteredWifiList);

					if (filteredWifiList.length > 0) {
						addToast(`${filteredWifiList.length}개의 프레시오 기기가 발견되었습니다.`, 'success');
					}
				} else {
					const currentSSID = await WifiManager.getCurrentWifiSSID();
					if (currentSSID.startsWith(WIFI_PREFIX)) {
						console.log('Connected to Bl WiFi:', currentSSID);
						addToast('프레시오 기기에 연결되어 있습니다.', 'success');
					} else {
						console.log('Current SSID (not Bl):', currentSSID);
						addToast('프레시오 기기에 연결되어 있지 않습니다.', 'warn');
					}
				}
			} catch (error) {
				console.error('WiFi scanning error:', error);
				addToast('Wi-Fi 검색 중 오류가 발생했습니다.', 'error');
			}
		};

		// 초기 스캔 실행
		scanWifi();

		// 3초마다 스캔 실행
		intervalId = setInterval(scanWifi, 3000);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			// router.push('/onboard/onboarddiet/RegisterFoodScreen');
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<StyledText size={TextSize.TitleMedium} color={'content'} textAlign={'center'}>프레시오에서{'\n'}기기 Wi-Fi를
						연결중입니다</StyledText>
					<StyledText size={TextSize.ContentLarge} color={'contentDim'} style={{marginTop: 20}}>잠시만
						기다려주세요</StyledText>
				</View>

				<View style={styles.loadingContainer}>
					<LottieView
						autoPlay
						loop
						style={{
							width: 200,
							height: 200,
						}}
						source={require('../../../assets/lottie/loading.json')}
					/>
				</View>

				<Text style={styles.ssidText}>
					{ssid}
				</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surfaceDim,
	},
	backButton: {
		position: 'absolute',
		top: 50,
		left: 10,
		zIndex: 1,
		padding: 8,
	},
	content: {
		padding: 22,
		flex: 1,
		marginTop: 58,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 32,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 40,
	},
	ssidText: {
		color: '#707085',
		textAlign: 'center',
		fontFamily: 'Wanted Sans Variable',
		fontSize: TextSize.HeadingLarge, // HeadingLarge 사용
		fontWeight: '600',
		lineHeight: 28,
		letterSpacing: 0.42,
		marginBottom: 40,
	}
});

export default WifiLoadingScreen;