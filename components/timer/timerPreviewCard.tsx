import React from "react";
import {TouchableRipple} from "react-native-paper";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Dimensions, StyleSheet, Text} from "react-native";
import {Colors} from "@/constants/Color";
import {Column} from "@/components/shared/Column";
import View from "@/components/shared/View";
import getTimerRandomBackgroundColor from "@/utils/timer/getRandomBackgroundColor";
import {Row} from "@/components/shared/Row";
import {minNumberToTime} from "@/utils/minNumberToTime";

interface TimerPreviewCardProps {
	emoji: string;
	timerName: string;
	jobCount: number;
	duration: number;
}

const TimerPreviewCard = ({emoji, timerName, duration, jobCount}: TimerPreviewCardProps) => {
	const size = Dimensions.get('window').width / 2 - 22 - 5;

	return (
		<TouchableRipple
			style={{
				...styles.container,
				width: size,
				height: 160,
				backgroundColor: Colors['surface'],
			}}
			onPress={() => {
			}}
			android_ripple={{
				radius: 22,
			}}
			borderless
		>
			<>
				<View
					style={{
						...styles.strip,
						backgroundColor: getTimerRandomBackgroundColor(),
					}}
				/>
				<Column style={styles.content}>
					<Row style={{gap: 6}}>
						<Text style={{fontSize: 16}}>{emoji}</Text>
						<StyledText size={TextSize.HeadingSmall} color={'content'}>{timerName}</StyledText>
					</Row>
					<Column>
						{jobCount > 1 && (
							<StyledText
								size={TextSize.BodySmall}
								color={'contentSecondary'}
							>{jobCount}개 작업</StyledText>
						)}
						{duration && (
							<StyledText
								size={TextSize.HeadingLarge}
								color={'contentDim'}
							>{minNumberToTime(duration)}</StyledText>
						)}
					</Column>
				</Column>
			</>
		</TouchableRipple>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,

		display: 'flex',

		borderWidth: 1,
		borderColor: Colors['containerDark'],
	},

	strip: {
		width: '100%',
		height: 8,
	},

	content: {
		flex: 1,

		padding: 18,

		justifyContent: 'space-between',
	},

	// playButton: {
	// 	backgroundColor: Colors['content'],
	//
	// 	borderRadius: 9999,
	//
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	//
	// 	paddingVertical: 12,
	// }
});

export default TimerPreviewCard
