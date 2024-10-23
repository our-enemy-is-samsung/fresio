// utils/getSizeStyle.ts
import {TextSize} from '@/shared/enums/TextSize';
import {TextStyle} from 'react-native';

export const getSizeStyle = (size: TextSize): TextStyle => {
	const text = Object.keys(TextSize)[Object.values(TextSize).indexOf(size)];

	const medium = 'Pretendard-Medium';
	const semiBold = 'Pretendard-SemiBold';

	const sizeMapping: { [key: string]: { fontSize: number, lineHeight: number, fontFamily: string } } = {
		'TitleLarge': {fontSize: TextSize.TitleLarge, lineHeight: 36, fontFamily: semiBold},
		'TitleMedium': {fontSize: TextSize.TitleMedium, lineHeight: 32, fontFamily: semiBold},
		'TitleSmall': {fontSize: TextSize.TitleSmall, lineHeight: 32, fontFamily: semiBold},
		'HeadingLarge': {fontSize: TextSize.HeadingLarge, lineHeight: 28, fontFamily: semiBold},
		'HeadingSmall': {fontSize: TextSize.HeadingSmall, lineHeight: 24, fontFamily: medium},
		'BodyLarge': {fontSize: TextSize.BodyLarge, lineHeight: 20, fontFamily: medium},
		'BodySmall': {fontSize: TextSize.BodySmall, lineHeight: 18, fontFamily: medium},
		'LabelLarge': {fontSize: TextSize.LabelLarge, lineHeight: 16, fontFamily: medium},
		'LabelSmall': {fontSize: TextSize.LabelSmall, lineHeight: 14, fontFamily: medium},
	};

	return sizeMapping[text];
};