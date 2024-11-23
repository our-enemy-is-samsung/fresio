import {Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import React, {useCallback, useState} from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import View from "@/components/shared/View";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Row} from "@/components/shared/Row";
import TimerStepPreview from "@/components/timer/TimerStepPreview";
import {TimerColor} from "@/enums/TimerColor";
import {LinearGradient} from 'expo-linear-gradient';
import {Column} from "@/components/shared/Column";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {Colors} from "@/constants/Color";
import {FontAwesome5} from "@expo/vector-icons";
import SectionTitle from "@/components/home/SectionTitle";
import TimerDetailDeleteModal from "@/components/timer/details/TimerDetailDeleteModal";
import useTimerStore, {TimerStepType, TimerType} from "@/state/timer";

const PageTimerDetail = () => {
	const inset = useSafeAreaInsets();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const {id} = useLocalSearchParams<{ id: string }>();

	const {getTimerById, updateTimer, deleteTimer} = useTimerStore();
	const [timer, setTimer] = useState<TimerType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			const loadTimer = async () => {
				if (id) {
					setIsLoading(true);
					try {
						const timerData = await getTimerById(id);
						if (timerData) {
							setTimer(timerData);
						} else {
							router.replace('/timer');
						}
					} catch (error) {
						console.error('Failed to load timer:', error);
						router.replace('/timer');
					} finally {
						setIsLoading(false);
					}
				}
			};
			loadTimer();
		}, [id, getTimerById])
	);

	const totalTime = React.useMemo(() => {
		if (!timer) return 0;
		return timer.steps.reduce((acc: number, step: TimerStepType) => {
			return acc + (step.hours * 60) + step.minutes;
		}, 0);
	}, [timer?.steps]);

	const gradientColors = React.useMemo(() => {
		if (!timer) return ['#F5F5F5', '#FFFFFF'];
		switch (timer.color) {
			case TimerColor.Red:
				return ['#FFE5E5', '#FFFFFF'];
			case TimerColor.Orange:
				return ['#FFF0E5', '#FFFFFF'];
			case TimerColor.Mint:
				return ['#FFF8E5', '#FFFFFF'];
			case TimerColor.Green:
				return ['#E5FFE8', '#FFFFFF'];
			case TimerColor.Blue:
				return ['#E5F4FF', '#FFFFFF'];
			case TimerColor.Purple:
				return ['#F0E5FF', '#FFFFFF'];
			default:
				return ['#F5F5F5', '#FFFFFF'];
		}
	}, [timer?.color]);

	const handleDelete = async () => {
		try {
			if (timer) {
				await deleteTimer(timer.id);
				router.back();
			}
		} catch (error) {
			console.error('Failed to delete timer:', error);
		}
		setShowDeleteModal(false);
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<StyledText size={TextSize.BodyLarge} color="contentDim">Loading...</StyledText>
			</View>
		);
	}

	if (!timer) {
		return (
			<View style={styles.loadingContainer}>
				<StyledText size={TextSize.BodyLarge} color="contentDim">Timer not found</StyledText>
			</View>
		);
	}

	return (
		<>
			<ScrollView style={styles.container}>
				<StatusBar barStyle="dark-content" backgroundColor={'transparent'}/>
				<View style={styles.scrollContainer}>
					<LinearGradient
						colors={gradientColors}
						style={{
							...styles.header,
							paddingTop: inset.top + 10,
						}}
						start={{x: 0, y: 0}}
						end={{x: 0, y: 1}}
					>
						<Column>
							<Row style={{
								justifyContent: 'space-between',
								alignContent: 'center',
								marginBottom: 18,
							}}>
								<Pressable
									style={{width: '50%'}}
									onPress={() => router.push('/timer')}
								>
									<MaterialIcons name="arrow-back-ios" size={24} color="black"/>
								</Pressable>
								<Row style={styles.headerActions}>
									<Row style={styles.actionButtons}>
										<TouchableOpacity
											style={styles.iconButton}
											onPress={() => router.push(`/timer/edit/${timer.id}`)}
										>
											<MaterialIcons name="edit" size={24} color={Colors.contentDim}/>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.iconButton}
											onPress={() => setShowDeleteModal(true)}
										>
											<MaterialIcons name="delete-outline" size={24} color={Colors.contentDim}/>
										</TouchableOpacity>
									</Row>
								</Row>
							</Row>
							<Row style={{width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
								<View>
									<Row style={{width: '100%', justifyContent: 'space-between'}}>
										<StyledText size={TextSize.TitleSmall} color="content" style={styles.title}>
											{timer.name}
										</StyledText>
										<StyledText size={TextSize.TitleLarge} color="content" style={styles.emoji}>
											{timer.emoji}
										</StyledText>
									</Row>
									<Row style={styles.timeInfo}>
										<StyledText size={TextSize.ContentSmall} color="contentDim">
											총 {Math.floor(totalTime / 60)}시간 {totalTime % 60}분
										</StyledText>
										<StyledText size={TextSize.BodyLarge} color={'contentSecondary'}
													style={styles.centerDot}>·</StyledText>
										<StyledText size={TextSize.ContentSmall} color="contentDim">
											{timer.steps.length}단계
										</StyledText>
									</Row>
								</View>
							</Row>
						</Column>
					</LinearGradient>

					<Column style={styles.infoContainer}>
						<Row style={styles.infoItem}>
							<StyledText size={TextSize.BodyLarge} color={'content'} style={{fontWeight: '700'}}>
								생성일
							</StyledText>
							<StyledText size={TextSize.BodyLarge} color={'contentDim'} style={{fontWeight: '700'}}>
								{new Date(timer.createdAt).toLocaleDateString('ko-KR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</StyledText>
						</Row>
					</Column>

					<View style={styles.stepsContainer}>
						<SectionTitle title={'타이머 단계'} noPadding/>
						{timer.steps.map((step) => (
							<TimerStepPreview
								key={step.id}
								hour={step.hours}
								minute={step.minutes}
								titleColor={timer.color}
								recife={step.recipe}
								showActions={false}
							/>
						))}
					</View>
				</View>
			</ScrollView>

			<Row style={styles.buttonContainer}>
				<Pressable
					style={styles.playButton}
					onPress={() => {
						if (timer?.id) {
							router.push(`/timer/run/${timer.id}`);
						}
					}}
				>
					<MaterialIcons name="play-arrow" size={24} color={Colors.content}/>
				</Pressable>
				<Pressable style={styles.shareButton}>
					<FontAwesome5 name="chromecast" size={18} color={Colors.container}/>
					<StyledText size={TextSize.ContentSmall} color={'container'}>
						프레시오로 타이머 전송하기
					</StyledText>
				</Pressable>
			</Row>

			<TimerDetailDeleteModal
				visible={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onDelete={handleDelete}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		paddingBottom: 0,
		alignItems: 'flex-start',
		padding: 20,
	},
	headerActions: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	actionButtons: {
		flexDirection: 'row',
		gap: 8,
	},
	iconButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emoji: {
		fontSize: 36,
		lineHeight: 36,
		marginBottom: 10,
	},
	title: {
		fontWeight: 'bold',
		marginBottom: 10,
	},
	centerDot: {
		fontSize: 30,
		lineHeight: 30,
		marginBottom: -4
	},
	timeInfo: {
		gap: 10,
		alignItems: 'center',
	},
	stepsContainer: {
		padding: 22,
		gap: 12,
	},
	infoContainer: {
		padding: 22,
		paddingTop: 42,
		gap: 16
	},
	infoItem: {
		width: '100%',
		justifyContent: 'space-between',
	},
	buttonContainer: {
		padding: 10,
		paddingHorizontal: 22,
		backgroundColor: Colors.surface,
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
		gap: 10,
	},
	playButton: {
		width: 60,
		height: 55,
		backgroundColor: Colors.containerDarker,
		borderRadius: 9999,
		justifyContent: 'center',
		alignItems: 'center',
	},
	shareButton: {
		flex: 1,
		height: 55,
		backgroundColor: Colors.content,
		borderRadius: 9999,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	}
});

export default PageTimerDetail;