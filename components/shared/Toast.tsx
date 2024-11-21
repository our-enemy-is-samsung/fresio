import {StyleSheet, ViewStyle} from 'react-native';
import {AnimatePresence, MotiView} from 'moti';
import {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";
import {IColorToken} from "@/types/Color";

type ToastType = 'info' | 'success' | 'error' | 'warn';

interface ToastConfig {
	bg: keyof IColorToken;
	color: string;
	icon: keyof typeof Feather.glyphMap;
}

interface ToastProps {
	text: string;
	type?: ToastType;
	duration: number;
	style?: ViewStyle;
	onDismiss?: () => void;
}

function toastTypeToColor(type: ToastType): keyof IColorToken {
	switch (type) {
		case 'info':
			return 'contentDim';
		case 'success':
			return 'success';
		case 'error':
			return 'error';
		case 'warn':
			return 'brandDark';
	}
}

const getToastConfig = (type: ToastType): ToastConfig => {
	const config: Record<ToastType, ToastConfig> = {
		info: {
			bg: 'contentDim',
			color: Colors.containerDark,
			icon: 'info'
		},
		success: {
			bg: 'success',
			color: Colors.successBackground,
			icon: 'check-circle'
		},
		error: {
			bg: 'error',
			color: Colors.errorBackground,
			icon: 'alert-circle'
		},
		warn: {
			bg: 'brandDark',
			color: Colors.brandContainer,
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
			if (onDismiss) {
				setTimeout(onDismiss, 300);
			}
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
						{backgroundColor: Colors[config.bg]},
						style,
					]}
				>
					<Row style={styles.content}>
						<Feather name={config.icon} size={20} color={config.color}/>
						<StyledText
							size={TextSize.BodySmall}
							style={{color: config.color}}
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