import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {Row} from "@/components/shared/Row";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Color";

interface SectionTitleProps {
	title: string;
	showMoreButton?: boolean;
	style?: ViewStyle;

	titleColor?: keyof typeof Colors;
	onPress?: () => void;
}

const SectionTitle = ({title, showMoreButton, style, titleColor = 'content', onPress}: SectionTitleProps) => {
	return (
		<Row style={{...styles.container, ...style}}>
			<StyledText size={TextSize.BodyLarge} color={titleColor}>{title}</StyledText>
			{showMoreButton && (
				<TouchableOpacity onPress={onPress} style={styles.button}>
					<StyledText size={TextSize.BodySmall} color={'brand'} style={{textDecorationLine: 'underline'}}>더보기</StyledText>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={Colors['brand']} />
				</TouchableOpacity>
			)}
		</Row>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

		paddingHorizontal: 22,
	},

	button: {
		flexDirection: 'row',
		alignItems: 'center',
	}
})

export default SectionTitle;