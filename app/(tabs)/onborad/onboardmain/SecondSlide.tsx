import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Colors } from '@/shared/constants/Color';
import DifficultyIcon from "@/app/(tabs)/onborad/onboardComponents/DifficultyIcon";
import TimeIcon from "@/app/(tabs)/onborad/onboardComponents/TimeIcon";
import { BlurView } from 'expo-blur';

interface CardProps {
    image: any;
    title: string;
    isBlurred?: boolean;
    style?: any;
    imageStyle?: any;
}

const Card: React.FC<CardProps> = ({ image, title, isBlurred, style, imageStyle }) => {
    const CardContent = () => (
        <BlurView intensity={65} tint="light" style={[styles.cardContent, style]}>
            <Image source={image} style={[styles.recipeImage, imageStyle]} />
            <Text style={[styles.recipeTitle, style?.width === 138 && styles.smallCardTitle]}>{title}</Text>
            <View style={[styles.statsContainer, style?.width === 138 && styles.smallCardStats]}>
                <BlurView intensity={65} tint="light" style={[styles.difficultyBadge, style?.width === 138 && styles.smallCardBadge]}>
                    <DifficultyIcon width={10} height={10} />
                    <Text style={[styles.statText, style?.width === 138 && styles.smallCardText]}>쉬움</Text>
                </BlurView>
                <BlurView intensity={65} tint="light" style={[styles.timeBadge, style?.width === 138 && styles.smallCardBadge]}>
                    <TimeIcon width={10} height={10} />
                    <Text style={[styles.statText, style?.width === 138 && styles.smallCardText]}>3분</Text>
                </BlurView>
            </View>
        </BlurView>
    );

    const RegularCard = () => (
        <View style={[styles.regularCard, style]}>
            <Image source={image} style={[styles.recipeImage, imageStyle]} />
            <Text style={[styles.recipeTitle, style?.width === 138 && styles.smallCardTitle]}>{title}</Text>
            <View style={[styles.statsContainer, style?.width === 138 && styles.smallCardStats]}>
                <View style={[styles.difficultyBadge, style?.width === 138 && styles.smallCardBadge]}>
                    <DifficultyIcon width={10} height={10} />
                    <Text style={[styles.statText, style?.width === 138 && styles.smallCardText]}>쉬움</Text>
                </View>
                <View style={[styles.timeBadge, style?.width === 138 && styles.smallCardBadge]}>
                    <TimeIcon width={10} height={10} />
                    <Text style={[styles.statText, style?.width === 138 && styles.smallCardText]}>3분</Text>
                </View>
            </View>
        </View>
    );

    return isBlurred ? <CardContent /> : <RegularCard />;
};

const SecondSlide: React.FC = () => {
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>사용자 맞춤 레시피 추천</Text>
                <Text style={styles.subtitle}>맞춤형 레시피로 더 쉽고 건강한 밥상</Text>
                <Text style={styles.description}>
                    영양가 있는 맞춤형 레시피를 추천해드려요
                </Text>
            </View>
            <View style={styles.cardsContainer}>
                <Image
                    source={require('../../../../assets/images/Frame 37.png')}
                    style={styles.newImage}
                />
                <Card
                    image={require('../../../../assets/images/bibim.png')}
                    title="보양 만점 비빔밥"
                    style={styles.bibimCard}
                    imageStyle={styles.smallCardImage}
                />
                <Card
                    image={require('../../../../assets/images/kimchi.png')}
                    title="김치볶음밥"
                    style={styles.kimchiCard}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 32,
        zIndex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
        color: Colors.light.grayScale90,
        lineHeight: 32,
        letterSpacing: 0.56,
        fontFamily: 'Wanted Sans Variable',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.grayScale60,
        fontFamily: 'Wanted Sans Variable',
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        color: Colors.light.grayScale60,
        fontFamily: 'Wanted Sans Variable',
        marginBottom: 24,
    },
    cardsContainer: {
        position: 'relative',
        height: 600,
        paddingHorizontal: 20,
    },
    newImage: {
        width: 194,
        height: 250,
        resizeMode: 'cover',
        position: 'absolute',
        top: -10,
        left: '42%',
        marginLeft: -100,
        zIndex: 1,
        borderRadius: 16,
    },
    cardContent: {
        width: 175,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 14,
        gap: 15,
        borderRadius: 26,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: 220,
    },
    regularCard: {
        width: 175,
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 14,
        gap: 15,
        borderRadius: 26,
        backgroundColor: Colors.light.white,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.05,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    bibimCard: {
        width: 138,
        top: 210,
        left: 25,
        zIndex: 2,
    },
    kimchiCard: {
        top: 60,
        right: 25,
        zIndex: 3,
    },
    recipeImage: {
        width: 147,
        height: 123,
        resizeMode: 'cover',
        borderRadius: 16,
        overflow: 'hidden',
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.grayScale90,
        fontFamily: 'Wanted Sans Variable',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    difficultyBadge: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(230, 249, 238, 0.7)',
    },
    timeBadge: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(237, 237, 245, 0.7)',
    },
    statText: {
        fontSize: 12,
        color: Colors.light.grayScale60,
        fontFamily: 'Wanted Sans Variable',
    },
    smallCardImage: {
        width: 110,
        height: 92,
    },
    smallCardBadge: {
        flexDirection: 'row',
        padding: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
        gap: 4,
        borderRadius: 6,
        overflow: 'hidden',
    },
    smallCardText: {
        fontSize: 10,
        color: Colors.light.grayScale60,
        fontFamily: 'Wanted Sans Variable',
    },
    smallCardTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    smallCardStats: {
        flexDirection: 'row',
        gap: 6,
    },
    blurredTitle: {
        color: Colors.light.grayScale90,
    },
    blurredText: {
        color: Colors.light.grayScale60,
    },
});

export default SecondSlide;