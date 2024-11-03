import {StyleSheet, View} from "react-native";
import React from "react";
import {TouchableRipple} from "react-native-paper";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";

interface OnboardNextHeaderProps {

}

const OnboardNextHeader = ({}: OnboardNextHeaderProps) => {
	return (
		<View style={styles.container}>
			<TouchableRipple>
				<StyledText size={TextSize.HeadingSmall} color={'brand50'}>다음</StyledText>
			</TouchableRipple>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 12,
		paddingHorizontal: 22,

		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	}
});

export default OnboardNextHeader
