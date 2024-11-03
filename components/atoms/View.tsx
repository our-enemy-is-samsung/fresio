// components/StyledView.tsx
import {useColorScheme, View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';
import {Colors} from "@/shared/constants/Color";

interface ViewProps {
	testID?: string;
	backgroundColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
	children?: ReactNode;
	style?: ViewStyle;
	isSafeArea?: boolean;
}

const StyledView: FC<ViewProps> = ({testID, backgroundColor, children, style}) => {
	const colorScheme = useColorScheme() ?? 'light';
	const viewStyle: ViewStyle = {
		backgroundColor: backgroundColor ? Colors[colorScheme][backgroundColor] : 'transparent',
		...style,
	};

	return <View testID={testID} style={viewStyle}>{children}</View>;
};

export default StyledView;