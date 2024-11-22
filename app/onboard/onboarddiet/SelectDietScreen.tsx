import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import BackIcon from '@/components/onboard/BackIcon';
import {Colors} from "@/constants/Color";
import {Column} from "@/components/shared/Column";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";

type DietType = 'normal' | 'vegan' | 'lowSalt' | 'lactoOvo';

interface DietOption {
	id: DietType;
	title: string;
	description: string;
}

const dietOptions: DietOption[] = [
	{id: 'normal', title: '일반', description: '표준 식단을 선호해요.'},
	{id: 'vegan', title: '비건', description: '지속적 제한된 선호해요.'},
	{id: 'lowSalt', title: '저염식', description: '저염식 제한된 선호해요.'},
	{
		id: 'lactoOvo',
		title: '락토오보',
		description: '생선과 해산물 등은 먹지 않지만\n달걀, 유제품은 섭취해요.'
	}
];

const SelectDietScreen = () => {
	const router = useRouter();
	const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);

	// Create animation references for each option
	const scaleAnims = Object.fromEntries(
		dietOptions.map(option => [
			option.id,
			useRef(new Animated.Value(1)).current
		])
	) as Record<DietType, Animated.Value>;

	const handleOptionPress = (diet: DietType) => {
		if (selectedDiet === diet) {
			// Reset animation when deselecting
			Animated.spring(scaleAnims[diet], {
				toValue: 1,
				useNativeDriver: true,
				tension: 40,
				friction: 7,
			}).start();
			setSelectedDiet(null);
			return;
		}

		// Reset previous selection animation
		if (selectedDiet) {
			Animated.spring(scaleAnims[selectedDiet], {
				toValue: 1,
				useNativeDriver: true,
				tension: 40,
				friction: 7,
			}).start();
		}

		// Animate new selection
		Animated.spring(scaleAnims[diet], {
			toValue: 1.03,
			useNativeDriver: true,
			tension: 40,
			friction: 7,
		}).start();

		setSelectedDiet(diet);
	};

	const DietOption = ({option}: { option: DietOption }) => (
		<Animated.View style={{transform: [{scale: scaleAnims[option.id]}], width: '100%'}}>
			<TouchableOpacity
				style={[
					styles.option,
					selectedDiet === option.id && styles.selectedOption
				]}
				onPress={() => handleOptionPress(option.id)}
			>
				<Column>
					<StyledText
						size={TextSize.HeadingSmall}
						color={selectedDiet === option.id ? 'surface' : 'content'}
						style={styles.optionText}
					>
						{option.title}
					</StyledText>
					<StyledText
						size={TextSize.ContentLarge}
						color={selectedDiet === option.id ? 'brandContainer' : 'contentDim'}
					>
						{option.description}
					</StyledText>
				</Column>
			</TouchableOpacity>
		</Animated.View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.back()}
			>
				<BackIcon/>
			</TouchableOpacity>

			<View style={styles.content}>
				<Column style={styles.titleContainer}>
					<StyledText size={TextSize.TitleSmall} color="content">
						해당되는 식단을 알려주세요
					</StyledText>
					<StyledText size={TextSize.ContentLarge} color="contentDim">
						개인화된 레시피 추천을 제공하려면 필요해요
					</StyledText>
				</Column>

				<Column style={styles.optionContainer}>
					{dietOptions.map(option => (
						<DietOption key={option.id} option={option}/>
					))}
				</Column>
			</View>

			<View style={{paddingHorizontal: 22}}>
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
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surfaceDim,
	},
	backButton: {
		position: 'absolute',
		top: 50,
		left: 22,
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
		marginBottom: 42,
		gap: 12,
	},
	optionContainer: {
		width: '100%',
		alignSelf: 'center',
		gap: 12,
	},
	option: {
		padding: 20,
		alignItems: 'flex-start',
		borderRadius: 16,
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.containerDark,
		width: '100%',
	},
	selectedOption: {
		backgroundColor: Colors.brand,
		borderWidth: 0,
	},
	optionText: {
		marginBottom: 8,
	},
	nextButton: {
		width: '100%',
		height: 56,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		paddingHorizontal: 22,
		marginBottom: 20,
	},
	nextButtonActive: {
		backgroundColor: Colors.brand,
	},
	nextButtonInactive: {
		backgroundColor: Colors.containerDarkest,
	},
	nextButtonText: {
		textAlign: 'center',
		fontWeight: '600',
	},
});
export default SelectDietScreen;