import View from "@/components/atoms/View";
import {ScrollView, StyleSheet} from "react-native";
import PageHeader from "@/components/molecules/PageHeader";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";

const PageFood = () => {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<View style={{flex: 1}}>
			<LinearGradient colors={['rgba(47,214,244,0.34)', '#fff']} locations={[0, 0.85]}
			                style={{paddingTop: safeAreaInsets.top}}>
				<PageHeader name={'냉장고 음식'}/>
			</LinearGradient>
			<ScrollView style={styles.content}>
				<View style={styles.contentHeader}>
					<StyledText size={TextSize.BodySmall} color={'grayScale40'}>음식 38개</StyledText>
				</View>
			</ScrollView>
			<NavBarTemplate/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		marginTop: 32,
	},
	contentHeader: {}
})

export default PageFood;