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

	mt?: number;
	mb?: number;
	ml?: number;
	mr?: number;

	// p
	pt?: number;
	pb?: number;
	pl?: number;
	pr?: number;
}

const StyledView: FC<ViewProps> = ({
	                                   testID,
	                                   backgroundColor,
	                                   children,
	                                   style,
	                                   mt,
	                                   mb,
	                                   ml,
	                                   mr,
	                                   pt,
	                                   pb,
	                                   pl,
	                                   pr,
                                   }) => {
	const viewStyle: ViewStyle = {
		backgroundColor: backgroundColor ? Colors[backgroundColor] : 'transparent',
		marginTop: mt,
		marginBottom: mb,
		marginLeft: ml,
		marginRight: mr,
		paddingTop: pt,
		paddingBottom: pb,
		paddingLeft: pl,
		paddingRight: pr,
		...style,
	};

	return <View testID={testID} style={viewStyle}>{children}</View>;
};

export default StyledView;