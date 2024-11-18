import React from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

const SectionTitle = ({title}: {title: string}) => {
	return (
		<StyledText size={TextSize.HeadingSmall} color={'content'} style={{marginHorizontal: 22}}>{title}</StyledText>
	)
}

export default SectionTitle;