import {StyleSheet} from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import Logo from "@/assets/images/Logo";

interface PageHeaderProps {
	name: string;
}

const PageHeader = ({name}: PageHeaderProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.statusContainer}>
				<StyledText size={TextSize.HeadingLarge} color={'content'} style={{marginRight: 8}}>{name}</StyledText>
				<View style={styles.status} />
				<StyledText size={TextSize.BodySmall} color={'brandDark'}>연결됨</StyledText>
			</View>
			<TouchableRippleNative style={styles.touchable} onPress={() => console.log('asd')}>
				<Feather name="settings" size={21} color={Colors['content']} />
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
	},
	touchable: {
		padding: 8,

		right: -4,
	},
	statusContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	status: {
		width: 8,
		height: 8,
		borderRadius: 4,

		backgroundColor: Colors['brand'],
	}
});

export default PageHeader
