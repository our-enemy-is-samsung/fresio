// components/modal/DeleteModal.tsx
import React from 'react';
import {Dimensions, Modal, Pressable, StyleSheet} from "react-native";
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";

interface DeleteModalProps {
	visible: boolean;
	onClose: () => void;
	onDelete: () => void;
}

const TimerDetailDeleteModal = ({visible, onClose, onDelete}: DeleteModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent
			statusBarTranslucent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable
				style={styles.modalOverlay}
				onPress={onClose}
			>
				<View style={styles.modalContent} backgroundColor="surface">
					<Column style={styles.modalBody}>
						<StyledText size={TextSize.HeadingSmall} color="content" style={{fontWeight: '600'}}>
							타이머 삭제
						</StyledText>
						<StyledText size={TextSize.ContentSmall} color="contentDim" style={{marginTop: 8}}>
							이 타이머를 삭제하시겠습니까?{'\n'}
							삭제된 타이머는 복구할 수 없습니다.
						</StyledText>
					</Column>
					<Row style={styles.modalActions}>
						<Pressable
							style={[styles.modalButton, styles.cancelButton]}
							onPress={onClose}
						>
							<StyledText size={TextSize.ContentSmall} color="contentDim">취소</StyledText>
						</Pressable>
						<Pressable
							style={[styles.modalButton, styles.deleteButton]}
							onPress={onDelete}
						>
							<StyledText size={TextSize.ContentSmall} color="container">삭제</StyledText>
						</Pressable>
					</Row>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: Dimensions.get('window').width - 48,
		borderRadius: 16,
		overflow: 'hidden',
	},
	modalBody: {
		padding: 24,
		paddingBottom: 20,
	},
	modalActions: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
	},
	modalButton: {
		flex: 1,
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancelButton: {
		borderRightWidth: 1,
		borderRightColor: Colors.containerDark,
	},
	deleteButton: {
		backgroundColor: Colors.error,
	},
});

export default TimerDetailDeleteModal;