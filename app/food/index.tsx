import {ScrollView, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import StyledText from "@/components/shared/Text";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import FoodLifeTime from "@/components/shared/Food";

const PageFood = () => {
	const safeAreaInsets = useSafeAreaInsets();
	const date = new Date();
	date.setDate(date.getDate() - 3);

	return (
		<>
			<ScrollView style={{flex: 1}}>
				<LinearGradient colors={['rgba(91,250,85,0.34)', '#fff']} locations={[0, 0.85]}
				                style={{paddingTop: safeAreaInsets.top}}>
					<PageHeader name={'냉장고 음식'}/>
				</LinearGradient>
				<View style={styles.content}>
					<View>
						<StyledText size={TextSize.BodyLarge} color={'contentSecondary'} style={styles.foodQuantity}>음식
							38개</StyledText>
						<FoodLifeTime emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={date} bigUI/>
						<FoodLifeTime emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🍠'} name={'고구마'} quantity={2} lifeTime={date} bigUI/>
						<FoodLifeTime emoji={'🧅'} name={'양파'} quantity={4} lifeTime={new Date()} bigUI/>
						<FoodLifeTime emoji={'🥑'} name={'아보카도'} quantity={1} lifeTime={new Date()} bigUI/>
						<View style={{height: 120}}/>
					</View>
				</View>
			</ScrollView>
			<NavBarTemplate/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		marginTop: 22,
	},
	foodQuantity: {
		paddingHorizontal: 22,
		paddingBottom: 10,
	}
})

export default PageFood;