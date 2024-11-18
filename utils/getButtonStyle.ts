import {ButtonSize, ButtonStyle} from "@/types/Button";
import {Colors} from "@/constants/Color";


export function getButtonSize(size: ButtonSize) {
	switch (size) {
		case ButtonSize.Large:
			return {
				height: 56,
				paddingHorizontal: 20,
				borderRadius: 14,
			};
		case ButtonSize.Medium:
			return {
				height: 48,
				paddingHorizontal: 16,
				borderRadius: 12,
				fontSize: 17
			};
		case ButtonSize.Small:
			return {
				height: 36,
				paddingHorizontal: 14,
				borderRadius: 10,
				fontSize: 14,
			};
		default:
			return {
				height: 48,
				paddingHorizontal: 16,
				fontSize: 16,
				borderRadius: 12,
			};
	}
}

export function getButtonColor(style: ButtonStyle): {
	backgroundColor: string,
	color: keyof typeof Colors,
} {
	switch (style) {
		case ButtonStyle.Primary:
			return {
				backgroundColor: Colors['brand'],
				color: 'container',
			};
		case ButtonStyle.Secondary:
			return {
				backgroundColor: Colors['containerDarker'],
				color: 'contentDim',
			};
		default:
			return {
				backgroundColor: Colors['containerDarker'],
				color: 'contentDim',
			}
	}
}