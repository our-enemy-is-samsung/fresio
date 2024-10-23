// components/Text.tsx
import {Text, TextStyle, useColorScheme} from 'react-native';
import {getSizeStyle} from '@/shared/utils/getTextSize';
import {FC, ReactNode} from 'react';
import {Colors} from "@/shared/constants/Color";
import {TextSize} from "@/shared/enums/TextSize";

interface TextProps {
	size: TextSize;
	color: keyof typeof Colors.light & keyof typeof Colors.dark;
	children: ReactNode;
	style?: TextStyle;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'; // 추가: 텍스트 정렬
	numberOfLines?: number; // 추가: 텍스트 표시 줄 수
	ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // 추가: 텍스트가 넘칠 때 처리 방식
	maxWidth?: boolean; // 추가: 텍스트 최대 너비
	testID?: string;
}

const StyledText: FC<TextProps> = ({
	                                   testID,
	                                   size,
	                                   color,
	                                   children,
	                                   style,
	                                   numberOfLines,
	                                   ellipsizeMode,
	                                   textAlign,
	                                   maxWidth
                                   }) => {
	const colorScheme = useColorScheme();
	// 기본 텍스트 스타일
	const textStyle: TextStyle = {
		...getSizeStyle(size),
		width: maxWidth ? '100%' : 'auto', // 추가: 최대 너비 적용
		textAlign: textAlign, // 추가: 텍스트 정렬 적용
		color: colorScheme === 'dark' ? Colors.dark[color] : Colors.light[color],
		...style,
	};

	return (
		<Text
			style={textStyle}
			numberOfLines={numberOfLines} // 추가: 줄 수 적용
			ellipsizeMode={ellipsizeMode} // 추가: 넘침 처리 방식 적용
			testID={testID} // 추가: 테스트 ID 적용
		>
			{children}
		</Text>
	);
};

export default StyledText;