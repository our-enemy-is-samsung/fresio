import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {StyleSheet, ViewStyle} from "react-native";
import {Row} from "@/components/shared/Row";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Color";

interface SectionTitleProps {
	title: string;
	showMoreButton?: boolean;
	style?: ViewStyle;

	titleColor?: keyof typeof Colors;
}

const SectionTitle = ({title, showMoreButton, style, titleColor = 'content'}: SectionTitleProps) => {
	return (
		<Row style={{...styles.container, ...style}}>
			<StyledText size={TextSize.BodyLarge} color={titleColor}>{title}</StyledText>
			{showMoreButton && (
				<Row>
					<StyledText size={TextSize.BodySmall} color={'brand'} style={{textDecorationLine: 'underline'}}>더보기</StyledText>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={Colors['brand']} />
				</Row>
			)}
		</Row>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

		paddingHorizontal: 22,
	},
})

export default SectionTitle;