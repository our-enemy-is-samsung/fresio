import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {useRoute} from '@react-navigation/native';
import NavBarTemplate from "@/components/template/NavBarTemplate";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import {Row} from "@/components/shared/Row";
import Recipe from "@/components/shared/Recipe";
import useIngredientStore from "@/state/ingredient";
import IngredientItem from "@/components/timer/details/TimerIngredientItem";
import {Image} from "expo-image";

interface RouteParams {
	id: string;
}

const PageFoodDetail = () => {
	const route = useRoute();
	const {id} = route.params as RouteParams;

	const {
		currentIngredient,
		isLoading,
		error,
		fetchIngredientById
	} = useIngredientStore();

	useEffect(() => {
		fetchIngredientById(id);
	}, [id]);

	console.log('currentIngredient', currentIngredient);

	// 이모지 매핑
	const getEmoji = (name: string): string => {
		const emojiMap: { [key: string]: string } = {
			'토마토': '🍅',
			'양파': '🧅',
			'당근': '🥕',
			'파프리카': '🫑',
			'옥수수': '🌽',
			'피자': '🍕',
			'고구마': '🍠',
			'아보카도': '🥑'
		};
		return emojiMap[name] || '🥬';
	};

	// 유틸리티 함수들
	const getExpiringSoonItems = () => {
		if (!currentIngredient?.ingredientList) return [];
		const now = new Date();
		const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
		return currentIngredient.ingredientList.filter(item => {
			const expireDate = new Date(item.expiredAt);
			return expireDate > now && expireDate <= threeDaysFromNow;
		});
	};

	const calculateRemainingDays = (expiryDate: Date): string => {
		const now = new Date();
		const diffTime = expiryDate.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) {
			return `${Math.abs(diffDays)}일 지남`;
		} else if (diffDays === 0) {
			return "오늘 만료";
		} else {
			return `${diffDays}일 남음`;
		}
	};

	const getExpiredItems = () => {
		if (!currentIngredient?.ingredientList) return [];
		const now = new Date();
		return currentIngredient.ingredientList.filter(item => {
			return new Date(item.expiredAt) <= now;
		});
	};

	const getTotalQuantity = () => {
		if (!currentIngredient?.ingredientList) return 0;
		return currentIngredient.ingredientList.reduce((sum, item) =>
			sum + Number(item.quantity), 0);
	};

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<PageHeader name="로딩 중..." style={{marginTop: 10}}/>
				<View style={styles.centerContent}>
					<StyledText size={TextSize.BodyLarge} color="contentDim">로딩 중...</StyledText>
				</View>
			</SafeAreaView>
		);
	}

	if (error || !currentIngredient) {
		return (
			<SafeAreaView style={styles.container}>
				<PageHeader name="오류" style={{marginTop: 10}}/>
				<View style={styles.centerContent}>
					<StyledText size={TextSize.BodyLarge} color="error">
						{error || '재료 정보를 불러올 수 없습니다'}
					</StyledText>
				</View>
			</SafeAreaView>
		);
	}

	const expiringSoon = getExpiringSoonItems();
	const expired = getExpiredItems();
	const totalQuantity = getTotalQuantity();

	console.log(currentIngredient.thumbnailImage)

	return (
		<>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" backgroundColor={'transparent'}/>
				<ScrollView style={{flex: 1}}>
					<View style={styles.header}>
						<Image
							source={{uri: currentIngredient.thumbnailImage}}
							style={{width: 140, height: 140, borderRadius: 9999, marginTop: 20}}
						/>
					</View>
					{/* 재료 요약 정보 */}
					<View style={styles.summaryContainer}>
						<Row style={styles.summaryRow}>
							<View>
								<StyledText size={TextSize.HeadingSmall} color="content">
									{getEmoji(currentIngredient.name)} {currentIngredient.name}
								</StyledText>
								<StyledText size={TextSize.BodySmall} color="contentDim" style={{marginTop: 4}}>
									총 {totalQuantity}개
								</StyledText>
							</View>
							<Row style={{gap: 12}}>
								<View style={styles.statBox}>
									<StyledText size={TextSize.BodySmall} color="error">
										{expired.length}개
									</StyledText>
									<StyledText size={TextSize.BodySmall} color="contentDim">
										소비기한 만료
									</StyledText>
								</View>
								<View style={styles.statBox}>
									<StyledText size={TextSize.BodySmall} color="brandDark">
										{expiringSoon.length}개
									</StyledText>
									<StyledText size={TextSize.BodySmall} color="contentDim">
										소비기한 임박
									</StyledText>
								</View>
							</Row>
						</Row>
					</View>

					{/* 재료 목록 */}
					<View style={styles.section}>
						<StyledText size={TextSize.BodyLarge} color="content" style={styles.sectionTitle}>
							기록된 재료
						</StyledText>
						{currentIngredient.ingredientList.map((item) => {
							return (
								<IngredientItem
									key={item.id}
									ingredientName={currentIngredient.name}
									quantity="1"
									expiredAt="2021-01-10"
									createdAt="2021-01-01"
									onEdit={() => console.log('편집')}
									onDelete={() => console.log('삭제')}
								/>
							)
						})}
					</View>

					{/* 추천 레시피 */}
					<View style={{
						...styles.section,
						marginTop: 50,
					}}>
						<StyledText size={TextSize.BodyLarge} color="content" style={styles.sectionTitle}>
							추천 레시피
						</StyledText>
						{currentIngredient.recommendRecipe.map((recipe) => (
							<Recipe
								key={recipe.id}
								name={recipe.name}
								imageUrl={recipe.thumbnailImage || "https://via.placeholder.com/100"}
								difficulty="쉬움"
								cookTime="20분"
							/>
						))}
					</View>

					<View style={{height: 100}}/>
				</ScrollView>
			</SafeAreaView>
			<NavBarTemplate/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: Colors['surface'],
	},
	header: {
		width: '100%',
		height: 240,

		backgroundColor: Colors.successBackground,

		paddingHorizontal: 22,

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	summaryContainer: {
		padding: 22,
		backgroundColor: Colors['surface'],
	},
	summaryRow: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	statBox: {
		backgroundColor: Colors['containerDark'],
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
		minWidth: 80,
	},
	section: {
		marginTop: 16,
		paddingHorizontal: 22,
	},
	sectionTitle: {
		marginBottom: 12,
		fontWeight: '600',
	},
});

export default PageFoodDetail;