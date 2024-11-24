import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Easing, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import StyledView from "@/components/shared/View";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import useToastStore from "@/state/toast";
import {useNavigation} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CustomAxios} from "@/utils/api";
import {router} from "expo-router";

interface WifiNetwork {
	SSID: string;
	level: number;
	capabilities: string;
}

interface WifiPasswordModalProps {
	isVisible: boolean;
	ssid: string;
	onClose: () => void;
	onSubmit: (password: string) => void;
}

const WifiPasswordModal = ({isVisible, ssid, onClose, onSubmit}: WifiPasswordModalProps) => {
	const [password, setPassword] = useState('');
	const [pending, setPending] = useState(false);
	const spinValue = new Animated.Value(0);

	const handleSubmit = () => {
		setPending(true);
		CustomAxios.post('/hardware/bridge/remote', {
  "data": {"next": 1}
}).then((res) => router.push('/onboard/nowPersonalSetting'))
			.finally(() => setPending(false));
	}

	useEffect(() => {
		if (pending) {
			Animated.loop(
				Animated.timing(spinValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				})
			).start();
		} else {
			spinValue.setValue(0);
		}
	}, [pending, spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	});

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<View style={styles.header}>
						<StyledText size={TextSize.HeadingSmall} color="content">
							{ssid} 비밀번호 입력
						</StyledText>
						<StyledText size={TextSize.BodySmall} color="contentDim" style={styles.subtitle}>
							비밀번호 입력
						</StyledText>
					</View>

					<TextInput
						style={styles.input}
						placeholder="비밀번호를 입력하세요"
						placeholderTextColor={Colors.contentSecondary}
						value={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						autoFocus={true}
						editable={!pending}
					/>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}
							disabled={pending}
						>
							<StyledText size={TextSize.ContentSmall} color="contentDim">
								취소
							</StyledText>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.submitButton]}
							onPress={handleSubmit}
							disabled={pending}
						>
							{pending ? (
								<Animated.View style={{transform: [{rotate: spin}]}}>
									<Ionicons name="refresh" size={20} color={Colors.surface}/>
								</Animated.View>
							) : (
								<StyledText size={TextSize.ContentSmall} color="surface">
									연결하기
								</StyledText>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const SelectWifiList = () => {
	const [wifiList, setWifiList] = useState<WifiNetwork[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSSID, setSelectedSSID] = useState<string>('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const {addToast} = useToastStore();
	const navigation = useNavigation();
	const inset = useSafeAreaInsets()

	const loadWifiList = useCallback(async () => {
		setIsLoading(true);
		try {
			const networks = await WifiManager.loadWifiList();

			setWifiList(networks);
		} catch (error) {
			console.error('Failed to load WiFi list:', error);
			addToast('Wi-Fi 리스트를 불러오는데 실패했습니다.', 'error');
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleWifiSelect = (ssid: string) => {
		setSelectedSSID(ssid);
		setIsModalVisible(true);
	};

	const handlePasswordSubmit = (password: string) => {
		addToast(`${selectedSSID}에 연결을 시도합니다.`, 'success');
		setIsModalVisible(false);
		// navigation.navigate('NextScreen', { ssid: selectedSSID, password });
	};

	useEffect(() => {
		loadWifiList();
	}, [loadWifiList]);

	return (
		<StyledView style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name="left" size={24} color={Colors.content}/>
				</TouchableOpacity>
			</View>

			<View style={styles.titleContainer}>
				<StyledText
					size={TextSize.TitleSmall}
					color="content"
					style={styles.title}
				>
					프레시오에 연결할 Wi-Fi를{'\n'}
					아래에서 선택해주세요
				</StyledText>
			</View>

			<View style={styles.listContainer}>
				<View style={styles.listHeader}>
					<StyledText size={TextSize.ContentLarge} color="contentDim">
						Wi-Fi 리스트
					</StyledText>
					<TouchableOpacity
						onPress={loadWifiList}
						disabled={isLoading}
					>
						<Ionicons
							name="refresh"
							size={20}
							color={Colors.contentDim}
							style={[
								styles.refreshIcon,
								isLoading && styles.refreshIconRotating
							]}
						/>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.scrollView}>
					{wifiList.map((wifi, index) => (
						<TouchableOpacity
							key={`${wifi.SSID}-${index}`}
							style={styles.wifiItem}
							onPress={() => handleWifiSelect(wifi.SSID)}
						>
							<Ionicons
								name="wifi"
								size={24}
								color={Colors.contentDim}
								style={styles.wifiIcon}
							/>
							<StyledText
								size={TextSize.ContentLarge}
								color="content"
							>
								{wifi.SSID}
							</StyledText>
						</TouchableOpacity>
					))}

					{wifiList.length === 0 && !isLoading && (
						<View style={styles.emptyContainer}>
							<StyledText
								size={TextSize.ContentSmall}
								color="contentDim"
							>
								주변에 Wi-Fi가 없습니다.
							</StyledText>
						</View>
					)}
				</ScrollView>
			</View>

			<WifiPasswordModal
				isVisible={isModalVisible}
				ssid={selectedSSID}
				onClose={() => setIsModalVisible(false)}
				onSubmit={handlePasswordSubmit}
			/>
		</StyledView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	header: {
		paddingBottom: 12,
		gap: 8,
	},
	backButton: {
		paddingTop: 20,
		paddingLeft: 20,
	},
	titleContainer: {
		paddingHorizontal: 20,
		marginTop: 0,
		marginBottom: 40,
	},
	title: {
		lineHeight: 34,
	},
	listContainer: {
		flex: 1,
	},
	listHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 12,
	},
	scrollView: {
		flex: 1,
	},
	wifiItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.surface,
	},
	wifiIcon: {
		marginRight: 12,
	},
	refreshIcon: {
		padding: 8,
	},
	refreshIconRotating: {
		opacity: 0.5,
	},
	addNetworkButton: {
		alignItems: 'center',
		paddingVertical: 16,
		backgroundColor: Colors.containerDark,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	// Modal styles
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '85%',
		backgroundColor: Colors.surface,
		borderRadius: 22,
		padding: 18,
	},
	subtitle: {
		marginTop: 8,
	},
	input: {
		width: '100%',
		height: 48,
		backgroundColor: Colors.containerDark,
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 24,
		color: Colors.content,
		fontSize: 16,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
	},
	button: {
		flex: 1,
		height: 48,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancelButton: {
		backgroundColor: Colors.containerDark,
	},
	submitButton: {
		backgroundColor: Colors.brand,
	},
});

export default SelectWifiList;