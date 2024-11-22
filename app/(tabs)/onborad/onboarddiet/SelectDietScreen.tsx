import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/constants/Color';
import { useRouter } from 'expo-router';
import BackIcon from '../onboardComponents/BackIcon';

// null을 제외한 DietType 정의
type DietType = 'normal' | 'vegan' | 'lowSalt' | 'lactoOvo';

const SelectDietScreen = () => {
   const router = useRouter();
   const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
   
   // 각 옵션에 대한 애니메이션 값 생성
   const scaleAnims = {
       normal: useRef(new Animated.Value(1)).current,
       vegan: useRef(new Animated.Value(1)).current,
       lowSalt: useRef(new Animated.Value(1)).current,
       lactoOvo: useRef(new Animated.Value(1)).current,
   };

   const handleOptionPress = (diet: DietType) => {
       // 이미 선택된 옵션을 다시 클릭한 경우
       if (selectedDiet === diet) {
           // 애니메이션 되돌리기
           Animated.spring(scaleAnims[diet], {
               toValue: 1,
               useNativeDriver: true,
               tension: 40,
               friction: 7,
           }).start();
           
           // 선택 취소
           setSelectedDiet(null);
           return;
       }

       // 이전 선택된 옵션의 애니메이션 되돌리기
       if (selectedDiet) {
           Animated.spring(scaleAnims[selectedDiet], {
               toValue: 1,
               useNativeDriver: true,
               tension: 40,
               friction: 7,
           }).start();
       }

       // 새로 선택된 옵션 애니메이션
       Animated.spring(scaleAnims[diet], {
           toValue: 1.03,
           useNativeDriver: true,
           tension: 40,
           friction: 7,
       }).start();

       setSelectedDiet(diet);
   };

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
                   <Text style={styles.header}>해당되는 식단을 알려주세요</Text>
                   <Text style={styles.description}>
                       개인화된 레시피 추천을 제공하려면 필요해요
                   </Text>
               </View>
               <View style={styles.optionContainer}>
                   <Animated.View style={{ transform: [{ scale: scaleAnims.normal }], width: '100%' }}>
                       <TouchableOpacity 
                           style={[styles.option, selectedDiet === 'normal' && styles.selectedOption]}
                           onPress={() => handleOptionPress('normal')}
                       >
                           <Text style={[
                               styles.optionText,
                               selectedDiet === 'normal' && styles.selectedText
                           ]}>일반</Text>
                           <Text style={[
                               styles.optionSubText,
                               selectedDiet === 'normal' && styles.selectedSubText
                           ]}>표준 식단을 선호해요.</Text>
                       </TouchableOpacity>
                   </Animated.View>

                   <Animated.View style={{ transform: [{ scale: scaleAnims.vegan }], width: '100%' }}>
                       <TouchableOpacity 
                           style={[styles.option, selectedDiet === 'vegan' && styles.selectedOption]}
                           onPress={() => handleOptionPress('vegan')}
                       >
                           <Text style={[
                               styles.optionText,
                               selectedDiet === 'vegan' && styles.selectedText
                           ]}>비건</Text>
                           <Text style={[
                               styles.optionSubText,
                               selectedDiet === 'vegan' && styles.selectedSubText
                           ]}>지속적 제한된 선호해요.</Text>
                       </TouchableOpacity>
                   </Animated.View>

                   <Animated.View style={{ transform: [{ scale: scaleAnims.lowSalt }], width: '100%' }}>
                       <TouchableOpacity 
                           style={[styles.option, selectedDiet === 'lowSalt' && styles.selectedOption]}
                           onPress={() => handleOptionPress('lowSalt')}
                       >
                           <Text style={[
                               styles.optionText,
                               selectedDiet === 'lowSalt' && styles.selectedText
                           ]}>저염식</Text>
                           <Text style={[
                               styles.optionSubText,
                               selectedDiet === 'lowSalt' && styles.selectedSubText
                           ]}>저염식 제한된 선호해요.</Text>
                       </TouchableOpacity>
                   </Animated.View>

                   <Animated.View style={{ transform: [{ scale: scaleAnims.lactoOvo }], width: '100%' }}>
                       <TouchableOpacity 
                           style={[styles.option, selectedDiet === 'lactoOvo' && styles.selectedOption]}
                           onPress={() => handleOptionPress('lactoOvo')}
                       >
                           <Text style={[
                               styles.optionText,
                               selectedDiet === 'lactoOvo' && styles.selectedText
                           ]}>락토오보</Text>
                           <Text style={[
                               styles.optionSubText,
                               selectedDiet === 'lactoOvo' && styles.selectedSubText
                           ]}>생선과 해산물 등은 먹지 않지만{'\n'}달걀, 유제품은 섭취해요.</Text>
                       </TouchableOpacity>
                   </Animated.View>
               </View>
           </View>
           <TouchableOpacity
               style={[
                   styles.nextButton,
                   selectedDiet ? styles.nextButtonActive : styles.nextButtonInactive
               ]}
               onPress={() => {
                   if (selectedDiet) {
                       router.push('/onborad/onboarddiet/SelectNetworkScreen');
                   }
               }}
               disabled={!selectedDiet}
           >
               <Text style={styles.nextButtonText}>다음</Text>
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
        fontSize: 28,
        fontWeight: '600',
        color: '#141414',
        marginBottom: 15,
        fontFamily: 'Wanted Sans Variable',
        textAlign: 'center',
        lineHeight: 32,
        letterSpacing: 0.56,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#707085',
        lineHeight: 22,
        fontFamily: 'Wanted Sans Variable',
        textAlign: 'center',
        letterSpacing: 0.32,
    },
    optionContainer: {
        width: 346,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 14,
    },
    option: {
        padding: 15,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: 11,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
    },
    selectedOption: {
        backgroundColor: '#F4902F',
    },
    selectedText: {
        color: '#FFFFFF',
    },
    selectedSubText: {
        color: '#FFF3E8',
    },
    optionText: {
        fontSize: 19,
        fontWeight: '500',
        color: '#141414',
        marginBottom: 4,
        fontFamily: 'Wanted Sans Variable'
    },
    optionSubText: {
        fontSize: 16,
        color: '#707085',
        fontFamily: 'Wanted Sans Variable'
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
        backgroundColor: '#F4902F',
    },
    nextButtonInactive: {
        backgroundColor: '#E3E3F0',
    },
    nextButtonText: {
        color: Colors.light.white,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'Wanted Sans Variable'
    },
 });
 export default SelectDietScreen;