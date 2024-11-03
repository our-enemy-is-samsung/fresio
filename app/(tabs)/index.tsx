import PageHeader from "@/components/molecules/PageHeader";
import View from "@/components/atoms/View";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import SectionTitle from "@/feature/home/ui/SectionTitle";
import FoodLifeTime from "@/components/molecules/Food";
import SectionContainer from "@/feature/home/ui/SectionContainer";

const HomeScreen = () => {
	const date = new Date();
	date.setDate(date.getDate() - 3);

	const safeAreaInsets = useSafeAreaInsets();
	return (
		<>
			<ScrollView style={{flex: 1}}>
				<LinearGradient colors={['rgba(244,144,47,0.34)', '#fff']} locations={[0, 0.85]} style={{paddingTop: safeAreaInsets.top}}>
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
					</SectionContainer>
				</View>
			</ScrollView>
			<NavBarTemplate/>
		</>
	);
}

const styles = StyleSheet.create({

})

export default HomeScreen;