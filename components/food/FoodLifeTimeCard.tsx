import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {FoodLifeTimeType} from "@/types/Food/Food";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";
import {Column} from "@/components/shared/Column";
import {calculateRemainingDays, getLifeTimeColor} from "@/utils/Food/time";
import View from "@/components/shared/View";

const FoodLifeTimeCard = ({emoji, lifeTime, name, quantity}: FoodLifeTimeType) => {
	return (
		<TouchableOpacity activeOpacity={0.7} style={styles.container}>
			<View style={styles.iconContainer}>
				<StyledText size={TextSize.TitleMedium} color={'content'}>{emoji}</StyledText>
			</View>
			<Row style={styles.quantityBadge}>
				<StyledText style={styles.foodQuantity} size={TextSize.LabelLarge}
				            color={'container'}>x{quantity}</StyledText>
			</Row>
			<Column style={styles.bottom}>
				<StyledText size={TextSize.BodySmall} color={'content'}>{name}</StyledText>
				<StyledText size={TextSize.BodySmall} color={getLifeTimeColor(lifeTime)}>{calculateRemainingDays(lifeTime)}</StyledText>
			</Column>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		// 요소가 가로 전체를 사용하는 문제가 있어 자식 크기 대로만 먹게 수정
		alignSelf: 'flex-start',

		backgroundColor: Colors['container'],
	},
	iconContainer: {
		width: 70,
		height: 70,

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: Colors['containerDark'],

		borderRadius: 9999,

		padding: 10,
	},

	quantityBadge: {
		// 요소가 가로 전체를 사용하는 문제가 있어 자식 크기 대로만 먹게 수정
		alignSelf: 'flex-end',

		backgroundColor: Colors['contentSecondary'],

		paddingHorizontal: 8,
		paddingVertical: 2,
		marginTop: -16,

		borderRadius: 9999,
	},

	bottom: {
		alignItems: 'center',

		marginTop: 10,
	},

	// 텍스트 관련
	foodQuantity: {
		fontWeight: 'bold',
	},
});

export default FoodLifeTimeCard;