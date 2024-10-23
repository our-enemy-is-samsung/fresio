import {TextStyle, TouchableOpacity, useColorScheme, ViewStyle} from 'react-native';
import {ReactNode} from 'react';
import StyledText from "@/components/atoms/Text";
import {Colors} from "@/shared/constants/Color";
import {getButtonColor, getButtonSize} from "@/shared/utils/getButtonStyle";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {TextSize} from "@/shared/enums/TextSize";

interface ButtonProps {
	style: ButtonStyle;
	size: ButtonSize,
	radius?: number;
	fullWidth?: boolean;
	children?: ReactNode;
	align?: 'center' | 'flex-start' | 'flex-end';
	onPress?: () => void;
	disabled?: boolean;
	buttonStyles?: ViewStyle;
}

interface ButtonStyleType extends ViewStyle, TextStyle {
	color: keyof typeof Colors.light & keyof typeof Colors.dark;
	fontWeight: 'bold';
}

const StyledButton = ({
	                      style,
	                      size,
	                      radius,
	                      fullWidth,
	                      children,
	                      align = 'center',
	                      onPress,
	                      disabled,
	                      buttonStyles
                      }: ButtonProps) => {
	const colorScheme = useColorScheme() ?? 'light';

	let buttonStyle: ButtonStyleType = {
		width: fullWidth ? '100%' : 'auto',

		alignSelf: align,
		alignItems: 'center',
		justifyContent: 'center',

		fontSize: getButtonSize(size).fontSize ?? 18,

		...getButtonSize(size),
		...getButtonColor(style, colorScheme),
		borderRadius: radius ?? getButtonSize(size).borderRadius,

		...buttonStyles,
	};

	if (disabled) {
		buttonStyle = {
			...buttonStyle,
			backgroundColor: Colors[colorScheme]['grayScale20'],
			opacity: 0.5,
		};
	}

	return (
		<TouchableOpacity
			testID={'button_view'}
			style={{
				...buttonStyle,
			}}
			activeOpacity={0.7}
			onPress={onPress}
			disabled={disabled}
		>
			<StyledText color={getButtonColor(style, colorScheme).color} size={TextSize.BodySmall}
			            style={{fontSize: buttonStyle.fontSize}}>{children}</StyledText>
		</TouchableOpacity>
	);
};

export default StyledButton;