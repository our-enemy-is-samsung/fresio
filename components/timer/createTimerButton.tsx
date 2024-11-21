import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {TouchableRipple} from "react-native-paper";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import Ionicons from '@expo/vector-icons/Ionicons';

interface CreateTimerButtonProps {
	onPress: () => void;
}

const CreateTimerButton = ({onPress}: CreateTimerButtonProps) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
		>
			<Row style={{gap: 4}}>
				<Ionicons name="add" size={20} color={Colors['container']}/>
				<StyledText size={TextSize.ContentSmall} color={'container'}>타이머 추가하기</StyledText>
			</Row>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors['content'],

		borderRadius: 9999,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		paddingVertical: 12,
	}
});

export default CreateTimerButton
