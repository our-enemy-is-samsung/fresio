import {Image, Platform, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {TextSize} from "@/shared/enums/TextSize";
import {cloneElement, ReactElement, ReactNode} from "react";
import {Colors} from "@/shared/constants/Color";
import StyledText from "@/components/atoms/Text";
import View from "@/components/atoms/View";

interface ItemProps {
	icon: ReactElement;
	title: string;
	selected: boolean;
	onClick?: () => void;
}

function Item({icon, title, selected, onClick}: ItemProps) {
	const colorScheme = useColorScheme() ?? 'light';

	// cloneElement를 사용하여 icon의 fill을 변경
	const modifiedIcon = cloneElement(icon, {
		size: 25,
		color: selected ? Colors[colorScheme]['grayScale70'] : Colors[colorScheme]['grayScale40'],
	});

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={onClick} activeOpacity={0.7}>
			{modifiedIcon}
			<StyledText size={TextSize.LabelLarge} color={selected ? 'grayScale70' : 'grayScale40'}>
				{title}
			</StyledText>
		</TouchableOpacity>
	);
}

export default function NavBar({children, testID}: { children: ReactNode, testID?: string }) {
	const colorScheme = useColorScheme() ?? 'light';
	return (
		<View testID={testID} style={{
			...styles.container,
			borderColor: Colors[colorScheme]['grayScale20'],
		}}>
			{children}
		</View>
	)
}

NavBar.Item = Item;

const styles = StyleSheet.create({
	container: {
		width: '100%',

		position: 'absolute',
		bottom: 0,

		borderTopWidth: 1,

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',

		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: Platform.OS === 'ios' ? 22 : 12, // iOS는 36px, Android는 24px
	},
	itemContainer: {
		width: 'auto',
		height: 46,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4
	},
	profileContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6
	}
});