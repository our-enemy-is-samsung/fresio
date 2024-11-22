import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Color';
import { useRouter } from 'expo-router';
import BackIcon from '../../../components/onboard/BackIcon';
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

type DietType = 'normal' | 'vegan' | 'lowSalt' | 'lactoOvo';

const SelectDietScreen = () => {
   const router = useRouter();
   const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
   
   const scaleAnims = {
       normal: useRef(new Animated.Value(1)).current,
       vegan: useRef(new Animated.Value(1)).current,
       lowSalt: useRef(new Animated.Value(1)).current,
       lactoOvo: useRef(new Animated.Value(1)).current,
   };

   const handleOptionPress = (diet: DietType) => {
       if (selectedDiet === diet) {
           Animated.spring(scaleAnims[diet], {
               toValue: 1,
               useNativeDriver: true,
               tension: 40,
               friction: 7,
           }).start();
           setSelectedDiet(null);
           return;
       }

       if (selectedDiet) {
           Animated.spring(scaleAnims[selectedDiet], {
               toValue: 1,
               useNativeDriver: true,
               tension: 40,
               friction: 7,
           }).start();
       }

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
                   <StyledText 
                       size={TextSize.TitleMedium} 
                       color="content"
                       textAlign="center"
                       style={styles.header}
                   >
                       해당되는 식단을 알려주세요
                   </StyledText>
                   <StyledText 
                       size={TextSize.ContentLarge} 
                       color="contentDim"
                       textAlign="center"
                       style={styles.description}
                   >
                       개인화된 레시피 추천을 제공하려면 필요해요
                   </StyledText>
               </View>
               <View style={styles.optionContainer}>
                   {[
                       { type: 'normal', title: '일반', desc: '표준 식단을 선호해요.' },
                       { type: 'vegan', title: '비건', desc: '지속적 제한된 선호해요.' },
                       { type: 'lowSalt', title: '저염식', desc: '저염식 제한된 선호해요.' },
                       { type: 'lactoOvo', title: '락토오보', desc: '생선과 해산물 등은 먹지 않지만\n달걀, 유제품은 섭취해요.' },
                   ].map((item) => (
                       <Animated.View key={item.type} style={{ transform: [{ scale: scaleAnims[item.type as DietType] }], width: '100%' }}>
                           <TouchableOpacity 
                               style={[styles.option, selectedDiet === item.type && styles.selectedOption]}
                               onPress={() => handleOptionPress(item.type as DietType)}
                           >
                               <StyledText 
                                   size={TextSize.HeadingSmall}
                                   color={selectedDiet === item.type ? "surface" : "content"}
                                   style={styles.optionText}
                               >
                                   {item.title}
                               </StyledText>
                               <StyledText 
                                   size={TextSize.ContentLarge}
                                   color={selectedDiet === item.type ? "surfaceDim" : "contentDim"}
                                   style={styles.optionSubText}
                               >
                                   {item.desc}
                               </StyledText>
                           </TouchableOpacity>
                       </Animated.View>
                   ))}
               </View>
           </View>
           <TouchableOpacity
               style={[
                   styles.nextButton,
                   selectedDiet ? styles.nextButtonActive : styles.nextButtonInactive
               ]}
               onPress={() => {
                   if (selectedDiet) {
                       router.push('/onboard/onboarddiet/SelectNetworkScreen');
                   }
               }}
               disabled={!selectedDiet}
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
        backgroundColor: Colors.brand,
    },
    optionText: {
        marginBottom: 4,
    },
    optionSubText: {
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
    },
});

export default SelectDietScreen;