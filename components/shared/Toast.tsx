import {StyleSheet, StyleSheetProperties} from 'react-native';
import {AnimatePresence, MotiView} from 'moti';
import {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";

type ToastType = 'info' | 'success' | 'error' | 'warn';

interface ToastProps {
	text: string;
	type?: ToastType;
	duration: number;
	style?: StyleSheetProperties;
	onDismiss?: () => void;
}

const getToastConfig = (type: ToastType) => {
	const config = {
		info: {
			bg: Colors.containerDark,
			color: 'contentDim',
			icon: 'info'
		},
		success: {
			bg: Colors.successBackground,
			color: 'success',
			icon: 'check-circle'
		},
		error: {
			bg: Colors.errorBackground,
			color: 'error',
			icon: 'alert-circle'
		},
		warn: {
			bg: Colors.brandContainer,
			color: 'brandDark',
			icon: 'alert-triangle'
		}
	};

	return config[type];
};

export default function Toast({
	                              text,
	                              type = 'info',
	                              duration,
	                              style,
	                              onDismiss,
                              }: ToastProps) {
	const [isVisible, setIsVisible] = useState(true);
	const config = getToastConfig(type);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsVisible(false);
			setTimeout(onDismiss, 300);
		}, duration);

		return () => clearTimeout(timeout);
	}, [duration, onDismiss]);

	return (
		<AnimatePresence>
			{isVisible && (
				<MotiView
					from={{translateY: -200, opacity: 0, scale: 1}}
					animate={{translateY: 0, opacity: 1, scale: 1}}
					exit={{
						translateY: -20,
						opacity: 0,
						scale: 0.9,
					}}
					transition={{
						type: 'spring',
						damping: 16,
						stiffness: 200,
						mass: 1,
					}}
					style={[
						styles.container,
						{backgroundColor: config.bg},
						style,
					]}
				>
					<Row style={styles.content}>
						<Feather name={config.icon} size={20} color={Colors[config.color]}/>
						<StyledText
							size={TextSize.BodySmall}
							color={config.color}
						>
							{text}
						</StyledText>
					</Row>
				</MotiView>
			)}
		</AnimatePresence>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		borderRadius: 12,
		elevation: 6,
		shadowColor: Colors.content,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	content: {
		width: '100%',
		gap: 12,
		paddingVertical: 16,
		paddingHorizontal: 20,
	}
});