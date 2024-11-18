import {StyleSheet} from "react-native";
import React from "react";
import {Image} from "expo-image";
import BackgroundBlur from '@/assets/images/onboard/Background.png';

interface OnboardBlurGradientProps {

}

const OnboardBlurGradient = ({}: OnboardBlurGradientProps) => {
	return (
		<Image source={BackgroundBlur} style={styles.image} />
	)
}

const styles = StyleSheet.create({
	image: {
		width: 800,
		height: 800,

		position: 'absolute',
		bottom: -430,
		left: -100,
	}
});

export default OnboardBlurGradient
