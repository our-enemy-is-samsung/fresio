import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import {StyleSheet, Text, useColorScheme, ViewStyle} from "react-native";
import {FoodLifeTimeType} from "@/feature/food/types/Food";
import View from "@/components/atoms/View";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Colors} from "@/shared/constants/Color";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";

const FoodLifeTimeMore = ({style}: {style?: ViewStyle}) => {
	return (
		<Button style={ButtonStyle.Secondary} size={ButtonSize.Small} buttonStyles={style} onPress={() => console.log('asdj')}>
			<StyledText size={TextSize.BodySmall} color={'grayScale100'}>더보기</StyledText>
		</Button>
	)
}

const FoodLifeTime = ({emoji, lifeTime, name, quantity}: FoodLifeTimeType) => {
	const colorScheme = useColorScheme() ?? 'light';
	return (
		<TouchableRippleNative style={styles.container} onPress={() => console.log('asd')}>
			<View style={styles.wrap}>
				{/* content */}
				<View style={styles.left}>
					<Text style={styles.emoji}>{emoji}</Text>
					<View style={{gap: 2}}>
						<StyledText size={TextSize.BodySmall} color={'grayScale100'}>{name}</StyledText>
						<StyledText size={TextSize.LabelLarge} color={'grayScale60'}>13일 남음</StyledText>
					</View>
				</View>
				<Text style={{
					...styles.quantity,
					color: Colors[colorScheme].grayScale40,
				}}>x{quantity}</Text>
			</View>
		</TouchableRippleNative>
	)
}

FoodLifeTime.More = FoodLifeTimeMore;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 22,
		paddingVertical: 10,
	},
	wrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	emoji: {
		fontSize: 24,
	},
	quantity: {
		fontSize: 20,

		color: 'gray',
	},
});

export default FoodLifeTime