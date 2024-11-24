import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@/constants/Color';
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Column} from "@/components/shared/Column";
import {router} from "expo-router";
import OnboardTemplate from "@/components/template/OnboardTemplate";
import useOnboardData from "@/state/onboard";

type DietType = 'standard' | 'vegan' | 'lowSalt' | 'lactoOvo';

interface DietOption {
	type: DietType;
	title: string;
	desc: string;
}

const dietOptions: DietOption[] = [
	{type: 'standard', title: '일반', desc: '표준 식단을 선호해요.'},
	{type: 'vegan', title: '비건', desc: '지속적 제한된 선호해요.'},
	{type: 'lowSalt', title: '저염식', desc: '저염식 제한된 선호해요.'},
	{type: 'lactoOvo', title: '락토오보', desc: '생선과 해산물 등은 먹지 않지만\n달걀, 유제품은 섭취해요.'},
];

const DietOption = ({
	                    option,
	                    isSelected,
	                    onSelect,
                    }: {
	option: DietOption;
	isSelected: boolean;
	onSelect: () => void;
}) => (
	<TouchableOpacity
		style={[styles.option, isSelected && styles.selectedOption]}
		onPress={onSelect}
	>
		<StyledText
			size={TextSize.HeadingSmall}
			color={isSelected ? "surface" : "content"}
			style={styles.optionText}
		>
			{option.title}
		</StyledText>
		<StyledText
			size={TextSize.ContentLarge}
			color={isSelected ? "surfaceDim" : "contentDim"}
			style={styles.optionSubText}
		>
			{option.desc}
		</StyledText>
	</TouchableOpacity>
);

const SelectDietScreen = () => {
	const {selectedDiet, setSelectedDiet} = useOnboardData();

	const handleDietSelect = (diet: DietType) => {
		if (selectedDiet === diet) {
			setSelectedDiet(null);
			return;
		}
		setSelectedDiet(diet);
	};

	const handleNext = () => {
		if (selectedDiet) {
			router.push('/onboard/ageSelect');
		}
	};

	return (
		<OnboardTemplate
			currentStep={0}
			buttonText="다음"
			disabled={!selectedDiet}
			title="해당되는 식단을 알려주세요"
			description="개인화된 레시피 추천을 제공하려면 필요해요"
			onButtonPress={handleNext}
		>
			<View style={styles.container}>
				<Column style={styles.optionContainer}>
					{dietOptions.map((option) => (
						<DietOption
							key={option.type}
							option={option}
							isSelected={selectedDiet === option.type}
							onSelect={() => handleDietSelect(option.type)}
						/>
					))}
				</Column>
			</View>
		</OnboardTemplate>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 22,
		paddingTop: 12,
	},
	optionContainer: {
		width: '100%',
		alignSelf: 'center',
		gap: 14,
	},
	option: {
		padding: 15,
		paddingHorizontal: 20,
		alignItems: 'flex-start',
		alignSelf: 'stretch',
		borderRadius: 11,
		backgroundColor: Colors.surface,
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
	optionSubText: {},
});

export default SelectDietScreen;