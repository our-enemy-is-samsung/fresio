import {StyleSheet} from "react-native";
import React from "react";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import TimerImage from '@/assets/images/timer/timer_example.png'
import {Image} from "expo-image";

const TimerStepPreviewNothing = () => {
	return (
		<View style={styles.container}>
			{/* TODO: 타이머의 설명이 들어갈 곳입니다*/}
			<StyledText size={TextSize.ContentSmall} color={'contentDim'}>아직 추가된 타이머가 없습니다{'\n'}타이머 추가 개념의 설명입니다{'\n'}아래 "타이머 단계 추가" 버튼을 눌러 타이머를 추가하세요.</StyledText>
			<Image source={TimerImage} style={styles.image}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.containerDark,

		padding: 22,

		borderRadius: 16,
	},

	image: {
		width: '100%',
		height: 240,

		borderRadius: 16,

		marginTop: 16,

		opacity: 0.9,
	}
});

export default TimerStepPreviewNothing
