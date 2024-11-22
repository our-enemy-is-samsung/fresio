import {Image, Platform, StyleSheet, TouchableOpacity, } from "react-native";
import {cloneElement, ReactElement, ReactNode} from "react";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import View from "@/components/shared/View";

interface ItemProps {
	icon: ReactElement;
	title: string;
	selected: boolean;
	onClick?: () => void;
}

function Item({icon, title, selected, onClick}: ItemProps) {
	// cloneElement를 사용하여 icon의 fill을 변경
	const modifiedIcon = cloneElement(icon, {
		size: 25,
		color: selected ? Colors['content'] : Colors['contentSecondary'],
	});

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={onClick} activeOpacity={0.7}>
			{modifiedIcon}
			<StyledText size={TextSize.LabelLarge} color={selected ? 'content' : 'contentSecondary'}>
				{title}
			</StyledText>
		</TouchableOpacity>
	);
}

export default function NavBar({children, testID}: { children: ReactNode, testID?: string }) {
	return (
		<View testID={testID} backgroundColor={'surface'} style={styles.container}>
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