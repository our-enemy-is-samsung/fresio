import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '@/constants/Color';
import useToastStore from "@/state/toast";
import PageHeader from "@/components/shared/PageHeader";
import {Column} from "@/components/shared/Column";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import StyledButton from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

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

const PageAgeSettings = () => {
	const {addToast} = useToastStore();
	const [selectedAge, setSelectedAge] = useState('20대');
	const inset = useSafeAreaInsets();
	const ageRanges = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

	const handleAgeSelect = (age: string) => {
		setSelectedAge(age);
	};

	const handleSave = () => {
		addToast('나이 설정이 저장되었습니다.', 'success');
		// TODO: 실제 저장 로직 구현
		router.back();
	};

	return (
		<View style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<BackButtonHeader name="사용자 나이"/>

			<ScrollView style={styles.content}>
				<View style={styles.section}>
					<StyledText
						size={TextSize.BodyLarge}
						color="contentDim"
						style={styles.description}
					>
						사용자의 나이대를 선택해주세요.
						나이에 맞는 식단과 레시피를 추천해드립니다.
					</StyledText>

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
			</ScrollView>

			<View style={styles.footer}>
				<StyledButton
					style={ButtonStyle.Primary}
					size={ButtonSize.Medium}
					fullWidth
					onPress={handleSave}
				>
					저장하기
				</StyledButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	content: {
		flex: 1,
	},
	section: {
		padding: 22,
	},
	description: {
		marginBottom: 24,
		lineHeight: 20,
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
	},
	footer: {
		padding: 22,
		paddingBottom: 34,
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
	}
});

export default PageAgeSettings;