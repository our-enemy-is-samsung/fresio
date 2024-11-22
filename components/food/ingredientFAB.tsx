import {Modal, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {Colors} from "@/constants/Color";
import React, {useRef, useState} from 'react';
import useToastStore from "@/state/toast";
import useIngredientStore from "@/state/ingredient";
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";
import {Column} from "@/components/shared/Column";
import StyledButton from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";

interface IngredientFABProps {
	ingredientId: string;
	onUpdate: () => void;
	style?: ViewStyle;
	testID?: string;
}

const IngredientFAB = ({
	                       ingredientId,
	                       onUpdate,
	                       style,
	                       testID
                       }: IngredientFABProps) => {
	const [modalVisible, setModalVisible] = useState(false);
	const {addToast} = useToastStore();
	const {addIngredientToList} = useIngredientStore();
	const [quantity, setQuantity] = useState('');
	const [expiryDate, setExpiryDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isQuantityFocused, setIsQuantityFocused] = useState(false);
	const inputRef = useRef<TextInput>(null);

	const handleSubmit = async () => {
		if (!quantity.trim()) {
			addToast('수량을 입력해주세요.', 'warn', 3000);
			return;
		}

		try {
			await addIngredientToList(ingredientId, {
				name: ingredientId,
				quantity: quantity.trim(),
				expiredAt: format(expiryDate, 'yyyy-MM-dd'),
				thumbnailImage: ""
			});
			addToast('재료가 추가되었습니다.', 'success');
			setModalVisible(false);

			// Reset form
			setQuantity('');
			setExpiryDate(new Date());

			onUpdate();
		} catch (error) {
			addToast('재료 추가 중 오류가 발생했습니다.', 'error');
		}
	};

	return (
		<>
			<TouchableOpacity
				testID={testID}
				style={[styles.mainButton, style]}
				onPress={() => setModalVisible(true)}
				activeOpacity={0.8}
			>
				<Feather
					name="plus"
					size={24}
					color={Colors.surface}
				/>
			</TouchableOpacity>

			<Modal
				visible={modalVisible}
				transparent
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Row style={styles.header}>
							<StyledText size={TextSize.HeadingSmall} color="content">
								재료 기록 추가
							</StyledText>
							<TouchableOpacity onPress={() => setModalVisible(false)}>
								<Feather name="x" size={24} color={Colors.contentDim}/>
							</TouchableOpacity>
						</Row>

						<Column style={styles.inputSection}>
							<View style={styles.inputContainer}>
								<StyledText size={TextSize.BodySmall} color="contentDim" style={styles.inputLabel}>
									수량
								</StyledText>
								<View style={[
									styles.inputWrapper,
									isQuantityFocused && styles.inputWrapperFocused
								]}>
									<TextInput
										ref={inputRef}
										style={styles.input}
										value={quantity}
										onChangeText={setQuantity}
										onFocus={() => setIsQuantityFocused(true)}
										onBlur={() => setIsQuantityFocused(false)}
										placeholder="수량을 입력하세요"
										placeholderTextColor={Colors.contentSecondary}
										keyboardType="numeric"
									/>
									{quantity.length > 0 && (
										<TouchableOpacity
											style={styles.clearButton}
											onPress={() => setQuantity('')}
										>
											<Feather name="x-circle" size={16} color={Colors.contentSecondary}/>
										</TouchableOpacity>
									)}
								</View>
							</View>

							<View style={styles.inputContainer}>
								<StyledText size={TextSize.BodySmall} color="contentDim" style={styles.inputLabel}>
									유통기한
								</StyledText>
								<TouchableOpacity
									style={styles.dateInputWrapper}
									onPress={() => setShowDatePicker(true)}
								>
									<StyledText size={TextSize.BodySmall} color="content">
										{format(expiryDate, 'yyyy년 MM월 dd일')}
									</StyledText>
									<Feather name="calendar" size={16} color={Colors.contentDim}/>
								</TouchableOpacity>
								{showDatePicker && (
									<DateTimePicker
										value={expiryDate}
										mode="date"
										onChange={(event, date) => {
											setShowDatePicker(false);
											if (date) setExpiryDate(date);
										}}
									/>
								)}
							</View>
						</Column>

						<View style={styles.buttonContainer}>
							<StyledButton
								style={ButtonStyle.Secondary}
								size={ButtonSize.Medium}
								onPress={() => setModalVisible(false)}
							>
								취소
							</StyledButton>
							<StyledButton
								style={ButtonStyle.Primary}
								size={ButtonSize.Medium}
								onPress={handleSubmit}
								buttonStyles={{flex: 1}}
							>
								등록하기
							</StyledButton>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	mainButton: {
		position: 'absolute',
		right: 20,
		bottom: 90,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: Colors.surface,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 34,
		height: 340,
	},
	header: {
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	inputSection: {
		gap: 16,
		flex: 1,
	},
	inputContainer: {
		gap: 8,
	},
	inputLabel: {
		marginLeft: 4,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.containerDarkest,
		borderRadius: 12,
		backgroundColor: Colors.surface,
		paddingHorizontal: 16,
		height: 48,
	},
	inputWrapperFocused: {
		borderColor: Colors.brand,
		borderWidth: 2,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: Colors.content,
		padding: 0,
	},
	clearButton: {
		padding: 4,
	},
	dateInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: Colors.containerDarkest,
		borderRadius: 12,
		backgroundColor: Colors.surface,
		paddingHorizontal: 16,
		height: 48,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 8,
		marginTop: 20,
	},
});

export default IngredientFAB;