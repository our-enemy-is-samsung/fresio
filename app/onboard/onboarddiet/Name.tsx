import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import { TextSize } from "@/enums/TextSize";
import BackIcon from '@/components/onboard/BackIcon';

const { width } = Dimensions.get('window');

const Name = () => {
    const [nickname, setNickname] = useState('');
    const router = useRouter();

    const handleContinue = () => {
        if (nickname.trim()) {
            router.push({
                pathname: '/onboard/onboarddiet/SelectDietScreen',
                params: { nickname: nickname }
            });
        }
    };

    const isButtonActive = nickname.trim().length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <BackIcon/>
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <StyledText
                        size={TextSize.TitleMedium}
                        color="content"
                        textAlign="center"
                        style={styles.header}
                    >
                        닉네임을 입력해주세요
                    </StyledText>
                    <StyledText
                        size={TextSize.ContentLarge}
                        color="contentDim"
                        textAlign="center"
                        style={styles.description}
                    >
                        앱에서 사용할 닉네임을 입력해주세요{'\n'}
                        언제든지 변경할 수 있어요
                    </StyledText>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="닉네임 입력 (2-10자)"
                        placeholderTextColor={Colors.contentDim}
                        value={nickname}
                        onChangeText={setNickname}
                        maxLength={10}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.nextButton,
                    isButtonActive ? styles.nextButtonActive : styles.nextButtonInactive
                ]}
                onPress={handleContinue}
                disabled={!isButtonActive}
            >
                <StyledText
                    size={TextSize.BodyLarge}
                    color="surface"
                    style={styles.nextButtonText}
                >
                    다음
                </StyledText>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 1,
        padding: 8,
    },
    content: {
        padding: 22,
        flex: 1,
        marginTop: 48,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    header: {
        marginBottom: 15,
        lineHeight: 32,
        letterSpacing: 0.56,
    },
    description: {
        lineHeight: 22,
        letterSpacing: 0.32,
    },
    inputContainer: {
        marginTop: 40,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 56,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Wanted Sans Variable',
        color: Colors.content,
        borderWidth: 1,
        borderColor: Colors.contentSecondary,
    },
    nextButton: {
        width: 358,
        height: 59,
        paddingVertical: 14,
        paddingHorizontal: 129,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        alignSelf: 'center',
        marginBottom: 20,
    },
    nextButtonActive: {
        backgroundColor: Colors.brand,
    },
    nextButtonInactive: {
        backgroundColor: Colors.contentSecondary,
    },
    nextButtonText: {
        textAlign: 'center',
        fontWeight: '600',
    }
});

export default Name;