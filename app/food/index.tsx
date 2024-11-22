import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import React, {useEffect, useState} from "react";
import StyledText from "@/components/shared/Text";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import FoodLifeTime from "@/components/food/Food";
import {Colors} from "@/constants/Color";
import {HomePageStyle} from "@/constants/Home/HomeStyle";
import {Row} from "@/components/shared/Row";
import SortButton from "@/components/food/sortButton";
import ExpandableFAB from "@/components/food/FoodAddFAB";
import useIngredientStore from "@/state/ingredient";
import {router} from "expo-router";

const PageFood = () => {
    const [sorted, setSorted] = useState<'expired' | 'updateAt'>('expired');
    const {ingredients, isLoading, error, fetchIngredients} = useIngredientStore();

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleCameraPress = () => {
        console.log('Camera button pressed');
        // 카메라 관련 로직 구현
    };

    const handleFormPress = () => {
        console.log('Form button pressed');
        // 폼 입력 관련 로직 구현
    };

    // 정렬된 재료 목록 생성 (재료 그룹화는 더 이상 필요하지 않음)
    const sortedIngredients = [...ingredients].sort((a, b) => {
        if (sorted === 'expired') {
            return new Date(a.expiredAt).getTime() - new Date(b.expiredAt).getTime();
        } else {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    // 이모지 매핑 (기본 이모지 설정)
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

    const handleIngredientPress = (id: string) => {
        console.log(`Ingredient ${id} pressed`);
        router.push(`/food/detail/${id}`);
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <PageHeader name={'냉장고 재료'} style={{marginTop: 10}}/>
                <ScrollView style={{flex: 1}}>
                    <Row style={styles.header}>
                        <StyledText size={TextSize.BodyLarge} color={'contentDim'}>
                            재료 {ingredients.length}개
                        </StyledText>
                        <Row style={{gap: 8}}>
                            <SortButton
                                isActive={sorted === 'expired'}
                                onPress={() => setSorted('expired')}
                            >
                                소비기한 순
                            </SortButton>
                            <SortButton
                                isActive={sorted === 'updateAt'}
                                onPress={() => setSorted('updateAt')}
                            >
                                최근 추가 순
                            </SortButton>
                        </Row>
                    </Row>

                    {isLoading ? (
                        <View style={styles.centerContent}>
                            <StyledText size={TextSize.BodyLarge} color={'contentDim'}>
                                로딩 중...
                            </StyledText>
                        </View>
                    ) : error ? (
                        <View style={styles.centerContent}>
                            <StyledText size={TextSize.BodyLarge} color={'error'}>
                                {error}
                            </StyledText>
                        </View>
                    ) : (
                        sortedIngredients.map((ingredient) => (
                            <FoodLifeTime
                                key={ingredient.id}
                                emoji={getEmoji(ingredient.name)}
                                name={ingredient.name}
                                quantity={Number(ingredient.quantity)}
                                lifeTime={new Date(ingredient.expiredAt)}
                                bigUI
                                onPress={() => handleIngredientPress(ingredient.id)}
                            />
                        ))
                    )}
                    <View style={{height: 100}}/>
                </ScrollView>
            </SafeAreaView>
            <ExpandableFAB
                onCameraPress={handleCameraPress}
                onFormPress={handleFormPress}
            />
            <NavBarTemplate/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors['surface'],
        paddingTop: HomePageStyle.paddingTop,
    },
    header: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        marginTop: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    }
});

export default PageFood;