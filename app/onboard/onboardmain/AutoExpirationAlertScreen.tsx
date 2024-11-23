import React from 'react';
import {Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {useRouter} from 'expo-router';
import GoogleIcon from '@/components/onboard/GoogleIcon';
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

const {width} = Dimensions.get('window');

const FirstSlide = () => (
	<View style={styles.slide}>
		<View style={styles.headerContainer}>
			<StyledText size={TextSize.TitleMedium} color="content">
				자동 유통기한 알림
			</StyledText>
			<StyledText size={TextSize.ContentLarge} color="contentDim" textAlign={'center'}>
				잊기 쉬운 유통기한 관리,{'\n'}
				이제는 앱이 자동으로 알려드려요
			</StyledText>
		</View>
		<View style={styles.containerWrapper}>
			<Image
				source={require('@/assets/images/onboard/onboard_pushnoti.png')}
				style={styles.slideImage}
				resizeMode="contain"
			/>
		</View>
	</View>
);

const SecondSlide = () => (
	<View style={styles.slide}>
		<StatusBar style="dark"/>
		<View style={styles.headerContainer}>
			<StyledText size={TextSize.TitleMedium} color="content">
				사용자 맞춤 레시피 추천
			</StyledText>
			<StyledText size={TextSize.ContentLarge} color="contentDim" textAlign={'center'}>
				맞춤형 레시피로 더 쉽고 건강한 밥상{'\n'}
				영양가 있는 맞춤형 레시피를 추천해드려요
			</StyledText>
		</View>
		<View style={styles.containerWrapper}>
			<Image
				source={require('@/assets/images/onboard/onboard_recipe.png')}
				style={styles.slideImage}
				resizeMode="contain"
			/>
		</View>
	</View>
);

const ThirdSlide = () => (
	<View style={styles.slide}>
		<View style={styles.headerContainer}>
			<StyledText size={TextSize.TitleMedium} color="content">
				요리에 집중한 타이머
			</StyledText>
			<StyledText size={TextSize.ContentLarge} color="contentDim" textAlign={'center'}>
				총 요리 시간을 계산해드리고,{'\n'}
				재료별 조리시작 시간을 알려드릴게요
			</StyledText>
		</View>
		<View style={styles.containerWrapper}>
			<Image
				source={require('@/assets/images/image.png')}
				style={styles.slideImage}
				resizeMode="contain"
			/>
		</View>
	</View>
);

const AutoExpirationAlertScreen = () => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const router = useRouter();

	const dotWidths = React.useRef([
		new Animated.Value(25),
		new Animated.Value(8),
		new Animated.Value(8),
	]).current;

	React.useEffect(() => {
		dotWidths.forEach((width, index) => {
			Animated.timing(width, {
				toValue: index === currentIndex ? 25 : 8,
				duration: 300,
				useNativeDriver: false,
			}).start();
		});
	}, [currentIndex]);

	const handleGoogleLogin = () => {
		router.push('/onboard/beforeCamera');
	};

	const PageIndicator = () => (
		<View style={styles.pageIndicator}>
			{[0, 1, 2].map((index) => (
				<Animated.View
					key={index}
					style={[
						styles.dot,
						{
							width: dotWidths[index],
							backgroundColor:
								index === currentIndex
									? Colors.content
									: Colors.contentSecondary,
						}
					]}
				/>
			))}
		</View>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar style="dark"/>
			<View style={styles.mainContainer}>
				<Swiper
					loop={false}
					showsPagination={false}
					autoplay={false}
					onIndexChanged={setCurrentIndex}
					scrollEnabled={true}
					removeClippedSubviews={false}
				>
					<FirstSlide/>
					<SecondSlide/>
					<ThirdSlide/>
				</Swiper>
				<View style={styles.bottom}>
					<PageIndicator/>
					<TouchableOpacity
						style={styles.button}
						onPress={handleGoogleLogin}
					>
						<View style={styles.buttonContent}>
							<StyledText
								size={TextSize.HeadingSmall}
								color="surface"
								textAlign={'center'}
								style={{width: '100%'}}
							>
								눌러서 시작하기
							</StyledText>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.surfaceDim,
	},
	mainContainer: {
		flex: 1,
	},
	slide: {
		flex: 1,
		width,
		alignItems: 'center',
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: 80,
		marginBottom: 32,
		zIndex: 1,
		gap: 15,
	},
	containerWrapper: {
		position: 'absolute',
		width: width,
		top: '50%',
		transform: [{translateY: -204.5}],
	},
	slideImage: {
		width: width - 60,
		marginHorizontal: 30,
		height: 409,
	},
	bottom: {
		width: '100%',
		alignItems: 'center',
		position: 'absolute',
		bottom: 40,
		paddingHorizontal: 20,
	},
	pageIndicator: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	dot: {
		height: 8,
		borderRadius: 33,
		margin: 5,
		marginBottom: 60,
	},
	button: {
		backgroundColor: Colors.brand,
		borderRadius: 22,
		width: 358,
		height: 59,
		justifyContent: 'center',
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: '100%',
	},
	iconContainer: {
		position: 'absolute',
		left: 20,
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
	},
});

export default AutoExpirationAlertScreen;