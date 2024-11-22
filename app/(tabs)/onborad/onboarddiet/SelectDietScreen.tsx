import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/constants/Color';
import { useRouter } from 'expo-router';

const SelectDietScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.description}>
                    계정에 맞시는 메시지 주전에 {'\n'}
                    주전된 제공해요
                </Text>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>일반</Text>
                    <Text style={styles.optionSubText}>표준 식단을 선호해요.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>비건</Text>
                    <Text style={styles.optionSubText}>지속적 제한된 선호해요.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>저염식</Text>
                    <Text style={styles.optionSubText}>저염식 제한된 선호해요.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>학교보건</Text>
                    <Text style={styles.optionSubText}>생태계 수업을 듣는 면역 있어요.</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    // 다음 화면으로 이동
                }}
            >
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.white,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    description: {
        fontSize: 16,
        color: Colors.light.grayScale60,
        marginBottom: 32,
        lineHeight: 24,
    },
    option: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.grayScale5,
        marginBottom: 12,
    },
    optionText: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.light.grayScale90,
        marginBottom: 4,
    },
    optionSubText: {
        fontSize: 15,
        color: Colors.light.grayScale60,
    },
    nextButton: {
        backgroundColor: Colors.light.brand50,
        padding: 16,
        borderRadius: 8,
        margin: 20,
    },
    nextButtonText: {
        color: Colors.light.white,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
    },
});

export default SelectDietScreen;