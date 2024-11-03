import {StyleSheet} from "react-native";
import React from "react";
import View from "@/components/atoms/View";

interface SectionContainerProps {
	children: React.ReactNode;
}

const SectionContainer = ({children}: SectionContainerProps) => {
	return (
		<View style={styles.container}>
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
