import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Color";
import {Row} from "@/components/shared/Row";
import {Column} from "@/components/shared/Column";
import {TextSize} from "@/enums/TextSize";
import StyledText from "@/components/shared/Text";
import {Image} from "expo-image";
import {RecipeDifficulty} from "@/types/Food/Food";
import {foodDifficutyToKorean} from "@/components/home/recommendRecipeCard";

// 인기 검색어 타입 정의
interface TrendingSearch {
    id: string;
    keyword: string;
    index?: number;
    thumbnailUrl?: string;
    time?: number;
    difficulty?: RecipeDifficulty;
}

// Mock 인기 검색어 데이터
const trendingSearches: TrendingSearch[] = [
    { id: '1',
        keyword: '마123약 김밥',
        thumbnailUrl: 'https://www.sbfoods-worldwide.com/ko/recipes/deq4os00000007qr-img/6_Kinpa.jpg',
        difficulty: RecipeDifficulty.HARD,
        time: 30
    },
    { id: '2', keyword: '된장찌개', thumbnailUrl: 'https://www.sbfoods-worldwide.com/ko/recipes/deq4os00000007qr-img/6_Kinpa.jpg', difficulty: RecipeDifficulty.EASY, time: 12},
];

const TrendingSearches = ({ onSelect }: { onSelect: (keyword: string) => void }) => {

    return (
        <Column style={styles.trendingContainer}>
            <StyledText size={TextSize.BodySmall} color="content" style={styles.trendingTitle}>
                인기 레시피
            </StyledText>
            {trendingSearches.map((item) => (
                <Pressable
                    key={item.id}
                    style={styles.trendingItem}
                    onPress={() => onSelect(item.keyword)}
                >
                    <Row style={styles.trendingItemContent}>
                        <StyledText size={TextSize.TitleSmall} color={'content'}>{item.id}</StyledText>
                        <Column style={{flex: 1, gap: 12}}>
                            <Image source={{ uri: item.thumbnailUrl }} style={styles.trendingImage} />
                            <Column>
                                <StyledText size={TextSize.HeadingSmall} color={'content'}>{item.keyword}</StyledText>
                                <StyledText size={TextSize.BodySmall} color={'contentDim'}>{foodDifficutyToKorean(item.difficulty ?? RecipeDifficulty.EASY)} · {item.time}분</StyledText>
                            </Column>
                        </Column>
                    </Row>
                </Pressable>
            ))}
        </Column>
    );
};

const styles = StyleSheet.create({
    trendingContainer: {
        padding: 16,
        gap: 12,
    },
    trendingTitle: {
        fontWeight: '600',
    },
    trendingItem: {
        paddingVertical: 22,
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.containerDark,
    },
    trendingItemContent: {
        gap: 22,
        alignItems: 'flex-start'
    },
    trendingImage: {
        width: '100%',
        height: 120,
        borderRadius: 12,
    }
});

export default TrendingSearches;