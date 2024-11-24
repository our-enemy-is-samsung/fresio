import {Pressable, StyleSheet, View} from "react-native";
import React from "react";
import {Image} from "expo-image";
import {LinearGradient} from 'expo-linear-gradient';
import {RecipeDifficulty} from "@/types/Food/Food";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
//Icons
import AntDesign from '@expo/vector-icons/AntDesign';

interface RecommendRecipeCardProps {
	imageSrc: string;
	recipeName: string;
	difficulty: RecipeDifficulty;
	cookingTime: number;
	onPress?: () => void;
}

export function foodDifficutyToKorean(difficulty: RecipeDifficulty) {
	switch (difficulty) {
		case RecipeDifficulty.EASY:
			return '초보도 가능해요';
		case RecipeDifficulty.NORMAL:
			return '조금 어려워요';
		case RecipeDifficulty.HARD:
			return '어려울 수 있어요';
	}
}

const RecommendRecipeCard = ({
	                             imageSrc,
	                             recipeName,
	                             difficulty,
	                             cookingTime,
	onPress
                             }: RecommendRecipeCardProps) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			{/* 이미지 */}
			<Image
				source={imageSrc}
				style={styles.image}
				contentFit="cover"
			/>
			{/* 그라디언트 오버레이 */}
			<LinearGradient
				colors={['transparent', 'rgba(0,0,0,0.8)']}
				style={styles.gradient}
			/>
			{/* 레시피 정보 */}
			<View style={styles.infoContainer}>
				<StyledText
					size={TextSize.TitleLarge}
					color="surface"
					style={styles.recipeName}
				>
					{recipeName}
				</StyledText>
				<View style={styles.detailsContainer}>
					<View style={styles.detail}>
						<StyledText
							size={TextSize.HeadingSmall}
							color={'contentSecondary'}
						>
							{foodDifficutyToKorean(difficulty) || '불러올 수 없음'}
						</StyledText>
					</View>
					<View style={styles.detail}>
						<AntDesign name={'clockcircle'} size={18} color="#FFFFFF"/>
						<StyledText
							size={TextSize.HeadingSmall}
							color="surface"
						>
							{cookingTime || '불러올 수 없음'}분
						</StyledText>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',

		backgroundColor: '#F5F5F5',

		borderRadius: 18,

		overflow: 'hidden',
	},
	image: {
		flex: 1,
		borderRadius: 14,
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: '100%',
		borderRadius: 14,
	},
	infoContainer: {
		gap: 6,

		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,

		padding: 28
	},
	recipeName: {
		marginBottom: 8,
		fontWeight: '600',
	},
	detailsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	detail: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	}
});

export default RecommendRecipeCard;