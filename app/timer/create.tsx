import {FlatList, Pressable, StyleSheet, TextInput} from "react-native";
import {Colors} from "@/constants/Color";
import React, {useMemo, useState} from "react";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import View from "@/components/shared/View";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {TimerColor} from "@/enums/TimerColor";
import PageHeader from "@/components/shared/PageHeader";
import SectionTitle from "@/components/home/SectionTitle";
import ColorSelector from "@/components/timer/colorSelector";
import {Row} from "@/components/shared/Row";
import EmojiSelectorModal from "@/components/shared/EmojiSelectModal";
import TimerStepPreview from "@/components/timer/TimerStepPreview";
import {TimerStepType} from "@/types/Timer/timerStep";
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TimerStepModal from "@/components/timer/TimerStepCreateModal";
import TimerStepPreviewNothing from "@/components/timer/TimerStepPreviewNoting";
import useToastStore from "@/state/toast";
import {useRouter} from "expo-router";
import TimerStepEditModal from "@/components/timer/TimerStepEditModal";
import useTimerStore from "@/state/timer";
import {randomEmojiForTimer} from "@/utils/emoji";
import getTimerRandomBackgroundColor from "@/utils/timer/getRandomBackgroundColor";

const PageTimerCreate = () => {
	const router = useRouter();
	const inset = useSafeAreaInsets();
	const {addToast} = useToastStore();
	const {addTimer, isLoading} = useTimerStore();

	const TimerColorList = [
		TimerColor.Red,
		TimerColor.Orange,
		TimerColor.Green,
		TimerColor.Mint,
		TimerColor.Blue,
		TimerColor.Purple,
	];

	const [timerName, setTimerName] = useState('');
	const [color, setColor] = useState<TimerColor | string>(getTimerRandomBackgroundColor());
	const [selectedEmoji, setSelectedEmoji] = useState(randomEmojiForTimer());
	const [timerStep, setTimerStep] = useState<TimerStepType[]>([]);
	const [showEmojiSelector, setShowEmojiSelector] = useState(false);
	const [showStepModal, setShowStepModal] = useState(false);
	const [editingStep, setEditingStep] = useState<{ index: number, step: TimerStepType } | null>(null);

	const isCreateButtonDisabled = useMemo(() => {
		const isNameValid = timerName.trim().length > 0;
		const hasSteps = timerStep.length > 0;
		const areStepsValid = timerStep.every(step => {
			return step.hours > 0 || step.minutes > 0;
		});

		return !isNameValid || !hasSteps || !areStepsValid;
	}, [timerName, timerStep]);

	const handleAddStep = (hours: number, minutes: number, recipe: string) => {
		setTimerStep(prev => [...prev, {
			id: `step-${prev.length + 1}`,
			hours,
			minutes,
			recipe
		}]);
	};

	const handleDeleteStep = (index: number) => {
		setTimerStep(prev => prev.filter((_, i) => i !== index));
	};

	const handleEditStep = (index: number, hours: number, minutes: number, recipe: string) => {
		setTimerStep(prev => {
			const newSteps = [...prev];
			newSteps[index] = {
				...newSteps[index],
				hours,
				minutes,
				recipe
			};
			return newSteps;
		});
	};

	const handleCreateTimer = async () => {
		if (timerName.trim().length === 0) return addToast('타이머 이름을 입력해주세요', 'error');
		if (timerStep.length === 0) return addToast('타이머 단계를 추가해주세요', 'error');

		if (!isCreateButtonDisabled) {
			try {
				await addTimer({
					name: timerName,
					color: color as TimerColor,
					emoji: selectedEmoji,
					steps: timerStep
				});
				addToast('타이머가 생성되었습니다', 'success');
				router.back();
			} catch (error) {
				console.log(error)
				addToast('타이머 생성에 실패했습니다', 'error');
			}
		}
	};

	const renderItem = () => (
		<>
			<TextInput
				placeholder={'눌러서 이름을 입력해주세요'}
				style={{
					...styles.nameInput,
					backgroundColor: color,
				}}
				textAlign={'center'}
				value={timerName}
				onChangeText={setTimerName}
			/>
			<View style={styles.section}>
				<SectionTitle title={'배경 색상'}/>
				<FlatList
					data={TimerColorList}
					renderItem={(data) => (
						<ColorSelector
							color={data.item}
							setColor={setColor}
							isSelected={color === data.item}
						/>
					)}
					horizontal
					contentContainerStyle={{
						gap: 6,
						paddingHorizontal: 16,
						paddingVertical: 10,
					}}
				/>
			</View>
			<Row style={styles.section}>
				<SectionTitle title={'이모지'}/>
				<Pressable
					style={styles.emojiButton}
					onPress={() => setShowEmojiSelector(true)}
				>
					<StyledText
						size={TextSize.HeadingLarge}
						color="content"
					>
						{selectedEmoji}
					</StyledText>
				</Pressable>
			</Row>
			<View style={{
				...styles.section,
				marginTop: 56,
			}}>
				<SectionTitle title={'타이머 단계'}/>
				<View style={{
					paddingHorizontal: 22,
					paddingVertical: 14,
					gap: 12
				}}>
					{timerStep.length > 0 ? (
						timerStep.map((step, index) => (
							<TimerStepPreview
								key={step.id}
								hour={step.hours}
								minute={step.minutes}
								titleColor={color}
								recife={step.recipe}
								onEdit={() => setEditingStep({index, step})}
								onDelete={() => handleDeleteStep(index)}
							/>
						))
					) : (
						<TimerStepPreviewNothing/>
					)}
				</View>
				<View style={{paddingHorizontal: 22}}>
					<Button
						style={ButtonStyle.Secondary}
						size={ButtonSize.Large}
						onPress={() => setShowStepModal(true)}
						fullWidth
					>
						<Row>
							<FontAwesome6 name="add" size={18} color={Colors.contentDim}/>
							<StyledText
								size={TextSize.BodyLarge}
								color="contentDim"
								style={{marginLeft: 8, fontWeight: '700'}}
							>
								타이머 단계 추가
							</StyledText>
						</Row>
					</Button>
				</View>
			</View>
			<View style={{height: 40}}/>
			<View style={{paddingHorizontal: 22}}>
				<Button
					style={ButtonStyle.Primary}
					size={ButtonSize.Large}
					onPress={handleCreateTimer}
					fullWidth
					disabled={isLoading}
				>
					{isLoading ? '생성 중...' : '타이머 생성하기'}
				</Button>
			</View>
			<View style={{height: 40}}/>
		</>
	);

	return (
		<>
			<FlatList
				style={{
					marginTop: inset.top,
				}}
				data={[1]}
				renderItem={renderItem}
				ListHeaderComponent={<PageHeader name={'타이머 생성'}/>}
				stickyHeaderIndices={[0]}
			/>
			<EmojiSelectorModal
				visible={showEmojiSelector}
				onClose={() => setShowEmojiSelector(false)}
				onEmojiSelected={setSelectedEmoji}
			/>
			<TimerStepModal
				visible={showStepModal}
				onClose={() => setShowStepModal(false)}
				onSubmit={handleAddStep}
			/>
			<TimerStepEditModal
				visible={!!editingStep}
				onClose={() => setEditingStep(null)}
				onSubmit={(hours, minutes, recipe) => {
					if (editingStep) {
						handleEditStep(editingStep.index, hours, minutes, recipe);
						setEditingStep(null);
					}
				}}
				initialHours={editingStep?.step.hours ?? 0}
				initialMinutes={editingStep?.step.minutes ?? 0}
				initialRecipe={editingStep?.step.recipe}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors['surface'],
		marginTop: 40,
	},
	section: {
		marginTop: 32,
	},
	nameInput: {
		width: '100%',
		height: 100,
		backgroundColor: '#12B7AD',
		fontSize: 28,
		fontWeight: 'bold',
	},
	emojiButton: {
		width: 60,
		height: 60,
		backgroundColor: Colors.surfaceDim,
		borderWidth: 1,
		borderColor: Colors.containerDarkest,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default PageTimerCreate;