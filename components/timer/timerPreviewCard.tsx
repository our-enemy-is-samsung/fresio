import React from "react";
import {TouchableRipple} from "react-native-paper";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Dimensions, StyleSheet} from "react-native";
import getTimerRandomBackgroundColor from "@/utils/timer/getRandomBackgroundColor";
import {Colors} from "@/constants/Color";
import {Column} from "@/components/shared/Column";

interface TimerPreviewCardProps {

}

const TimerPreviewCard = ({}: TimerPreviewCardProps) => {
	const size = Dimensions.get('window').width / 2 - 22 - 5;

	return (
		<TouchableRipple
			style={{
				...styles.container,
				width: size,
				height: size,
				backgroundColor: getTimerRandomBackgroundColor(),
			}}
			onPress={() => {
			}}
			android_ripple={{
				radius: 22,
			}}
			borderless
		>
			<Column style={{gap: 10, justifyContent: 'space-between', flex: 1}}>
				<StyledText size={TextSize.TitleSmall} color={'container'}>계란 반숙</StyledText>
				<Column>
					<StyledText size={TextSize.HeadingSmall} color={'container'} style={styles.job}>3개 작업</StyledText>
					<StyledText size={TextSize.TitleMedium} color={'container'} style={styles.time}>3분 30초</StyledText>
				</Column>
			</Column>
		</TouchableRipple>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 22,

		display: 'flex',
		justifyContent: 'space-between',
		gap: 30,

		padding: 22
	},

	job: {
		opacity: 0.8,
	},
	time: {
		opacity: 0.9,
	},

	playButton: {
		backgroundColor: Colors['content'],

		borderRadius: 9999,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		paddingVertical: 12,
	}
});

export default TimerPreviewCard
