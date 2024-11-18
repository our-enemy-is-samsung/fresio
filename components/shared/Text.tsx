// components/Text.tsx
import {Text, TextStyle, } from 'react-native';
import {FC, ReactNode} from 'react';
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import {getSizeStyle} from "@/utils/getTextSize";

interface TextProps {
	size: TextSize;
	color: keyof typeof Colors;
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
	// 기본 텍스트 스타일
	const textStyle: TextStyle = {
		...getSizeStyle(size),
		width: maxWidth ? '100%' : 'auto', // 추가: 최대 너비 적용
		textAlign: textAlign, // 추가: 텍스트 정렬 적용
		color: Colors[color],
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