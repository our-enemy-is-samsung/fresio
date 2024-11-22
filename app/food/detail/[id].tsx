import {Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
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
import IngredientFAB from "@/components/food/ingredientFAB";
import {Column} from "@/components/shared/Column";
import {MaterialIcons} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router} from "expo-router";

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
		fetchIngredientById,
		updateIngredientList,
		deleteIngredientFromList
	} = useIngredientStore();

	useEffect(() => {
		fetchIngredientById(id);
	}, [id]);

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

	// 삭제 처리 함수
	const handleDelete = async (listItemId: string) => {
		Alert.alert(
			"재료 삭제",
			"정말 이 재료를 삭제하시겠습니까?",
			[
				{
					text: "취소",
					style: "cancel"
				},
				{
					text: "삭제",
					style: "destructive",
					onPress: async () => {
						try {
							await deleteIngredientFromList(id, listItemId);
						} catch (error) {
							Alert.alert("오류", "재료 삭제 중 오류가 발생했습니다.");
						}
					}
				}
			]
		);
	};

	// 수정 처리 함수
	const handleEdit = async (listItemId: string, newQuantity: string) => {
		try {
			await updateIngredientList({
				ingredientId: id,
				ingredientList: [{
					id: listItemId,
					quantity: newQuantity
				}]
			});
		} catch (error) {
			Alert.alert("오류", "재료 수정 중 오류가 발생했습니다.");
		}
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

	return (
		<>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" backgroundColor={'transparent'}/>
				{/* Left Arrow */}
				<TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
					<MaterialIcons name="arrow-back-ios" size={24} color={Colors.content}/>
				</TouchableOpacity>
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
						<Column style={{gap: 10}}>
							{currentIngredient.ingredientList.map((item) => (
								<IngredientItem
									key={item.id}
									ingredientName={currentIngredient.name}
									quantity={item.quantity}
									expiredAt={item.expiredAt}
									createdAt={item.createdAt}
									onEdit={(newQuantity) => handleEdit(item.id, newQuantity)}
									onDelete={() => handleDelete(item.id)}
									isLastItem={currentIngredient.ingredientList.indexOf(item) === currentIngredient.ingredientList.length - 1}
								/>
							))}
						</Column>
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
				<IngredientFAB ingredientId={id} onUpdate={() => fetchIngredientById(id)}/>
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
	backIcon: {
		position: 'absolute',
		top: 40,
		left: 22,
		zIndex: 2,
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