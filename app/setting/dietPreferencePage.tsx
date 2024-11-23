import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '@/constants/Color';
import useToastStore from "@/state/toast";
import PageHeader from "@/components/shared/PageHeader";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

type DietType = 'normal' | 'vegan' | 'lowSalt' | 'lactoOvo';

const DietPreferencePage = () => {
	const {addToast} = useToastStore();
	const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
	const inset = useSafeAreaInsets();

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

	const handleSave = () => {
		if (selectedDiet) {
			addToast('식단 설정이 저장되었습니다.', 'success');
			// TODO: 실제 저장 로직 구현
			router.back();
		} else {
			addToast('식단을 선택해주세요.', 'error');
		}
	};

	return (
		<View style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<BackButtonHeader name="선호하는 식단"/>

			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<StyledText
						size={TextSize.BodyLarge}
						color="contentDim"
						style={styles.description}
						textAlign={'left'}
					>
						선호하는 식단을 선택하시면{'\n'}맞춤형 레시피를 추천해드립니다
					</StyledText>
				</View>

				<View style={styles.optionContainer}>
					{[
						{type: 'normal', title: '일반식', desc: '일반적인 식단을 선호해요'},
						{type: 'vegan', title: '비건', desc: '동물성 재료를 제외한 식단을 선호해요'},
						{type: 'lowSalt', title: '저염식', desc: '염분이 적은 식단을 선호해요'},
						{type: 'lactoOvo', title: '락토오보', desc: '유제품과 달걀은 섭취하는 채식 식단을 선호해요'},
					].map((item) => (
						<Animated.View
							key={item.type}
							style={{
								transform: [{scale: scaleAnims[item.type as DietType]}],
								width: '100%'
							}}
						>
							<TouchableOpacity
								style={[
									styles.option,
									selectedDiet === item.type && styles.selectedOption
								]}
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
					styles.saveButton,
					selectedDiet ? styles.saveButtonActive : styles.saveButtonInactive
				]}
				onPress={handleSave}
				disabled={!selectedDiet}
			>
				<StyledText
					size={TextSize.BodyLarge}
					color="surface"
					style={styles.saveButtonText}
				>
					저장하기
				</StyledText>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	content: {
		padding: 22,
		flex: 1,
	},
	titleContainer: {
		width: '100%',
		alignItems: 'flex-start',
		marginBottom: 22,
	},
	description: {
		lineHeight: 24,
	},
	optionContainer: {
		width: '100%',
		alignSelf: 'center',
		flexDirection: 'column',
		alignItems: 'flex-end',
		gap: 14,
	},
	option: {
		padding: 20,
		alignItems: 'flex-start',
		alignSelf: 'stretch',
		borderRadius: 12,
		backgroundColor: Colors.containerDark,
		flexDirection: 'column',
		gap: 8,
		width: '100%',
	},
	selectedOption: {
		backgroundColor: Colors.brand,
	},
	optionText: {
		marginBottom: 4,
	},
	optionSubText: {
		lineHeight: 20,
	},
	saveButton: {
		margin: 22,
		height: 56,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		marginBottom: 34,
	},
	saveButtonActive: {
		backgroundColor: Colors.brand,
	},
	saveButtonInactive: {
		backgroundColor: Colors.contentSecondary,
	},
	saveButtonText: {
		textAlign: 'center',
		fontWeight: '600',
	},
});

export default DietPreferencePage;