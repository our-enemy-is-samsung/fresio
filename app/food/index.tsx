import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import React from "react";
import StyledText from "@/components/shared/Text";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import FoodLifeTime from "@/components/food/Food";
import {Colors} from "@/constants/Color";
import {HomePageStyle} from "@/constants/Home/HomeStyle";

const PageFood = () => {
	const date = new Date();
	date.setDate(date.getDate() - 3);

	return (
		<>
			<SafeAreaView style={styles.container}>
				<PageHeader name={'냉장고 음식'}/>
				<View style={styles.content}>
					<ScrollView style={{flex: 1}}>
						<StyledText size={TextSize.BodyLarge} color={'contentSecondary'} style={styles.foodQuantity}>음식
							38개</StyledText>
						<FoodLifeTime emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={date} bigUI/>
						<FoodLifeTime emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🍠'} name={'고구마'} quantity={2} lifeTime={date} bigUI/>
						<FoodLifeTime emoji={'🧅'} name={'양파'} quantity={4} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🥑'} name={'아보카도'} quantity={1} lifeTime={new Date()} bigUI/>
						<View style={{height: 120}}/>
					</ScrollView>
				</View>
			</SafeAreaView>
			<NavBarTemplate/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',

		backgroundColor: Colors['success'],

		paddingTop: HomePageStyle.paddingTop,
	},

	content: {
		height: '100%',

		backgroundColor: Colors['surface'],

		paddingTop: 22,

		borderTopStartRadius: 18,
		borderTopEndRadius: 18,
	},

	foodQuantity: {
		paddingHorizontal: 22,
		paddingBottom: 10,
	}
})

export default PageFood;