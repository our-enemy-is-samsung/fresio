import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@/constants/Color';
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Column} from "@/components/shared/Column";
import {router} from "expo-router";
import OnboardTemplate from "@/components/template/OnboardTemplate";
import useOnboardData from "@/state/onboard";

const AgeOption = ({
	                   age,
	                   isSelected,
	                   onSelect
                   }: {
	age: string,
	isSelected: boolean,
	onSelect: () => void
}) => (
	<TouchableOpacity onPress={onSelect}>
		<View style={StyleSheet.flatten([
			styles.ageOption,
			isSelected && styles.ageOptionSelected
		])}>
			<StyledText
				size={TextSize.BodyLarge}
				color={isSelected ? 'brand' : 'contentDim'}
			>
				{age}
			</StyledText>
		</View>
	</TouchableOpacity>
);

const OnboardAgeSettings = () => {
	const {selectedAge, setSelectedAge} = useOnboardData();
	const ageRanges = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

	const handleAgeSelect = (age: string) => {
		setSelectedAge(age);
	};

	const handleNext = () => {
		if (selectedAge) {
			// TODO: 선택된 나이 저장 로직 구현
			router.push('/onboard/foodCheckPasta'); // 다음 온보딩 페이지로 이동
		}
	};

	return (
		<OnboardTemplate
			currentStep={1}
			buttonText="다음"
			disabled={!selectedAge}
			title="당신의 연령대를 알려주세요"
			description="나이에 맞는 맞춤형 레시피와 건강한 식단을 추천해드립니다"
			onButtonPress={handleNext}
		>
			<View style={styles.container}>
				<Column style={styles.ageGrid}>
					{ageRanges.map((age) => (
						<AgeOption
							key={age}
							age={age}
							isSelected={selectedAge === age}
							onSelect={() => handleAgeSelect(age)}
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
	ageGrid: {
		gap: 12,
	},
	ageOption: {
		padding: 16,
		backgroundColor: Colors.containerDark,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.containerDark,
	},
	ageOptionSelected: {
		backgroundColor: Colors.brandContainer,
		borderColor: Colors.brand,
	}
});

export default OnboardAgeSettings;