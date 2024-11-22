import React from 'react';
import {Modal, Pressable, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Color';
import View from '@/components/shared/View';
import StyledText from '@/components/shared/Text';
import {TextSize} from '@/enums/TextSize';
import {Row} from '@/components/shared/Row';
import Button from '@/components/shared/Button';
import {ButtonSize, ButtonStyle} from '@/types/Button';
import {TimerStepType} from '@/types/Timer/timerStep';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface TimerEditedModalProps {
	visible: boolean;
	onClose: () => void;
	name: string;
	emoji: string;
	color: string;
	steps: TimerStepType[];
}

const TimerEditedModal: React.FC<TimerEditedModalProps> = ({
	                                                           visible,
	                                                           onClose,
	                                                           name,
	                                                           emoji,
	                                                           color,
	                                                           steps
                                                           }) => {
	// 총 시간 계산
	const getTotalTime = () => {
		const totalMinutes = steps.reduce((acc, step) => {
			return acc + (step.hours * 60) + step.minutes;
		}, 0);

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return {hours, minutes};
	};

	const {hours, minutes} = getTotalTime();

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.backdrop}>
				<View style={styles.container}>
					<View style={styles.header}>
						<StyledText
							size={TextSize.HeadingMedium}
							color="content"
							style={styles.headerText}
						>
							타이머가 수정되었습니다
						</StyledText>
						<Pressable
							onPress={onClose}
							style={styles.closeButton}
						>
							<FontAwesome6
								name="xmark"
								size={24}
								color={Colors.contentDim}
							/>
						</Pressable>
					</View>

					<View style={styles.content}>
						{/* 타이머 미리보기 */}
						<View
							style={[
								styles.timerPreview,
								{backgroundColor: color}
							]}
						>
							<StyledText
								size={TextSize.HeadingLarge}
								color="content"
								style={styles.emoji}
							>
								{emoji}
							</StyledText>
							<StyledText
								size={TextSize.HeadingSmall}
								color="content"
								style={styles.timerName}
							>
								{name}
							</StyledText>
						</View>

						{/* 타이머 정보 */}
						<View style={styles.infoContainer}>
							<Row style={styles.infoRow}>
								<StyledText
									size={TextSize.BodyLarge}
									color="contentDim"
								>
									총 단계
								</StyledText>
								<StyledText
									size={TextSize.BodyLarge}
									color="content"
									style={{fontWeight: '600'}}
								>
									{steps.length}단계
								</StyledText>
							</Row>
							<Row style={styles.infoRow}>
								<StyledText
									size={TextSize.BodyLarge}
									color="contentDim"
								>
									총 소요 시간
								</StyledText>
								<StyledText
									size={TextSize.BodyLarge}
									color="content"
									style={{fontWeight: '600'}}
								>
									{hours > 0 && `${hours}시간 `}{minutes}분
								</StyledText>
							</Row>
						</View>

						{/* 확인 버튼 */}
						<View style={styles.buttonContainer}>
							<Button
								style={ButtonStyle.Primary}
								size={ButtonSize.Large}
								onPress={onClose}
								fullWidth
							>
								확인
							</Button>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: '90%',
		maxWidth: 400,
		backgroundColor: Colors.surface,
		borderRadius: 24,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.containerDark,
		position: 'relative',
	},
	headerText: {
		textAlign: 'center',
		fontWeight: '600',
	},
	closeButton: {
		position: 'absolute',
		right: 20,
		top: 20,
		padding: 4,
	},
	content: {
		padding: 24,
	},
	timerPreview: {
		width: '100%',
		aspectRatio: 2,
		borderRadius: 16,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	emoji: {
		marginBottom: 12,
		fontSize: 48,
	},
	timerName: {
		fontWeight: '600',
		textAlign: 'center',
	},
	infoContainer: {
		backgroundColor: Colors.surfaceDim,
		borderRadius: 12,
		padding: 16,
		marginBottom: 24,
	},
	infoRow: {
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	buttonContainer: {
		paddingHorizontal: 16,
	},
});

export default TimerEditedModal;