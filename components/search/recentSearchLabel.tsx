import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import AntDesign from "@expo/vector-icons/AntDesign";

interface RecentSearchLabelProps {
	name: string;
	onClose: () => void;
}

const RecentSearchLabel = ({name, onClose}: RecentSearchLabelProps) => {
	return (
		<TouchableOpacity onPress={() => onClose()} style={styles.container}>
			<StyledText size={TextSize.BodySmall} color={'contentDim'}>{name}</StyledText>
			<AntDesign name="close" size={18} color={Colors.contentDim} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.containerDark,
		alignSelf: 'flex-start',

		borderRadius: 9999,

		paddingVertical: 8,
		paddingHorizontal: 12,

		display: 'flex',
		flexDirection: 'row',
		gap: 4,
	}
});

export default RecentSearchLabel
