import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {FoodLifeTimeType} from "@/types/Food/Food";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";
import {Column} from "@/components/shared/Column";
import {calculateRemainingDays, getLifeTimeColor} from "@/utils/Food/time";

const FoodLifeTimeCard = ({emoji, lifeTime, name, quantity}: FoodLifeTimeType) => {
	return (
		<TouchableOpacity activeOpacity={0.7} style={styles.container}>
			<Row style={styles.top}>
				<StyledText style={styles.foodEmoji} size={TextSize.TitleSmall}
				            color={'content'}>{emoji}</StyledText>
				<StyledText style={styles.foodQuantity} size={TextSize.BodyLarge}
				            color={'contentSecondary'}>x{quantity}</StyledText>
			</Row>
			<Column style={styles.bottom}>
				<StyledText style={styles.remainTime} size={TextSize.BodySmall}
				            color={getLifeTimeColor(lifeTime)}>{calculateRemainingDays(lifeTime)}</StyledText>
				<StyledText size={TextSize.BodyLarge} color={'content'}>{name}</StyledText>
			</Column>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		// 요소가 가로 전체를 사용하는 문제가 있어 자식 크기 대로만 먹게 수정
		alignSelf: 'flex-start',

		backgroundColor: Colors['container'],

		padding: 13,

		borderRadius: 14,

		// 그림자
		elevation: 1.5,
	},
	top: {
		minWidth: 120,

		justifyContent: 'space-between',
	},
	bottom: {
		marginTop: 10,
	},

	// 텍스트 관련
	foodQuantity: {
		fontWeight: 'bold',
	},
	foodEmoji: {
		marginLeft: -5,
	},
	remainTime: {
		fontWeight: 'bold',

		marginBottom: 4,
	},
});

export default FoodLifeTimeCard;