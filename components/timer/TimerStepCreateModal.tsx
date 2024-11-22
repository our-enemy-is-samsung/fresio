import {Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import View from '@/components/shared/View';
import {Colors} from '@/constants/Color';
import StyledText from '@/components/shared/Text';
import {TextSize} from '@/enums/TextSize';
import {Row} from '@/components/shared/Row';
import {Column} from '@/components/shared/Column';
import Button from '@/components/shared/Button';
import {ButtonSize, ButtonStyle} from '@/types/Button';
import {MaterialIcons} from '@expo/vector-icons';

interface TimerStepModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: (hours: number, minutes: number, recipe: string) => void;
}

const TimerStepModal = ({visible, onClose, onSubmit}: TimerStepModalProps) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [recipe, setRecipe] = useState('');

	const handleIncrement = (type: 'hours' | 'minutes') => {
		if (type === 'hours') {
			setHours(prev => (prev < 23 ? prev + 1 : prev));
		} else {
			setMinutes(prev => (prev < 59 ? prev + 1 : prev));
		}
	};

	const handleDecrement = (type: 'hours' | 'minutes') => {
		if (type === 'hours') {
			setHours(prev => (prev > 0 ? prev - 1 : prev));
		} else {
			setMinutes(prev => (prev > 0 ? prev - 1 : prev));
		}
	};

	const handleSubmit = () => {
		if (hours === 0 && minutes === 0) return;
		onSubmit(hours, minutes, recipe);
		setHours(0);
		setMinutes(0);
		setRecipe('');
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<View style={styles.backdrop}>
				<View style={styles.container}>
					<View style={styles.header}>
						<StyledText size={TextSize.HeadingSmall} color="content">
							타이머 단계 추가
						</StyledText>
						<TouchableOpacity onPress={onClose}>
							<MaterialIcons name="close" size={24} color={Colors.contentDim}/>
						</TouchableOpacity>
					</View>

					<Column style={styles.content}>
						<Row style={styles.timeSection}>
							<Column style={styles.timeContainer}>
								<StyledText size={TextSize.BodySmall} color="contentDim">
									시간
								</StyledText>
								<Row style={styles.timeControl}>
									<TouchableOpacity
										style={styles.timeButton}
										onPress={() => handleDecrement('hours')}
									>
										<MaterialIcons name="remove" size={24} color={Colors.contentDim}/>
									</TouchableOpacity>
									<StyledText size={TextSize.HeadingLarge} color="content">
										{hours.toString().padStart(2, '0')}
									</StyledText>
									<TouchableOpacity
										style={styles.timeButton}
										onPress={() => handleIncrement('hours')}
									>
										<MaterialIcons name="add" size={24} color={Colors.contentDim}/>
									</TouchableOpacity>
								</Row>
							</Column>

							<Column style={styles.timeContainer}>
								<StyledText size={TextSize.BodySmall} color="contentDim">
									분
								</StyledText>
								<Row style={styles.timeControl}>
									<TouchableOpacity
										style={styles.timeButton}
										onPress={() => handleDecrement('minutes')}
									>
										<MaterialIcons name="remove" size={24} color={Colors.contentDim}/>
									</TouchableOpacity>
									<StyledText size={TextSize.HeadingLarge} color="content">
										{minutes.toString().padStart(2, '0')}
									</StyledText>
									<TouchableOpacity
										style={styles.timeButton}
										onPress={() => handleIncrement('minutes')}
									>
										<MaterialIcons name="add" size={24} color={Colors.contentDim}/>
									</TouchableOpacity>
								</Row>
							</Column>
						</Row>

						<Column style={styles.recipeSection}>
							<StyledText size={TextSize.BodySmall} color="contentDim">
								레시피 메모
							</StyledText>
							<TextInput
								style={styles.recipeInput}
								placeholder="레시피를 입력해주세요"
								value={recipe}
								onChangeText={setRecipe}
								multiline
								maxLength={100}
							/>
						</Column>

						<Button
							style={ButtonStyle.Primary}
							size={ButtonSize.Large}
							fullWidth
							disabled={hours === 0 && minutes === 0}
							onPress={handleSubmit}
						>
							추가하기
						</Button>
					</Column>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	container: {
		backgroundColor: Colors.surface,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingHorizontal: 16,
		paddingBottom: 34,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 16,
	},
	content: {
		gap: 24,
	},
	timeSection: {
		justifyContent: 'space-between',
		gap: 16,
	},
	timeContainer: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
	},
	timeControl: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		padding: 12,
	},
	timeButton: {
		padding: 8,
	},
	recipeSection: {
		gap: 8,
	},
	recipeInput: {
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		padding: 16,
		height: 100,
		textAlignVertical: 'top',
		fontSize: 15,
	},
});

export default TimerStepModal;