import {Modal, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import View from "@/components/shared/View";
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {Colors} from "@/constants/Color";
import {TextSize} from "@/enums/TextSize";
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import {TimerStepType} from "@/types/Timer/timerStep";

interface TimerCreatedModalProps {
	visible: boolean;
	onClose: () => void;
	name: string;
	emoji: string;
	color: string;
	steps: TimerStepType[];
}

const TimerCreatedModal = ({visible, onClose, name, emoji, color, steps}: TimerCreatedModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.backdrop}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							<Column style={styles.content}>
								<StyledText size={TextSize.HeadingLarge} color={'content'}>
									타이머가 생성되었습니다!
								</StyledText>
								<View style={{...styles.header, backgroundColor: color}}>
									<StyledText size={TextSize.TitleMedium} color="content">
										{emoji}
									</StyledText>
									<StyledText size={TextSize.HeadingSmall} color="content" style={styles.name}>
										{name} 타이머
									</StyledText>
								</View>

								<ScrollView style={styles.scrollContainer}
								            contentContainerStyle={styles.stepsContainer}>
									{steps.map((step, index) => (
										<View key={step.id} style={styles.stepItem}>
											<Row style={styles.stepHeader}>
												<StyledText
													size={TextSize.ContentSmall}
													color="content"
													style={styles.stepTitle}
												>
													{index + 1}단계: {step.hours}시간 {step.minutes}분
												</StyledText>
											</Row>
											<StyledText size={TextSize.BodySmall} color="contentDim">
												{step.recipe || '레시피 없음'}
											</StyledText>
										</View>
									))}
								</ScrollView>

								<Button
									style={ButtonStyle.Primary}
									size={ButtonSize.Large}
									onPress={onClose}
									fullWidth
								>
									확인
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
		maxHeight: '80%',
		backgroundColor: Colors.surface,
		borderRadius: 24,
		overflow: 'hidden',
	},
	content: {
		width: '100%',
		gap: 14,
		padding: 22,
	},
	header: {
		width: '100%',
		padding: 14,
		alignItems: 'center',
		gap: 8,
		borderRadius: 12,
	},
	name: {
		fontWeight: '700',
	},
	scrollContainer: {
		maxHeight: 400,
	},
	stepsContainer: {
		gap: 10,
		paddingVertical: 4,
	},
	stepItem: {
		padding: 16,
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		gap: 8,
	},
	stepHeader: {
		justifyContent: 'space-between',
	},
	stepTitle: {
		fontWeight: '600',
	},
});

export default TimerCreatedModal;