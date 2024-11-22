import React from 'react';
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";

interface SortButtonProps {
	isActive: boolean;
	onPress: () => void;
	children: React.ReactNode;
}

const SortButton: React.FC<SortButtonProps> = ({isActive, onPress, children}) => {
	return (
		<Button
			style={isActive ? ButtonStyle.Primary : ButtonStyle.Secondary}
			size={ButtonSize.Small}
			onPress={onPress}
		>
			{children}
		</Button>
	);
};

export default SortButton;