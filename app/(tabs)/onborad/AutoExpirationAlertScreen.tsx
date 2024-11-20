import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../../shared/constants/Color';

type RootStackParamList = {
    AutoExpirationAlert: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AutoExpirationAlert'>;

const AutoExpirationAlertScreen: React.FC<Props> = ({ navigation }) => {
    const BannerContent = () => (
        <View style={styles.bannerContent}>
            <Image
                source={require('../../../assets/images/fresio.png')}
                style={styles.bannerIcon}
            />
            <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>유통기한 알림</Text>
                <Text style={styles.bannerSubtitle}>우유의 유통기한이 지났어요.</Text>
            </View>
            <Text style={styles.bannerTime}>지금</Text>
        </View>
    );

    const GlassmorphicBanner = Platform.OS === 'ios' ? (
        <>
            <BlurView intensity={15} tint="dark" style={[styles.blurBanner, styles.glassmorphism]}>
                <View style={styles.emptyBannerContent} />
            </BlurView>
            <BlurView intensity={25} tint="dark" style={[styles.newBlurOverlay, styles.glassmorphism]}>
                <View style={styles.emptyBannerContent} />
            </BlurView>
            <BlurView intensity={55} tint="dark" style={[styles.thirdBlurOverlay, styles.glassmorphism]}>
                <BannerContent />
            </BlurView>
        </>
    ) : (
        <BlurView intensity={50} tint="dark" style={[styles.blurBanner, styles.glassmorphism]}>
            <BannerContent />
        </BlurView>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>자동 유통기한 알림</Text>
                    <Text style={styles.subtitle}>
                        여기다 쌈뽕한 설명을 적어주세요{'\n'}
                        저는 몰라용~ 여자가 만졌어요
                    </Text>
                </View>

                <View style={styles.containerWrapper}>
                    <View style={styles.contentWrapper} />
                    {GlassmorphicBanner}
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', Colors.light.grayScale1]}
                        style={[styles.gradient, styles.leftGradient]}
                        locations={[0.0563, 0.9473]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', Colors.light.grayScale1]}
                        style={[styles.gradient, styles.rightGradient]}
                        locations={[0.0563, 0.9473]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                </View>

                <View style={styles.bottom}>
                    <View style={styles.pageIndicator}>
                        <View style={styles.activeDot} />
                        <View style={styles.inactiveDot} />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>눌러서 시작하기</Text>
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
        alignItems: 'center',
        paddingHorizontal: 20,
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
        top: '50%',
        transform: [{ translateY: -204.5 }],
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
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: 8,
        height: 57,
    },
    leftGradient: {
        left: 0,
    },
    rightGradient: {
        right: 0,
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
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    activeDot: {
        width: 10,
        height: 10,
        backgroundColor: Colors.light.black,
        borderRadius: 5,
        margin: 5,
    },
    inactiveDot: {
        width: 10,
        height: 10,
        backgroundColor: Colors.light.grayScale20,
        borderRadius: 5,
        margin: 5,
    },
    button: {
        backgroundColor: Colors.light.brand50,
        paddingVertical: 16,
        borderRadius: 13,
        alignItems: 'center',
        width: 358,
        height: 59,
    },
    buttonText: {
        color: Colors.light.white,
        fontSize: 19,
        fontWeight: '500',
        lineHeight: 24,
    },
});

export default AutoExpirationAlertScreen;