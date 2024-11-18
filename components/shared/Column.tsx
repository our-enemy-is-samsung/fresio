import {ReactNode} from "react";
import View from "@/components/shared/View";
import {StyleSheet, ViewStyle} from "react-native";

export const Column = ({ children, style }: {children: ReactNode, style?: ViewStyle}) => {
	return (
		<View style={{
			...styles.container,
			...style
		}}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	}
});