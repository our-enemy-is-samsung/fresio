// components/StyledView.tsx
import {View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';
import {Colors} from "@/constants/Color";

interface ViewProps {
	testID?: string;
	backgroundColor?: keyof typeof Colors;
	children?: ReactNode;
	style?: ViewStyle;
	isSafeArea?: boolean;
}

const StyledView: FC<ViewProps> = ({testID, backgroundColor, children, style}) => {
	const viewStyle: ViewStyle = {
		backgroundColor: backgroundColor ? Colors[backgroundColor] : 'transparent',
		...style,
	};

	return <View testID={testID} style={viewStyle}>{children}</View>;
};

export default StyledView;