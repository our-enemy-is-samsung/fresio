import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {SafeAreaView, StyleSheet} from "react-native";
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import {useEffect, useRef} from "react";
import LottieView from "lottie-react-native";
import Confettie from '@/assets/lottie/confetti.json';
import CheckAnimation from "@/assets/lottie/check.json";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming
} from 'react-native-reanimated';

const PageFinishConnect = () => {
	const confettiRef = useRef<LottieView>(null);
	const translateY = useSharedValue(50);
	const opacity = useSharedValue(0);
	const descOpacity = useSharedValue(0);
	const descTranslateY = useSharedValue(50);

	useEffect(() => {
		confettiRef.current?.play(0);

		// Start animations after a brief delay
		translateY.value = withSequence(
			withDelay(500, // Wait for check animation
				withTiming(0, {
					duration: 800,
				})
			)
		);

		opacity.value = withSequence(
			withDelay(500,
				withTiming(1, {
					duration: 800,
				})
			)
		);

		// description 애니메이션
		descOpacity.value = withSequence(
			withDelay(800,
				withTiming(1, {
					duration: 800,
				})
			)
		);
		descTranslateY.value = withSequence(
			withDelay(1000,
				withSpring(0, {
					damping: 20,
					stiffness: 90
				})
			)
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{translateY: translateY.value}],
			opacity: opacity.value,
		};
	});

	const descAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{translateY: descTranslateY.value}],
		opacity: descOpacity.value,
	}));


	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<LottieView
				ref={confettiRef}
				source={Confettie}
				autoPlay={false}
				loop={false}
				style={styles.lottie}
				resizeMode='cover'
			/>
			<View style={styles.container}>
				<LottieView
					autoPlay
					loop={false}
					style={{
						width: 100,
						height: 100,
						marginBottom: 15,
					}}
					speed={1}
					source={CheckAnimation}
				/>
				<Animated.View style={[styles.textContainer, animatedStyle]}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>
						Fresio와 연결이 완료되었습니다!
					</Text>
				</Animated.View>
				<View style={{height: 14}} />
				<Animated.View style={{
					...styles.textContainer,
					...descAnimatedStyle,
					marginTop: 20,
				}}>
					<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'}>
						5초 후에 홈 화면으로 이동합니다
					</Text>
				</Animated.View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		alignItems: 'center',
		gap: 20,
	},
	lottie: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1000,
		pointerEvents: 'none',
	},
})

export default PageFinishConnect;