import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import PageHeader from "@/components/shared/PageHeader";
import {Colors} from "@/constants/Color";
import SectionContainer from "@/components/home/SectionContainer";
import SectionTitle from "@/components/home/SectionTitle";
import FoodLifeTime from "@/components/shared/Food";
import Recipe from "@/components/shared/Recipe";
import View from "@/components/shared/View";

const HomeScreen = () => {
	const date = new Date();
	date.setDate(date.getDate() - 3);

	const safeAreaInsets = useSafeAreaInsets();
	return (
		<>
			<ScrollView style={{
				...styles.container,
				backgroundColor: Colors['surface']
			}}>
				<LinearGradient colors={['rgba(244,144,47,0.34)', '#fff']} locations={[0, 0.85]}
				                style={{paddingTop: safeAreaInsets.top}}>
					<PageHeader name={'홈'}/>
				</LinearGradient>
				<View>
					<SectionContainer>
						<SectionTitle title={'유통기한이 임박한 식품'}/>
						<View style={{paddingVertical: 10}}>
							<FoodLifeTime emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={date}/>
							<FoodLifeTime emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()}/>
							<FoodLifeTime emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()}/>
							<FoodLifeTime.More/>
						</View>
					</SectionContainer>
					<SectionContainer>
						<SectionTitle title={'서늘한 저녁 이 음식은 어떤가요?'}/>
						<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingVertical: 14, paddingHorizontal: 22}}>
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
					<SectionContainer>
						<SectionTitle title={'🍕 냉장고에 피자가 있어 추천해요'}/>
						<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingVertical: 14, paddingHorizontal: 22}}>
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
	}
})

export default HomeScreen;