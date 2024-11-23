import {SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Color";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import useToastStore from "@/state/toast";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

const MAX_STEPS = 6;

interface OnboardTemplateProps {
	children?: React.ReactNode;
	currentStep?: number;
	buttonText?: string;
	disabled?: boolean;
	title?: string;
	description?: string;
	onStepComplete?: (step: number) => void;
	onButtonPress?: () => void;
}

const ProgressBar = ({currentStep}: { currentStep: number }) => {
	return (
		<View style={styles.progressContainer}>
			{[...Array(MAX_STEPS)].map((_, index) => (
				<View
					key={index}
					style={[
						styles.progressBar,
						{
							backgroundColor: index < currentStep
								? Colors.brand
								: Colors.containerDarker,
						}
					]}
				/>
			))}
		</View>
	);
};

const OnboardTemplate = ({
	                         children,
	                         currentStep = 1,
	                         buttonText = "다음",
	                         disabled = false,
	                         title,
	                         description,
	                         onStepComplete,
	                         onButtonPress,
                         }: OnboardTemplateProps) => {
	const inset = useSafeAreaInsets();

	const handleStepComplete = () => {
		onButtonPress?.();
		onStepComplete?.(currentStep);
	};

	return (
		<SafeAreaView style={[
			styles.container,
			{paddingTop: inset.top}
		]}>
			<BackButtonHeader/>
			<ProgressBar currentStep={currentStep}/>
			{(title || description) && (
				<View style={styles.headerContainer}>
					{title && (
						<StyledText
							size={TextSize.TitleSmall}
							color="content"
						>
							{title}
						</StyledText>
					)}
					{description && (
						<StyledText
							size={TextSize.ContentLarge}
							color="contentDim"
						>
							{description}
						</StyledText>
					)}
				</View>
			)}
			<View style={styles.content}>
				{children}
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity
					style={[
						styles.button,
						disabled && styles.buttonDisabled
					]}
					onPress={handleStepComplete}
					disabled={disabled}
				>
					<View style={styles.buttonContent}>
						<StyledText
							size={TextSize.HeadingSmall}
							color="surface"
							textAlign={'center'}
							style={{width: '100%'}}
						>
							{buttonText}
						</StyledText>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surfaceDim
	},
	headerContainer: {
		paddingHorizontal: 22,
		marginTop: 22,
		marginBottom: 32,
		gap: 15,
	},
	progressContainer: {
		flexDirection: 'row',
		paddingHorizontal: 22,
		paddingVertical: 16,
		gap: 4
	},
	progressBar: {
		flex: 1,
		height: 4,
		borderRadius: 2,
		backgroundColor: Colors.containerDarker
	},
	content: {
		flex: 1
	},
	bottom: {
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 40,
	},
	button: {
		backgroundColor: Colors.brand,
		borderRadius: 22,
		width: 358,
		height: 59,
		justifyContent: 'center',
	},
	buttonDisabled: {
		backgroundColor: Colors.containerDarker,
		opacity: 0.5,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: '100%',
	}
});

export default OnboardTemplate;