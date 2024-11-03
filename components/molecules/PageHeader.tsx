import {StyleSheet} from "react-native";
import React from "react";
import View from "@/components/atoms/View";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import Feather from '@expo/vector-icons/Feather';
import {TouchableRipple} from "react-native-paper";
import {useNavigation} from "expo-router";
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";

interface PageHeaderProps {
	name: string;
}

const PageHeader = ({name}: PageHeaderProps) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<StyledText size={TextSize.TitleSmall} color={'grayScale100'} style={{top: -4}}>{name}</StyledText>
			<TouchableRippleNative style={styles.touchable} onPress={() => console.log('asd')}>
				<Feather name="settings" size={22} color="black" />
			</TouchableRippleNative>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 22,
		paddingVertical: 16,

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
