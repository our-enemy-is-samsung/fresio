import {Alert, Dimensions, Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {Colors} from "@/constants/Color";
import {TextSize} from "@/enums/TextSize";
import {TouchableRipple} from "react-native-paper";
import {Feather} from '@expo/vector-icons';
import {calculateRemainingDays} from "@/utils/Food/time";
import View from "@/components/shared/View";
import DateTimePicker from '@react-native-community/datetimepicker';

interface IngredientItemProps {
	ingredientName: string;
	quantity: string;
	expiredAt: string;
	createdAt: string;
	isLastItem?: boolean;
	onEdit?: (newQuantity: string, newExpiredAt: string) => void;
	onDelete?: () => void;
	showActions?: boolean;
}

const IngredientItem = ({
	                        ingredientName,
	                        quantity,
	                        expiredAt,
	                        createdAt,
	                        isLastItem = false,
	                        onEdit,
	                        onDelete,
	                        showActions = true
                        }: IngredientItemProps) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [editedQuantity, setEditedQuantity] = useState(quantity);
	const [editedExpiredAt, setEditedExpiredAt] = useState(new Date(expiredAt));
	const [showDatePicker, setShowDatePicker] = useState(false);

	const expiryDate = new Date(expiredAt);
	const createDate = new Date(createdAt);
	const remainingDays = calculateRemainingDays(expiryDate);

	const handleEditSubmit = () => {
		const newQuantity = parseInt(editedQuantity);
		if (isNaN(newQuantity) || newQuantity <= 0) {
			Alert.alert("오류", "올바른 수량을 입력해주세요.");
			return;
		}
		onEdit?.(editedQuantity, editedExpiredAt.toISOString());
		setIsEditModalVisible(false);
	};

	const handleDeletePress = () => {
		setIsDeleteModalVisible(true)
	};

	const handleDelete = () => {
		onDelete?.();
		setIsDeleteModalVisible(false);
	};

	const handleDateChange = (event: any, selectedDate?: Date) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setEditedExpiredAt(selectedDate);
		}
	};

	return (
		<>
			<TouchableRipple
				style={styles.container}
				rippleColor={Colors['brandDark']}
				android_ripple={{
					radius: 18,
				}}
				borderless
			>
				<Column style={styles.content}>
					<Row style={styles.titleRow}>
						<Column style={{gap: 4}}>
							<StyledText
								size={TextSize.BodyLarge}
								color={'content'}
								style={{fontWeight: '600'}}
							>
								{ingredientName} {quantity}개
							</StyledText>
							<StyledText
								size={TextSize.LabelSmall}
								color={'contentDim'}
							>
								{createDate.toLocaleDateString()} 추가
							</StyledText>
						</Column>
						{showActions && (
							<Row style={styles.iconContainer}>
								<TouchableOpacity
									style={styles.iconButton}
									onPress={() => setIsEditModalVisible(true)}
								>
									<Feather name="edit" size={16} color={Colors['contentDim']}/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.iconButton}
									onPress={handleDeletePress}
								>
									<Feather name="trash-2" size={18} color={Colors['contentDim']}/>
								</TouchableOpacity>
							</Row>
						)}
					</Row>
					<Row style={styles.expireInfo}>
						<StyledText size={TextSize.BodySmall} color={'brandDark'}>
							{remainingDays}
						</StyledText>
						<StyledText size={TextSize.BodySmall} color={'contentDim'}>
							{expiryDate.toLocaleDateString()} 소비기한
						</StyledText>
					</Row>
				</Column>
			</TouchableRipple>

			{/* Edit Modal */}
			<Modal
				visible={isEditModalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsEditModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<StyledText size={TextSize.HeadingSmall} color="content" style={styles.modalTitle}>
							재료 수정
						</StyledText>

						<Column style={styles.inputContainer}>
							<StyledText size={TextSize.BodySmall} color="contentDim">
								수량
							</StyledText>
							<TextInput
								style={styles.input}
								value={editedQuantity}
								onChangeText={setEditedQuantity}
								keyboardType="numeric"
								placeholder="수량을 입력하세요"
							/>
						</Column>

						<Column style={styles.inputContainer}>
							<StyledText size={TextSize.BodySmall} color="contentDim">
								소비기한
							</StyledText>
							<TouchableOpacity
								style={styles.dateInput}
								onPress={() => setShowDatePicker(true)}
							>
								<StyledText size={TextSize.BodySmall} color="content">
									{editedExpiredAt.toLocaleDateString()}
								</StyledText>
								<Feather name="calendar" size={16} color={Colors['contentDim']}/>
							</TouchableOpacity>
						</Column>

						{showDatePicker && (
							<DateTimePicker
								value={editedExpiredAt}
								mode="date"
								display="default"
								onChange={handleDateChange}
								minimumDate={new Date()}
							/>
						)}

						<Row style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalButton, styles.cancelButton]}
								onPress={() => setIsEditModalVisible(false)}
							>
								<StyledText size={TextSize.BodySmall} color="contentDim">
									취소
								</StyledText>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.modalButton, styles.confirmButton]}
								onPress={handleEditSubmit}
							>
								<StyledText size={TextSize.BodySmall} color="container">
									확인
								</StyledText>
							</TouchableOpacity>
						</Row>
					</View>
				</View>
			</Modal>

			{/* Delete Modal */}
			<Modal
				visible={isDeleteModalVisible}
				transparent
				statusBarTranslucent
				animationType="fade"
				onRequestClose={() => setIsDeleteModalVisible(false)}
			>
				<TouchableOpacity
					style={styles.deleteModalOverlay}
					onPress={() => setIsDeleteModalVisible(false)}
					activeOpacity={1}
				>
					<View style={styles.deleteModalContent} backgroundColor="surface">
						<Column style={styles.deleteModalBody}>
							<StyledText size={TextSize.HeadingSmall} color="content" style={{fontWeight: '600'}}>
								재료 삭제
							</StyledText>
							<StyledText size={TextSize.ContentSmall} color="contentDim" style={{marginTop: 8}}>
								{isLastItem ?
									`마지막 ${ingredientName} 재료를 삭제하면\n${ingredientName} 항목 전체가 삭제됩니다.` :
									"이 재료를 삭제하시겠습니까?\n삭제된 재료는 복구할 수 없습니다."}
							</StyledText>
						</Column>
						<Row style={styles.deleteModalActions}>
							<TouchableOpacity
								style={[styles.deleteModalButton, styles.deleteModalCancelButton]}
								onPress={() => setIsDeleteModalVisible(false)}
							>
								<StyledText size={TextSize.ContentSmall} color="contentDim">취소</StyledText>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.deleteModalButton, styles.deleteModalDeleteButton]}
								onPress={handleDelete}
							>
								<StyledText size={TextSize.ContentSmall} color="container">삭제</StyledText>
							</TouchableOpacity>
						</Row>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: Colors['containerDarkest'],
		padding: 16,
		paddingVertical: 14,
	},
	content: {
		gap: 12,
	},
	titleRow: {
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'flex-start',
	},
	expireInfo: {
		gap: 8,
		alignItems: 'center',
	},
	iconContainer: {
		gap: 8,
	},
	iconButton: {
		padding: 4,
		borderRadius: 4,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '80%',
		backgroundColor: Colors['surface'],
		borderRadius: 20,
		padding: 20,
	},
	modalTitle: {
		marginBottom: 20,
		fontWeight: '600',
		alignSelf: 'center',
	},
	inputContainer: {
		width: '100%',
		gap: 8,
		marginBottom: 16,
	},
	input: {
		width: '100%',
		height: 40,
		borderWidth: 1,
		borderColor: Colors['containerDarkest'],
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	dateInput: {
		width: '100%',
		height: 40,
		borderWidth: 1,
		borderColor: Colors['containerDarkest'],
		borderRadius: 8,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	modalButtons: {
		width: '100%',
		justifyContent: 'flex-end',
		gap: 12,
		marginTop: 4,
	},
	modalButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	cancelButton: {
		backgroundColor: Colors['containerDark'],
	},
	confirmButton: {
		backgroundColor: Colors['brand'],
	},
	deleteModalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteModalContent: {
		width: Dimensions.get('window').width - 48,
		borderRadius: 16,
		overflow: 'hidden',
	},
	deleteModalBody: {
		padding: 24,
		paddingBottom: 20,
	},
	deleteModalActions: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
	},
	deleteModalButton: {
		flex: 1,
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteModalCancelButton: {
		borderRightWidth: 1,
		borderRightColor: Colors.containerDark,
	},
	deleteModalDeleteButton: {
		backgroundColor: Colors.error,
	},
});

export default IngredientItem;