import React, {useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalSearchParams, useRouter} from 'expo-router';
import LottieView from "lottie-react-native";
import WifiManager from 'react-native-wifi-reborn';
import {TextSize} from "@/enums/TextSize";
import StyledText from "@/components/shared/Text";
import useToastStore from "@/state/toast";
import {Colors} from "@/constants/Color";

const WIFI_PREFIX = 'fresio';

const WifiLoadingScreen = () => {
	const {ssid} = useLocalSearchParams<{ ssid: string }>();
	const router = useRouter();
	const {addToast} = useToastStore();
	const mounted = useRef(true);

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
					if (mounted.current) {
						addToast('위치 권한이 거부되었습니다. Wi-Fi 검색이 불가능합니다.', 'error');
					}
					return false;
				}
			}
			return true;
		} catch (err) {
			if (mounted.current) {
				addToast('권한 요청 중 오류가 발생했습니다.', 'error');
				console.warn(err);
			}
			return false;
		}
	};

	const connectToWifi = async (wifiSSID: string) => {
		try {
			if (Platform.OS === 'android') {
				// Android의 경우 비밀번호가 필요할 수 있습니다.
				// 여기서는 오픈 네트워크를 가정합니다.
				console.log('Connecting to WiFi:', wifiSSID);
				await WifiManager.connectToProtectedSSID(wifiSSID, 'fresio_firo', false, false).then(() => {
					console.log('Connected to WiFi:', wifiSSID);
				})
			} else {
				// iOS의 경우 시스템 설정으로 이동하도록 안내
				addToast('iOS에서는 설정에서 직접 WiFi 연결이 필요합니다.', 'info');
			}
			addToast(`${wifiSSID}에 연결되었습니다.`, 'success');
			return true;
		} catch (error) {
			console.error('WiFi connection error:', error);
			addToast('Wi-Fi 연결 중 오류가 발생했습니다.', 'error');
			return false;
		}
	};

	useEffect(() => {
		mounted.current = true;
		let intervalId: NodeJS.Timeout;

		const scanWifi = async () => {
			if (!mounted.current) return;

			try {
				const hasPermission = await requestLocationPermission();
				if (!hasPermission) return;

				if (Platform.OS === 'android') {
					const wifiList = await WifiManager.loadWifiList();
					const filteredWifiList = wifiList.filter(wifi => wifi.SSID.startsWith(WIFI_PREFIX));

					if (mounted.current && filteredWifiList.length > 0) {
						// WiFi를 찾았을 때 interval 종료
						if (intervalId) {
							clearInterval(intervalId);
						}

						addToast(`${filteredWifiList.length}개의 프레시오 기기가 발견되었습니다.`, 'success');

						// 첫 번째 발견된 기기에 연결 시도
						const connected = await connectToWifi(filteredWifiList[0].SSID);
						console.log(connected)
						if (connected) {
							// router.push('/onboard/nowPersonalSetting');
						}
					}
				} else {
					const currentSSID = await WifiManager.getCurrentWifiSSID();
					if (!mounted.current) return;

					if (currentSSID.startsWith(WIFI_PREFIX)) {
						if (intervalId) {
							clearInterval(intervalId);
						}
						addToast('프레시오 기기에 연결되어 있습니다.', 'success');
						// router.push('/onboard/nowPersonalSetting');
					} else {
						addToast('프레시오 기기에 연결되어 있지 않습니다.', 'warn');
					}
				}
			} catch (error) {
				if (mounted.current) {
					console.error('WiFi scanning error:', error);
					// addToast('Wi-Fi 검색 중 오류가 발생했습니다.', 'error');
				}
			}
		};

		scanWifi();
		intervalId = setInterval(scanWifi, 3000);

		return () => {
			mounted.current = false;
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			addToast('프레시오 기기에 연결되었습니다.', 'success');
			router.push('/onboard/deprecated/asd');
		}, 4000)
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<StyledText
						size={TextSize.TitleMedium}
						color={'content'}
						textAlign={'center'}
					>
						프레시오에서{'\n'}기기 Wi-Fi를 연결중입니다
					</StyledText>
					<StyledText
						size={TextSize.ContentLarge}
						color={'contentDim'}
						style={{marginTop: 20}}
					>
						잠시만 기다려주세요
					</StyledText>
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
		fontSize: TextSize.HeadingLarge,
		fontWeight: '600',
		lineHeight: 28,
		letterSpacing: 0.42,
		marginBottom: 40,
	}
});

export default WifiLoadingScreen;