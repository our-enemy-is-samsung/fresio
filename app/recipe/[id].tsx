import {
    ActivityIndicator,
    Dimensions,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import React, {useEffect} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Colors} from "@/constants/Color";
import View from "@/components/shared/View";
import {Row} from "@/components/shared/Row";
import {Column} from "@/components/shared/Column";
import useRecipeStore from "@/state/recipeStore";
import useToastStore from "@/state/toast";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import TimerStepPreview from "@/components/timer/TimerStepPreview";
import {TimerColor} from "@/enums/TimerColor";
import YoutubeIframe from "react-native-youtube-iframe";

const PageRecipeDetail = () => {
    const inset = useSafeAreaInsets();
    const params = useLocalSearchParams<{ id: string }>();
    const {recipe, isLoading, error, fetchRecipe} = useRecipeStore();
    const {addToast} = useToastStore();
    const toastInstance = useToastStore();

    useEffect(() => {
        const loadRecipe = async () => {
            if (!params.id) {
                addToast('레시피 ID가 필요합니다.', 'error');
                router.back();
                return;
            }

            try {
                await fetchRecipe(params.id, toastInstance);
            } catch (error) {
                if (error instanceof Error) {
                    addToast(error.message, 'error');
                } else {
                    addToast('레시피를 불러오는데 실패했습니다.', 'error');
                }
                router.back();
            }
        };

        loadRecipe();
    }, [params.id]);

    const handleCoupangLink = async (ingredientName: string) => {
        try {
            const coupangAppUrl = `coupang://search?q=${encodeURIComponent(ingredientName)}`;
            const coupangWebUrl = `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(ingredientName)}`;

            const canOpenURL = await Linking.canOpenURL(coupangAppUrl);

            if (canOpenURL) {
                await Linking.openURL(coupangAppUrl);
                addToast('쿠팡 앱으로 이동합니다.', 'info');
            } else {
                await Linking.openURL(coupangWebUrl);
                addToast('쿠팡 웹사이트로 이동합니다.', 'info');
            }
        } catch (error) {
            addToast('쿠팡 링크 연결에 실패했습니다.', 'error');
            console.error('딥링크 에러:', error);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={{
                ...styles.container,
                marginTop: inset.top,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={Colors.brand}/>
            </SafeAreaView>
        );
    }

    if (error || !recipe) {
        return (
            <SafeAreaView style={{
                ...styles.container,
                marginTop: inset.top,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <StyledText size={TextSize.HeadingSmall} color="error">
                    레시피를 불러올 수 없습니다.
                </StyledText>
                <TouchableOpacity
                    style={styles.errorButton}
                    onPress={() => router.back()}
                >
                    <StyledText size={TextSize.BodySmall} color="brand">
                        돌아가기
                    </StyledText>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const totalCookingTime = recipe.timer?.steps.reduce((acc, step) => acc + step.time, 0) ?? 0;

    return (
        <ScrollView style={{
            ...styles.container,
            marginTop: inset.top
        }}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <AntDesign name={'left'} color={Colors.container} size={24}/>
            </TouchableOpacity>
            <Image
                style={styles.thumbnail}
                source={recipe.thumbnailImage}
                contentFit="cover"
            />
            <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.7)']}
                style={styles.thumbnailGradient}
            />
            <View style={styles.titleContainer}>
                <StyledText
                    size={TextSize.TitleMedium}
                    color={'container'}
                >
                    {recipe.name}
                </StyledText>
                <Row style={styles.metaInfo}>
                    <Row style={styles.metaItem}>
                        <AntDesign name="clockcircle" size={16} color={Colors.container}/>
                        <StyledText size={TextSize.BodySmall} color="container">
                            {totalCookingTime}분
                        </StyledText>
                    </Row>
                    <Row style={styles.metaItem}>
                        <AntDesign name="user" size={16} color={Colors.container}/>
                        <StyledText size={TextSize.BodySmall} color="container">
                            {recipe.servings}인분
                        </StyledText>
                    </Row>
                </Row>
            </View>

            {/* 레시피 설명 */}
            <View style={{
                ...styles.section,
                paddingVertical: 32,
                gap: 22
            }}>
                <StyledText size={TextSize.BodyLarge} color={'content'}>레시피 설명</StyledText>
                <StyledText size={TextSize.BodyLarge} color={'contentDim'}>
                    {recipe.description}
                </StyledText>
            </View>

            <View style={styles.divider}/>

            {/* 재료 */}
            <View style={styles.section}>
                <Row style={styles.sectionHeader}>
                    <StyledText size={TextSize.BodyLarge} color={'content'}>재료</StyledText>
                    <StyledText size={TextSize.BodySmall} color={'contentDim'}>
                        {recipe.servings}인분 기준
                    </StyledText>
                </Row>
                <View style={styles.ingredientWrap}>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Row key={`${recipe.id}-ingredient-${index}`} style={styles.ingredientContainer}>
                            <Column>
                                <StyledText size={TextSize.BodyLarge} color={'content'}>
                                    {ingredient.name}
                                </StyledText>
                                <StyledText size={TextSize.BodySmall} color={'contentDim'}>
                                    {ingredient.quantity} {ingredient.units}
                                </StyledText>
                            </Column>
                            <TouchableOpacity
                                style={styles.ingredientCoupang}
                                onPress={() => handleCoupangLink(ingredient.name)}
                            >
                                <StyledText size={TextSize.LabelLarge} color={'contentDim'}>
                                    구매하기
                                </StyledText>
                            </TouchableOpacity>
                        </Row>
                    ))}
                </View>
            </View>

            <View style={styles.divider}/>

            {/* 조리 단계 */}
            <View style={styles.section}>
                <StyledText size={TextSize.BodyLarge} color={'content'} style={{marginBottom: 12}}>조리 순서</StyledText>
                {recipe.steps.map((step, index) => (
                    <View
                        key={`${recipe.id}-step-${index}`}
                        style={styles.stepContainer}
                    >
                        <Row style={styles.stepHeader}>
                            <StyledText size={TextSize.BodySmall} color={'contentDim'}>
                                {index + 1}단계
                            </StyledText>
                            <StyledText size={TextSize.BodySmall} color={'brand'}>
                                {recipe.timer?.steps[index]?.time ?? 0}분
                            </StyledText>
                        </Row>
                        <StyledText size={TextSize.BodyLarge} color={'content'}>
                            {step.description}
                        </StyledText>
                        {step.thumbnailImage && (
                            <Image
                                source={step.thumbnailImage}
                                contentFit="cover"
                                style={styles.stepThumbnail}
                            />
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.divider}/>

            {recipe.timer && (
                <View style={styles.section}>
                    <StyledText size={TextSize.BodyLarge} color={'content'} style={{marginBottom: 12}}>타이머</StyledText>
                    <Column style={styles.timerSteps}>
                        {recipe.timer.steps.map((step, index) => (
                            <TimerStepPreview
                                key={`timer-step-${index}`}
                                titleColor={TimerColor.Orange}
                                hour={Math.floor(step.time / 60)}
                                minute={step.time % 60}
                                recife={step.recipe}
                                showActions={false}
                            />
                        ))}
                    </Column>

                    <Row style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => {
                                if (recipe.timer) {
                                    router.push(`/timer/run/${recipe.timer.id}`);
                                }
                            }}
                        >
                            <MaterialIcons
                                name="play-arrow"
                                size={24}
                                color={Colors.contentDim}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton}>
                            <FontAwesome5
                                name="chromecast"
                                size={18}
                                color={Colors.container}
                            />
                            <StyledText
                                size={TextSize.ContentSmall}
                                color={'container'}
                            >
                                프레시오로 타이머 전송하기
                            </StyledText>
                        </TouchableOpacity>
                    </Row>
                </View>
            )}

            <View style={styles.divider}/>

            {recipe.youtubeId && (
                <View style={styles.section}>
                    <StyledText size={TextSize.BodyLarge} color={'content'} style={{marginBottom: 12}}>추천 컨텐츠</StyledText>
                    <YoutubeIframe
                        videoId={recipe.youtubeId}
                        width={Dimensions.get('window').width - 44}
                        height={220}/>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backButton: {
		position: 'absolute',
		top: 20,
		left: 12,
		zIndex: 1,
		padding: 8,
	},
	thumbnail: {
		width: '100%',
		height: 220
	},
	thumbnailGradient: {
		width: '100%',
		height: 220,
		position: 'absolute',
		top: 0
	},
	titleContainer: {
		position: 'absolute',
		top: 105,
		left: 20,
		right: 20,
		zIndex: 1,
		gap: 8,
	},
	metaInfo: {
		gap: 12,
	},
	metaItem: {
		gap: 4,
		alignItems: 'center',
	},
	section: {
		padding: 22,
		gap: 12,
	},
	sectionHeader: {
		justifyContent: 'space-between',
		alignItems: 'center',

		marginBottom: 12,
	},
	divider: {
		width: '100%',
		height: 10,
		backgroundColor: Colors.containerDark
	},
	ingredientWrap: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	ingredientContainer: {
		width: Dimensions.get('window').width / 2 - 44,
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	ingredientCoupang: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.contentSecondary,
	},
	stepContainer: {
		marginBottom: 16,
		gap: 4,
	},
	stepHeader: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	stepThumbnail: {
		width: '100%',
		height: 200,
		marginTop: 12,
		borderRadius: 8,
	},
	errorButton: {
		marginTop: 12,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		backgroundColor: Colors.brandContainer,
	},
	 timerSteps: {
        gap: 12,
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    playButton: {
        width: 60,
        height: 55,
        backgroundColor: Colors.containerDark,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        flex: 1,
        height: 55,
        backgroundColor: Colors.content,
        borderRadius: 9999,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});

export default PageRecipeDetail;