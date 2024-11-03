import {TextSize} from "@/shared/enums/TextSize";
import StyledText from "@/components/atoms/Text";
import React from "react";

const SectionTitle = ({title}: {title: string}) => {
	return (
		<StyledText size={TextSize.HeadingSmall} color={'grayScale100'} style={{marginHorizontal: 22}}>{title}</StyledText>
	)
}

export default SectionTitle;