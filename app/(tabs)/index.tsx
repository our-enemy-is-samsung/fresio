import PageHeader from "@/components/molecules/PageHeader";
import View from "@/components/atoms/View";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import SectionTitle from "@/feature/home/ui/SectionTitle";
import FoodLifeTime from "@/components/molecules/Food";

const HomeScreen = () => {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<>
			<View style={{flex: 1}}>
				<LinearGradient colors={['rgba(244,144,47,0.34)', '#fff']} locations={[0, 0.85]} style={{
					...styles.header,
					paddingTop: safeAreaInsets.top
				}}>
					<PageHeader name={'홈'}/>
				</LinearGradient>
				<View style={styles.content}>
					<SectionTitle title={'유통기한이 임박한 식품'}/>
					<View style={{paddingVertical: 10}}>
						<FoodLifeTime emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={new Date()}/>
						<FoodLifeTime emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()}/>
						<FoodLifeTime emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()}/>
						<FoodLifeTime.More />
					</View>
				</View>
			</View>
			<NavBarTemplate/>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingBottom: 16,
	},
	content: {
		marginTop: 12,
	}
})

export default HomeScreen;