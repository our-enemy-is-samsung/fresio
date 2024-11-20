import {StyleSheet, View, ViewStyle} from "react-native";
import React from "react";

interface SectionContainerProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

const SectionContainer = ({children, style}: SectionContainerProps) => {
	return (
		<View style={{...styles.container, ...style}}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
	}
});

export default SectionContainer
