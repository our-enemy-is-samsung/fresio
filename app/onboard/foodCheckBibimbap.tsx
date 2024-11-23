import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '@/constants/Color';
import StyledText from '@/components/shared/Text';
import {TextSize} from '@/enums/TextSize';
import OnboardTemplate from '@/components/template/OnboardTemplate';
import {router} from "expo-router";
import useOnboardData from "@/state/onboard";

const FoodCheckBibimbap = () => {
	const {foodCheckBibimbap, setFoodCheckBibimbap} = useOnboardData();

	const handleOptionSelect = (option: 'too-much' | 'just-right' | 'too-little') => {
		setFoodCheckBibimbap(option);
		// TODO: Implement logic to save user's portion preference
	};

	const handleNext = () => {
		if (foodCheckBibimbap) {
			router.push('/onboard/foodCheckRamen'); // Move to the next onboarding page
		}
	}

	return (
		<OnboardTemplate
			currentStep={5}
			buttonText="다음"
			disabled={!foodCheckBibimbap}
			title="아래 사진을 보고 식사량을 알려주세요"
			description="당신의 식사량에 맞는 맞춤형 레시피를 추천해드립니다"
			onButtonPress={handleNext}
		>
			<View style={styles.container}>
				<Image source={require('@/assets/images/onboard/onboard_foodCheck_bibimbap.jpg')} style={styles.image}/>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[
							styles.button,
							foodCheckBibimbap === 'too-much' && styles.selectedButton
						]}
						onPress={() => handleOptionSelect('too-much')}
					>
						<StyledText size={TextSize.BodyLarge}
						            color={foodCheckBibimbap === 'too-much' ? 'brand' : 'contentDim'}>
							2개 이상 먹을 수 있어요
						</StyledText>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							foodCheckBibimbap === 'just-right' && styles.selectedButton
						]}
						onPress={() => handleOptionSelect('just-right')}
					>
						<StyledText size={TextSize.BodyLarge}
						            color={foodCheckBibimbap === 'just-right' ? 'brand' : 'contentDim'}>
							적정량이에요
						</StyledText>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							foodCheckBibimbap === 'too-little' && styles.selectedButton
						]}
						onPress={() => handleOptionSelect('too-little')}
					>
						<StyledText size={TextSize.BodyLarge}
						            color={foodCheckBibimbap === 'too-little' ? 'brand' : 'contentDim'}>
							다 못 먹을거 같아요
						</StyledText>
					</TouchableOpacity>
				</View>
			</View>

		</OnboardTemplate>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.surfaceDim
	},
	image: {
		width: 300,
		height: 200,
		marginBottom: 32
	},
	buttonContainer: {
		width: '100%',
		gap: 16,
		paddingHorizontal: 22
	},
	button: {
		backgroundColor: Colors.containerDark,
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 24
	},
	selectedButton: {
		backgroundColor: Colors.brandContainer,
		borderColor: Colors.brand,
		borderWidth: 1
	}
});

export default FoodCheckBibimbap;