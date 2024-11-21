import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import React, {useState} from "react";
import StyledText from "@/components/shared/Text";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import FoodLifeTime from "@/components/food/Food";
import {Colors} from "@/constants/Color";
import {HomePageStyle} from "@/constants/Home/HomeStyle";
import {Row} from "@/components/shared/Row";
import SortButton from "@/components/food/sortButton";

const PageFood = () => {
	const date = new Date();
	date.setDate(date.getDate() - 3);

	const [sorted, setSorted] = useState<'expired' | 'updateAt'>('expired');

	return (
		<>
			<SafeAreaView style={styles.container}>
				<PageHeader name={'냉장고 재료'} style={{marginTop: 10}}/>
				<ScrollView style={{flex: 1}}>
					<Row style={styles.header}>
						<StyledText size={TextSize.BodyLarge} color={'contentDim'}>재료 38개</StyledText>
						<Row style={{gap: 8}}>
							<SortButton isActive={sorted === 'expired'} onPress={() => setSorted('expired')}>
								소비기한 순
							</SortButton>
							<SortButton isActive={sorted === 'updateAt'} onPress={() => setSorted('updateAt')}>
								최근 추가 순
							</SortButton>
						</Row>
					</Row>
					<FoodLifeTime emoji={'🫑'} name={'파프리카'} quantity={2} lifeTime={date} bigUI/>
					<FoodLifeTime emoji={'🌽'} name={'옥수수'} quantity={4} lifeTime={new Date()} bigUI/>
					<FoodLifeTime emoji={'🍕'} name={'피자'} quantity={1} lifeTime={new Date()} bigUI/>
					<FoodLifeTime emoji={'🍠'} name={'고구마'} quantity={2} lifeTime={date} bigUI/>
					<FoodLifeTime emoji={'🧅'} name={'양파'} quantity={4} lifeTime={new Date()} bigUI/>
					<FoodLifeTime emoji={'🥑'} name={'아보카도'} quantity={1} lifeTime={new Date()} bigUI/>
					<View style={{height: 100}}/>
				</ScrollView>
			</SafeAreaView>
			<NavBarTemplate/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',

		backgroundColor: Colors['surface'],

		paddingTop: HomePageStyle.paddingTop,
	},

	header: {
		paddingHorizontal: 22,
		paddingVertical: 5,

		justifyContent: 'space-between',
		alignItems: 'center',
	}
})

export default PageFood;