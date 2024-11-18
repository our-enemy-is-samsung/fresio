import {StyleSheet} from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";

interface PageHeaderProps {
	name: string;
}

const PageHeader = ({name}: PageHeaderProps) => {

	return (
		<View style={styles.container}>
			<StyledText size={TextSize.TitleSmall} color={'container'} style={{top: -4}}>{name}</StyledText>
			<TouchableRippleNative style={styles.touchable} onPress={() => console.log('asd')}>
				<Feather name="settings" size={22} color="white" />
			</TouchableRippleNative>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 22,
		paddingVertical: 10,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		backgroundColor: 'transparent',
	},
	touchable: {
		padding: 8,

		top: -4,
		right: -4,
	}
});

export default PageHeader
