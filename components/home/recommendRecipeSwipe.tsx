import React from "react";
import {StyleSheet} from "react-native";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import Swiper from "react-native-swiper";
import View from "@/components/shared/View";
import RecommendRecipeCard from "@/components/home/recommendRecipeCard";
import {RecipeDifficulty} from "@/types/Food/Food";

interface RecommendRecipeSwipeProps {
	title: string;
}

const RecommendRecipeSwipe = ({title}: RecommendRecipeSwipeProps) => {
	return (
		<>
			<StyledText
				size={TextSize.HeadingLarge}
				color={'content'}
			>{title}</StyledText>
			{/* 스와이프 구현 */}
			<Swiper
				loop={true} // 반복 스크롤을 비활성화
				showsPagination={true} // 페이지 인디케이터 활성화
				scrollEnabled={true}
				horizontal={true}
				activeDotColor={Colors['container']}
				dotColor={Colors['contentSecondary']}
				style={styles.swiper}
				activeDotStyle={styles.dot}
				dotStyle={styles.dot}
				paginationStyle={styles.pagination}
				containerStyle={{marginTop: 15}}
			>
				<RecommendRecipeCard
					imageSrc={'https://recipe1.ezmember.co.kr/cache/recipe/2017/10/23/6830fe676aff41c41d8dae5f41e09b6e1.jpg'}
					recipeName={'바나나 버터구이 프렌치 토스트'}
					difficulty={RecipeDifficulty.EASY}
					cookingTime={15}
				/>
				<RecommendRecipeCard
					imageSrc={'https://recipe1.ezmember.co.kr/cache/recipe/2022/05/23/8875bb58ff478de1e5d69c3e099763171.jpg'}
					recipeName={'대파 마리네이드'}
					difficulty={RecipeDifficulty.HARD}
					cookingTime={23}
				/>
			</Swiper>
		</>
	)
}

const styles = StyleSheet.create({
	container: {},

	swiper: {
		height: 400,

	},

	dot: {
       marginBottom: 30,
    },

    pagination: {  // 추가된 부분
       right: 22,  // 오른쪽 여백
       left: undefined,  // 기본 left 스타일 제거
       bottom: 0,
    }
});

export default RecommendRecipeSwipe
