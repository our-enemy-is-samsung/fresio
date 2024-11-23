import {Dimensions, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import {Image} from "expo-image";
import {router} from "expo-router";

const WehaveLocationPermission = () => {
	const inset = useSafeAreaInsets();
	const handlePress = () => {
		router.push('/onboard/onboarddiet/WifiLoadingScreen')
	}
	return (
		<View style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<StatusBar barStyle="dark-content" backgroundColor={Colors.surfaceDim} />
			<View style={styles.headerContainer}>
				<StyledText size={TextSize.TitleMedium} color="content" textAlign={'center'}>
					기기를 연결하려면 위치 권한이 필요해요
				</StyledText>
				<StyledText size={TextSize.ContentLarge} color="contentDim" textAlign={'center'}>
					기기 연결에만 사용하니 안심하고 허용해주세요
				</StyledText>
			</View>
			<View style={{height: 500, alignItems: 'center', justifyContent: 'center'}}>
				<Image
					source={require('@/assets/images/onboard/onboard_howto_location.png')}
					style={{width: 300, height: 400}}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handlePress()}
				>
					<View style={styles.buttonContent}>
						<StyledText
							size={TextSize.HeadingSmall}
							color="surface"
							textAlign={'center'}
							style={{width: '100%'}}
						>
							확인했습니다
						</StyledText>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surfaceDim
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: 80,
		marginBottom: 32,
		zIndex: 1,
		gap: 15,
	},
	button: {
		backgroundColor: Colors.brand,
		borderRadius: 22,
		width: 358,
		height: 59,
		justifyContent: 'center',
	},
	bottom: {
		width: '100%',
		alignItems: 'center',
		position: 'absolute',
		bottom: 40,
		paddingHorizontal: 20,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: '100%',
	},
});

export default WehaveLocationPermission;
