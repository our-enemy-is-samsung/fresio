import {Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";

interface ColorSelectorProps {
	color: string;
	setColor: (color: string) => void;
	isSelected: boolean;
}

const ColorSelector = ({color, setColor, isSelected}: ColorSelectorProps) => {
	return (
		<View style={[styles.wrapper, isSelected && styles.selected, {borderColor: color}]}>
			<Pressable
				style={[
					styles.container,
					{backgroundColor: color},
				]}
				onPress={() => setColor(color)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 40,  // 내부 컨테이너(40px) + 양쪽 padding(5px*2)
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: 28,
		height: 28,
		borderRadius: 20,
	},
	selected: {
		borderWidth: 3,
		borderRadius: 25, // wrapper의 width/2
	}
});

export default ColorSelector;