import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from 'react-native-reanimated';
import LottieView from "lottie-react-native";
import ListLoading from '@/assets/lottie/listLoading.json';
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useEffect, useRef, useState} from "react";
import {Colors} from "@/shared/constants/Color";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {router} from "expo-router";

const PageWiFiList = () => {
	const [wifiList, setWifiList] = useState<Array<{ ssid: string, strength: number }>>([]);
	const [isScanning, setIsScanning] = useState(true);
	const [selectedSSID, setSelectedSSID] = useState<string | null>(null);
	const colorScheme = useColorScheme() ?? 'light';

	useEffect(() => {
		const timer = setTimeout(() => {
			// 테스트를 위해 더 많은 WiFi 목록 추가
			setWifiList([
				{ssid: "HOME_WIFI_5G", strength: 90},
				{ssid: "MyWiFi", strength: 75},
				{ssid: "Guest_Network", strength: 60},
				{ssid: "Office_WiFi", strength: 45},
				{ssid: "Public_WiFi", strength: 30},
				{ssid: "Coffee_Shop", strength: 85},
				{ssid: "Library_WiFi", strength: 70},
				{ssid: "Airport_Free", strength: 55},
				{ssid: "Hotel_Guest", strength: 40},
				{ssid: "Restaurant_5G", strength: 65}
			]);
			setIsScanning(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>
						Wi-Fi 연결
					</Text>
					<Text size={TextSize.BodyLarge} color={'grayScale60'}>
						Fresio가 연결할 Wi-Fi 네트워크를 선택해주세요
					</Text>
				</View>

				{isScanning ? (
					<LottieView
						autoPlay
						style={{
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').width,
							transform: [{scale: 1.1}]
						}}
						speed={0.7}
						source={ListLoading}
					/>
				) : (
					<ScrollView
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContent}
						showsVerticalScrollIndicator={false}
					>
						{wifiList.map((wifi, index) => (
							<WiFiItem
								key={index}
								ssid={wifi.ssid}
								strength={wifi.strength}
								index={index}
								selected={selectedSSID === wifi.ssid}
								onSelect={() => setSelectedSSID(wifi.ssid)}
							/>
						))}
					</ScrollView>
				)}
			</View>

			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Secondary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
				>
					이전
				</Button>
				{selectedSSID && (
					<Button
						radius={9999}
						style={ButtonStyle.Primary}
						size={ButtonSize.Small}
						buttonStyles={{paddingHorizontal: 36}}
						onPress={() => router.push('/(connect)/attachToFridge')}
					>
						다음
					</Button>
				)}
			</View>
		</SafeAreaView>
	);
};

const WiFiItem = ({ssid, strength, index, selected, onSelect}: {
	ssid: string,
	strength: number,
	index: number,
	selected: boolean,
	onSelect: () => void
}) => {
	const itemOpacity = useSharedValue(0);
	const itemTranslateY = useSharedValue(20);
	const isFirstRender = useRef(true);
	const colorScheme = useColorScheme() ?? 'light';

	useEffect(() => {
		if (isFirstRender.current) {
			itemOpacity.value = withDelay(index * 100, withTiming(1, {duration: 300}));
			itemTranslateY.value = withDelay(index * 100, withSpring(0, {
				damping: 20,
				stiffness: 90
			}));
			isFirstRender.current = false;
		}
	}, []);

	const itemAnimatedStyle = useAnimatedStyle(() => ({
		opacity: itemOpacity.value,
		transform: [{translateY: itemTranslateY.value}]
	}));

	const getSignalIcon = (strength: number, selected: boolean) => {
		if (strength >= 80) return <MaterialIcons name="network-wifi" size={24} color={selected ? 'white' : 'black'}/>;
		if (strength >= 60) return <MaterialIcons name="network-wifi-3-bar" size={24}
		                                          color={selected ? 'white' : 'black'}/>;
		if (strength >= 40) return <MaterialIcons name="network-wifi-2-bar" size={24}
		                                          color={selected ? 'white' : 'black'}/>;
		return <MaterialIcons name="network-wifi-1-bar" size={24} color={selected ? 'white' : 'black'}/>;
	};

	return (
		<Animated.View style={itemAnimatedStyle}>
			<TouchableOpacity
				onPress={onSelect}
				style={{
					...styles.wifiItem,
					backgroundColor: selected ? Colors[colorScheme]['brand50'] : 'transparent'
				}}
			>
				<View style={styles.wifiItemContent}
				      backgroundColor={selected ? 'brand50' : 'grayScale5'}>
					{getSignalIcon(strength, selected)}
					<Text
						size={TextSize.BodyLarge}
						color={selected ? 'white' : 'grayScale100'}
					>
						{ssid}
					</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		paddingTop: 42,
	},
	textContainer: {
		alignItems: 'center',
		gap: 20,

		paddingBottom: 32,
	},
	scrollView: {
		flex: 1,
	},
	scrollViewContent: {
		paddingHorizontal: 20,
		paddingBottom: 20,

		gap: 12,
	},
	wifiItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		padding: 16,

		borderRadius: 12,
	},
	wifiItemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,

		paddingTop: 12,
		paddingHorizontal: 20,
		paddingBottom: 20,

		backgroundColor: 'white',
	},
});

export default PageWiFiList;