import {Platform, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";
import View from "@/components/shared/View";
import BackIcon from "@/components/onboard/BackIcon";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

interface BackButtonHeaderProps {
	name?: string;
}

const BackButtonHeader = ({
	                          name,
                          }: BackButtonHeaderProps) => {
	const colorScheme = useColorScheme() ?? 'light';
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<TouchableOpacity
					style={styles.touchable}
					testID={'back-button'}
					onPress={() => {
						if (navigation.canGoBack()) {
							navigation.goBack();
						}
					}}
				>
					<BackIcon />
				</TouchableOpacity>
				{name && (
					<StyledText
						size={TextSize.HeadingSmall}
						color={'content'}
					>
						{name}
					</StyledText>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: Platform.OS === 'ios' ? 0 : 12,
		paddingHorizontal: 16,
		marginBottom: 10,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	touchable: {
		minWidth: 50,
		padding: 4,
		marginLeft: -4,
	},
	dotMenuTouchable: {
		minWidth: 50,
		padding: 4,
		marginRight: -4,
		alignItems: 'flex-end',
	}
})

export default BackButtonHeader;