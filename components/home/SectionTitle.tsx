import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {StyleSheet, ViewStyle} from "react-native";
import {Row} from "@/components/shared/Row";

const SectionTitle = ({title, showMoreButton, style}: {title: string, showMoreButton?: boolean, style: ViewStyle}) => {
	return (
		<Row style={{...styles.container, ...style}}>
			<StyledText size={TextSize.HeadingSmall} color={'content'}>{title}</StyledText>
			{showMoreButton && <StyledText size={TextSize.BodySmall} color={'contentDim'} style={{textDecorationLine: 'underline'}}>더보기</StyledText>}
		</Row>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

		paddingHorizontal: 22,
	}
})

export default SectionTitle;