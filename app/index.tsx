import React from "react";
import {ScrollView, StatusBar, StyleSheet} from "react-native";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import PageHeader from "@/components/shared/PageHeader";
import {Colors} from "@/constants/Color";
import SectionContainer from "@/components/home/SectionContainer";
import SectionTitle from "@/components/home/SectionTitle";
import Recipe from "@/components/shared/Recipe";
import View from "@/components/shared/View";
import {HomePageStyle} from "@/constants/Home/HomeStyle";
import FoodLifeTimeCard from "@/components/food/FoodLifeTimeCard";

const HomeScreen = () => {
	const date = new Date();
	date.setDate(date.getDate() + 3);

	return (
		<>
			<StatusBar barStyle={'light-content'}/>
			<ScrollView style={styles.container}>
				<PageHeader name={'홈'}/>
				<ScrollView
					horizontal
					style={{paddingHorizontal: 14, paddingBottom: 18}}
					contentContainerStyle={{columnGap: 10}}
					showsHorizontalScrollIndicator={false}
				>
					<FoodLifeTimeCard emoji={'🍌'} name={'장원영'} quantity={2} lifeTime={new Date()}/>
					<FoodLifeTimeCard emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={new Date()}/>
					<FoodLifeTimeCard emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()}/>
					<FoodLifeTimeCard emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()}/>
					<FoodLifeTimeCard emoji={'🍤'} name={'새우튀김'} lifeTime={date} quantity={28}/>
					<View style={{width: 36}}/>
				</ScrollView>
				<View style={styles.content}>
					<SectionContainer>
						<SectionTitle title={'서늘한 저녁 이 음식은 어떤가요?'} showMoreButton/>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							style={{paddingVertical: 18, paddingHorizontal: 22}}
							contentContainerStyle={{rowGap: 10}}
						>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg"
								cookTime="40분"
								difficulty="어려움"
								onPress={() => console.log('레시피 선택')}
							/>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="data:image/jpeg;base64,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"
								cookTime="40분"
								difficulty="보통"
								onPress={() => console.log('레시피 선택')}
							/>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg"
								cookTime="40분"

								difficulty="보통"
								onPress={() => console.log('레시피 선택')}
							/>
							<View style={{width: 22}}/>
						</ScrollView>
					</SectionContainer>
					<SectionContainer>
						<SectionTitle title={'🍕 냉장고에 피자가 있어 추천해요'}/>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							style={{paddingVertical: 18, paddingHorizontal: 22}}
							contentContainerStyle={{rowGap: 10}}
						>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg"
								cookTime="40분"
								difficulty="보통"
								onPress={() => console.log('레시피 선택')}
							/>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg"
								cookTime="40분"
								difficulty="보통"
								onPress={() => console.log('레시피 선택')}
							/>
							<Recipe
								name="김치찌개가 첨가된 아침찬"
								imageUrl="https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg"
								cookTime="40분"
								difficulty="보통"
								onPress={() => console.log('레시피 선택')}
							/>
							<View style={{width: 22}}/>
						</ScrollView>
					</SectionContainer>
				</View>
			</ScrollView>
			<NavBarTemplate/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: Colors['brand'],

		paddingTop: HomePageStyle.paddingTop
	},

	content: {
		backgroundColor: Colors['surface'],

		// paddingTop: 22,

		borderTopStartRadius: 18,
		borderTopEndRadius: 18,
	}
})

export default HomeScreen;