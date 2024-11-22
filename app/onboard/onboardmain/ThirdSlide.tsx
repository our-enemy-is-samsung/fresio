import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Colors} from "@/constants/Color";

const ThirdSlide: React.FC = () => {
    return (
        <View style={styles.slide}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>요리에 집중한 타이머</Text>
                <Text style={styles.subtitle}>
                    총 요리 시간을 계산해드리고,{'\n'}
                    재료별 조리시작 시간을 알려드릴게요
                </Text>
            </View>
            <Image
                source={require('@/assets/images/image.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
        color: Colors.contentDim,
        lineHeight: 32,
        letterSpacing: 0.56,
        fontFamily: 'Wanted Sans Variable',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.contentSecondary,
        lineHeight: 22,
        textAlign: 'center',
        fontFamily: 'Wanted Sans Variable',
        fontWeight: '500',
        letterSpacing: 0.32,
    },
    image: {
        width: 382,
        height: 380,
        marginTop: 40,
    }
});

export default ThirdSlide;