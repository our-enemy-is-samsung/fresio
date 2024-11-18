import {ReactNode} from "react";
import View from "@/components/shared/View";
import {StyleSheet} from "react-native";

export const Column = ({ children }: {children: ReactNode}) => {
	return (
		<View style={styles.container}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	}
});