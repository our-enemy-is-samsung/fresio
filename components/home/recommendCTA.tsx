import {StyleSheet} from "react-native";
import React from "react";
import View from "@/components/shared/View";
import {View as NativeView} from 'react-native';
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import {Image} from "expo-image";
import ClockIcon from '@/assets/images/home/clock.png';
import {TouchableRipple} from "react-native-paper";

interface RecommendCTAProps {

}

const RecommendCTA = ({}: RecommendCTAProps) => {
	return (
		<>
			<TouchableRipple style={styles.container} onPress={() => console.log('asd')}>
				<>
					<Image source={ClockIcon} style={styles.icon}/>
					<NativeView>
						<StyledText size={TextSize.ContentSmall} color={'contentDim'}>가장 많이 찾는</StyledText>
						<StyledText size={TextSize.ContentLarge} color={'brand'} style={{fontWeight: 700}}>라면 타이머
							실행하기</StyledText>
					</NativeView>
				</>
			</TouchableRipple>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,

		borderRadius: 18,
		borderColor: Colors['containerDark'],
		borderWidth: 1,

		padding: 18,
		paddingVertical: 16,

		shadowRadius: 10,
	},
	icon: {
		width: 40,
		height: 40,
	}
});

export default RecommendCTA
