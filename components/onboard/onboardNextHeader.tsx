import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

interface OnboardNextHeaderProps {
	onPress: () => void;
}

const OnboardNextHeader = ({onPress}: OnboardNextHeaderProps) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onPress}>
				<StyledText size={TextSize.HeadingSmall} color={'brand'}>다음</StyledText>
			</TouchableOpacity>
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
