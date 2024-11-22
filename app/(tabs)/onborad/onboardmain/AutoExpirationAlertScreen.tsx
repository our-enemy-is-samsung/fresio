import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { Colors } from '@/shared/constants/Color';
import GoogleIcon from '@/app/(tabs)/onborad/onboardComponents/GoogleIcon';
import SecondSlide from './SecondSlide';
import ThirdSlide from './ThirdSlide';

const { width } = Dimensions.get('window');

const AutoExpirationAlertScreen = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const router = useRouter();

    const dotWidths = React.useRef([
        new Animated.Value(25),
        new Animated.Value(8),
        new Animated.Value(8),
    ]).current;

    React.useEffect(() => {
        dotWidths.forEach((width, index) => {
            Animated.timing(width, {
                toValue: index === currentIndex ? 25 : 8,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
    }, [currentIndex]);

    const handleGoogleLogin = () => {
        router.push('/onborad/onboarddiet/SelectDietScreen');
    };

    const PageIndicator = () => (
        <View style={styles.pageIndicator}>
            {[0, 1, 2].map((index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            width: dotWidths[index],
                            backgroundColor:
                                index === currentIndex
                                    ? Colors.light.black
                                    : Colors.light.grayScale40,
                        }
                    ]}
                />
            ))}
        </View>
    );

    const FirstBannerContent = () => (
        <View style={styles.bannerContent}>
            <Image
                source={require('../../../../assets/images/fresio.png')}
                style={styles.bannerIcon}
            />
            <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>유통기한 알림</Text>
                <Text style={styles.bannerSubtitle}>우유의 유통기한이 지났어요.</Text>
            </View>
            <Text style={styles.bannerTime}>지금</Text>
        </View>
    );

    const FirstGlassmorphicBanner = Platform.OS === 'ios' ? (
        <>
            <BlurView intensity={15} tint="dark" style={[styles.blurBanner, styles.glassmorphism]}>
                <View style={styles.emptyBannerContent} />
            </BlurView>
            <BlurView intensity={25} tint="dark" style={[styles.newBlurOverlay, styles.glassmorphism]}>
                <View style={styles.emptyBannerContent} />
            </BlurView>
            <BlurView intensity={55} tint="dark" style={[styles.thirdBlurOverlay, styles.glassmorphism]}>
                <FirstBannerContent />
            </BlurView>
        </>
    ) : (
        <BlurView intensity={50} tint="dark" style={[styles.blurBanner, styles.glassmorphism]}>
            <FirstBannerContent />
        </BlurView>
    );

    const FirstSlide = () => (
        <View style={styles.slide}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>자동 유통기한 알림</Text>
                <Text style={styles.subtitle}>
                    잊기 쉬운 유통기한 관리,{'\n'}
                    이제는 앱이 자동으로 알려드려요
                </Text>
            </View>
            <View style={styles.containerWrapper}>
                <View style={styles.contentWrapper} />
                {FirstGlassmorphicBanner}
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', Colors.light.grayScale1]}
                    style={styles.gradient}
                    locations={[0.0563, 0.9473]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.mainContainer}>
                <Swiper
                    loop={false}
                    showsPagination={false}
                    autoplay={false}
                    onIndexChanged={setCurrentIndex}
                    scrollEnabled={true}
                    removeClippedSubviews={false}
                >
                    <FirstSlide />
                    <SecondSlide />
                    <ThirdSlide />
                </Swiper>
                <View style={styles.bottom}>
                    <PageIndicator />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleGoogleLogin}
                    >
                        <View style={styles.buttonContent}>
                            <View style={styles.iconContainer}>
                                <GoogleIcon />
                            </View>
                            <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    mainContainer: {
        flex: 1,
    },
    slide: {
        flex: 1,
        width,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 32,
        zIndex: 1,
    },
    containerWrapper: {
        position: 'absolute',
        width: 272,
        height: 409,
        left: '50%',
        top: '50%',
        transform: [
            { translateX: -136 },
            { translateY: -204.5 }
        ],
    },
    contentWrapper: {
        width: 272,
        height: 352,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 8,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderColor: Colors.light.grayScale40,
        backgroundColor: Colors.light.white,
        marginTop: 57,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 57,
    },
    glassmorphism: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    emptyBannerContent: {
        width: '100%',
        height: '100%',
    },
    blurBanner: {
        position: 'absolute',
        width: 244,
        height: 73,
        borderRadius: 30,
        top: 90,
        left: 14,
        zIndex: 1,
        overflow: 'hidden',
    },
    newBlurOverlay: {
        position: 'absolute',
        width: 277,
        height: 85,
        borderRadius: 30,
        top: 55,
        left: -2.5,
        zIndex: 2,
        overflow: 'hidden',
    },
    thirdBlurOverlay: {
        position: 'absolute',
        width: 316,
        height: 87,
        borderRadius: 30,
        top: 30,
        left: -22,
        zIndex: 3,
        overflow: 'hidden',
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
        lineHeight: 22,
        textAlign: 'center',
        fontFamily: 'Wanted Sans Variable',
        fontWeight: '500',
        letterSpacing: 0.32,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: '100%',
        height: '100%',
    },
    bannerIcon: {
        width: 49,
        height: 48,
        marginRight: 14,
        borderRadius: 8,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        color: Colors.light.white,
        fontSize: 17,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: 'left',
        fontFamily: 'Wanted Sans Variable',
    },
    bannerSubtitle: {
        color: Colors.light.white,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: 'left',
        fontFamily: 'Wanted Sans Variable',
        opacity: 0.8,
    },
    bannerTime: {
        color: Colors.light.white,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.3,
        marginRight: 5,
        fontFamily: 'Wanted Sans Variable',
        opacity: 0.4,
        marginTop: -25,
    },
    bottom: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
        position: 'absolute',
        bottom: 40,
        paddingHorizontal: 20,
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    dot: {
        height: 8,
        borderRadius: 33,
        margin: 5,
    },
    button: {
        backgroundColor: Colors.light.brand50,
        borderRadius: 8,
        width: 358,
        height: 59,
        justifyContent: 'center',
        marginBottom:-20
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.light.white,
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: 'Wanted Sans Variable',
        width: '100%',
    },
});

export default AutoExpirationAlertScreen;