// components/modal/EditModal.tsx
import React, {useState} from 'react';
import {Modal, StyleSheet, TextInput, TouchableWithoutFeedback} from "react-native";
import {Column} from "@/components/shared/Column";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";

interface EditModalProps {
	visible: boolean;
	onClose: () => void;
	onEdit: (name: string, emoji: string) => void;
	initialName: string;
	initialEmoji: string;
}

const EditModal = ({
	                   visible,
	                   onClose,
	                   onEdit,
	                   initialName,
	                   initialEmoji
                   }: EditModalProps) => {
	const [name, setName] = useState(initialName);
	const [emoji, setEmoji] = useState(initialEmoji);

	const handleSubmit = () => {
		onEdit(name, emoji);
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.backdrop}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							<Column style={styles.content}>
								<StyledText size={TextSize.HeadingSmall} color={'content'} style={{fontWeight: '600'}}>
									타이머 수정
								</StyledText>

								<Column style={styles.inputContainer}>
									<StyledText size={TextSize.BodySmall} color={'content'}>타이머 이름</StyledText>
									<TextInput
										style={styles.input}
										value={name}
										onChangeText={setName}
										placeholder="타이머 이름을 입력해주세요"
									/>
								</Column>

								<Column style={styles.inputContainer}>
									<StyledText size={TextSize.BodySmall} color={'content'}>이모지</StyledText>
									<TextInput
										style={styles.emojiInput}
										value={emoji}
										onChangeText={setEmoji}
										placeholder="이모지를 선택해주세요"
									/>
								</Column>

								<Button
									style={ButtonStyle.Primary}
									size={ButtonSize.Large}
									onPress={handleSubmit}
									fullWidth
								>
									수정하기
								</Button>
							</Column>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	modalContainer: {
		width: '100%',
		backgroundColor: Colors.surface,
		borderRadius: 24,
		overflow: 'hidden',
	},
	content: {
		width: '100%',
		gap: 16,
		padding: 22,
	},
	inputContainer: {
		gap: 8,
	},
	input: {
		width: '100%',
		height: 48,
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		padding: 16,
		fontSize: 15,
	},
	emojiInput: {
		width: '100%',
		height: 48,
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		padding: 16,
		fontSize: 15,
	}
});

export default EditModal;