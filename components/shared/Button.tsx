import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {ReactNode} from 'react';
import {TouchableRipple} from "react-native-paper";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import {Colors} from "@/constants/Color";
import {getButtonColor, getButtonSize} from "@/utils/getButtonStyle";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

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
	color: keyof typeof Colors;
}

const StyledButton = ({
	                      style,
	                      size,
	                      radius,
	                      fullWidth,
	                      children,
	                      align = 'center',
	                      onPress,
	                      disabled = false,
	                      buttonStyles
                      }: ButtonProps) => {
	

	let buttonStyle: ButtonStyleType = {
		width: fullWidth ? '100%' : 'auto',

		alignSelf: align,
		alignItems: 'center',
		justifyContent: 'center',

		fontSize: getButtonSize(size).fontSize ?? 18,

		...getButtonSize(size),
		...getButtonColor(style),
		borderRadius: radius ?? getButtonSize(size).borderRadius,

		...buttonStyles,
	};

	if (disabled) {
		buttonStyle = {
			...buttonStyle,
			backgroundColor: Colors['containerDarker'],
			opacity: 0.5,
		};
	}

	return (
		<TouchableOpacity
			style={{
				...buttonStyle,
			}}
			onPress={onPress}
			disabled={disabled}
		>
			<StyledText color={buttonStyle.color} size={TextSize.BodySmall}
			            style={{fontSize: buttonStyle.fontSize}}>{children}</StyledText>
		</TouchableOpacity>
	);
};

export default StyledButton;