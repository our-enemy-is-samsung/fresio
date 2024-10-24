import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, Platform, SafeAreaView, StyleSheet, useColorScheme, Vibration} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from 'react-native-reanimated';
import LottieView from "lottie-react-native";
import ListLoading from '@/assets/lottie/listLoading.json';
import CheckAnimation from '@/assets/lottie/check.json';
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useEffect, useState} from "react";
import {Colors} from "@/shared/constants/Color";
import {useRouter} from "expo-router";

const PageFindingDevice = () => {
	const [findingDevice, setFindingDevice] = useState<{ name: string, id: string } | undefined>(undefined);
	const titleOpacity = useSharedValue(0);
	const titleTranslateY = useSharedValue(20);
	const descOpacity = useSharedValue(0);
	const descTranslateY = useSharedValue(20);
	const router = useRouter();
	const colorScheme = useColorScheme() ?? 'light';

	const lightVibration = () => {
		if (Platform.OS === 'android') {
			Vibration.vibrate(50);
		} else {
			Vibration.vibrate();
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setFindingDevice({
				name: 'FresioSmartFridge_V1',
				id: 'mkmlmko-1234-1234-1234-1234',
			});

			lightVibration();

			// 타이틀 애니메이션
			titleOpacity.value = withTiming(1, {duration: 300});
			titleTranslateY.value = withSpring(0, {
				damping: 20,
				stiffness: 90
			});

			// description 애니메이션
			descOpacity.value = withDelay(200, withTiming(1, {duration: 300}));
			descTranslateY.value = withDelay(200, withSpring(0, {
				damping: 20,
				stiffness: 90
			}));

		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const titleAnimatedStyle = useAnimatedStyle(() => ({
		opacity: titleOpacity.value,
		transform: [{translateY: titleTranslateY.value}]
	}));

	const descAnimatedStyle = useAnimatedStyle(() => ({
		opacity: descOpacity.value,
		transform: [{translateY: descTranslateY.value}]
	}));

	const AnimatedTextContent = ({
		                             children,
		                             size,
		                             color,
		                             textAlign,
		                             fontWeight,
		                             animatedStyle
	                             }: any) => (
		<Animated.Text
			style={[
				{
					fontSize: size,
					color: color,
					textAlign,
					fontWeight,
				},
				animatedStyle
			]}
		>
			{children}
		</Animated.Text>
	);

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					{!findingDevice ? (
						<Text size={TextSize.TitleSmall} color={'grayScale100'}>
							기기 찾는 중...
						</Text>
					) : (
						<>
							<AnimatedTextContent
								size={TextSize.TitleSmall}
								color={Colors[colorScheme]['grayScale100']}
								fontWeight={'600'}
								animatedStyle={titleAnimatedStyle}
							>
								Fresio 제품을 찾았어요
							</AnimatedTextContent>
							<AnimatedTextContent
								size={TextSize.BodyLarge}
								color={Colors[colorScheme]['grayScale60']}
								textAlign={'center'}
								fontWeight={'500'}
								animatedStyle={descAnimatedStyle}
							>
								{findingDevice.name}을(를) 등록 하시겠습니까?
							</AnimatedTextContent>
						</>
					)}
				</View>

				{!findingDevice ? (
					<LottieView
						autoPlay
						style={{
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').width,
							transform: [
								{scale: 1.1},
							]
						}}
						speed={0.7}
						source={ListLoading}
					/>
				) : (
					<View style={{
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').width,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<LottieView
							autoPlay
							loop={false}
							style={{
								width: 200,
								height: 200,
							}}
							speed={1}
							source={CheckAnimation}
						/>
					</View>
				)}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Secondary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
				>취소</Button>
				{findingDevice && (
					<Button
						radius={9999}
						style={ButtonStyle.Primary}
						size={ButtonSize.Small}
						buttonStyles={{paddingHorizontal: 36}}
						onPress={() => router.push('/(connect)/attachToFridge')}
					>다음</Button>
				)}
			</View>
		</SafeAreaView>
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
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
		paddingHorizontal: 20,
	},
	findingDeviceContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 28,
		paddingTop: 36,
		paddingHorizontal: 22,
	}
});

export default PageFindingDevice;