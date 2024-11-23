import {StyleSheet, ViewStyle} from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import {router} from "expo-router";

interface PageHeaderProps {
	name: string;
	style?: ViewStyle;
}

const PageHeader = ({name, style}: PageHeaderProps) => {
	return (
		<View style={{...styles.container, ...style}}>
			<View style={styles.statusContainer}>
				<StyledText size={TextSize.HeadingLarge} color={'content'} style={{marginRight: 8}}>{name}</StyledText>
				<View style={styles.status} />
				<StyledText size={TextSize.BodySmall} color={'brandDark'}>연결됨</StyledText>
			</View>
			<TouchableRippleNative
				style={styles.touchable}
				onPress={() => router.push('/setting')}
				android_ripple={{
					radius: 18,
				}}
				borderless
				 rippleColor="rgba(0, 0, 0, .1)"
			>
				<Feather name="settings" size={21} color={Colors['content']} />
			</TouchableRippleNative>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',

		paddingHorizontal: 22,
		paddingVertical: 10,

		backgroundColor: Colors['surface'],

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	touchable: {
		padding: 8,

		right: -4,

		borderRadius: 18,
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