import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {Row} from "@/components/shared/Row";

import SpinachIcon from '@/assets/images/home/spinach.png';
import MeatIcon from '@/assets/images/home/meat.png';
import SalmonIcon from '@/assets/images/home/salmon.png';
import CookieIcon from '@/assets/images/home/cookie.png';
import MilkIcon from '@/assets/images/home/milk.png';

import {Image} from "expo-image";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

interface SearchBarCategoryProps {

}

const SearchBarCategory = ({}: SearchBarCategoryProps) => {
	return (
		<Row style={styles.container}>
			<TouchableOpacity style={styles.item}>
				<Image source={SpinachIcon} style={styles.icon}/>
				<StyledText size={TextSize.LabelLarge} color={'content'} textAlign={'center'}>채소</StyledText>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Image source={MeatIcon} style={styles.icon}/>
				<StyledText size={TextSize.LabelLarge} color={'content'} textAlign={'center'}>고기</StyledText>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Image source={SalmonIcon} style={styles.icon}/>
				<StyledText size={TextSize.LabelLarge} color={'content'} textAlign={'center'}>해산물</StyledText>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Image source={MilkIcon} style={styles.icon}/>
				<StyledText size={TextSize.LabelLarge} color={'content'} textAlign={'center'}>유제품</StyledText>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Image source={CookieIcon} style={styles.icon}/>
				<StyledText size={TextSize.LabelLarge} color={'content'} textAlign={'center'}>간식</StyledText>
			</TouchableOpacity>
		</Row>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 22,

		width: '100%',

		justifyContent: 'space-around'
	},

	item: {
		display: 'flex',
		flexDirection: 'column',

		gap: 6
	},

	icon: {
		width: 42,
		height: 42,
	}
});

export default SearchBarCategory
