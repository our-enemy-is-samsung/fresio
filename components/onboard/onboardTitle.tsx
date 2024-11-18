import {StyleSheet, View} from "react-native";
import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

interface OnboardTitleProps {
	title: string;
	description?: string;
}

const OnboardTitle = ({title, description}: OnboardTitleProps) => {
	return (
		<View style={styles.container}>
			<StyledText size={TextSize.TitleSmall} color={'content'}>{title}</StyledText>
			{description && <StyledText size={TextSize.ContentLarge} color={'contentDim'} textAlign={'center'}>{description}</StyledText>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 20,

		paddingHorizontal: 22,
		paddingTop: 20,

		alignItems: 'center',
	}
});

export default OnboardTitle
