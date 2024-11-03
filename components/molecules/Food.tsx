import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import {StyleSheet, ViewStyle} from "react-native";
import {FoodLifeTimeType} from "@/feature/food/types/Food";
import View from "@/components/atoms/View";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {calculateRemainingDays, getLifeTimeColor} from "@/feature/food/utils/time";

const FoodLifeTimeMore = ({style}: { style?: ViewStyle }) => {
	return (
		<Button
			style={ButtonStyle.Secondary}
			size={ButtonSize.Small}
			buttonStyles={style}
			onPress={() => console.log('더보기 클릭')}
		>
			더보기
		</Button>
	);
};

interface FoodLifeTimeProps  extends  FoodLifeTimeType {
	bigUI?: boolean;
}

const FoodLifeTime = ({emoji, lifeTime, name, quantity, bigUI}: FoodLifeTimeProps) => {
	const remainingDaysText = calculateRemainingDays(lifeTime);
	const textColor = getLifeTimeColor(lifeTime);

	return (
		<TouchableRippleNative
			style={styles.container}
			onPress={() => console.log('아이템 클릭')}
		>
			<View style={styles.wrap}>
				<View style={styles.left}>
					<StyledText
						size={bigUI ? TextSize.TitleMedium : TextSize.HeadingSmall}
						color="grayScale100"
					>
						{emoji}
					</StyledText>
					<View style={styles.contentContainer}>
						<StyledText
							size={bigUI ? TextSize.BodyLarge : TextSize.BodySmall}
							color="grayScale100"
						>
							{name}
						</StyledText>
						<StyledText
							size={TextSize.BodySmall}
							color={textColor}
						>
							{remainingDaysText}
						</StyledText>
					</View>
				</View>
				<StyledText
					size={TextSize.HeadingSmall}
					color="grayScale40"
				>
					x{quantity}
				</StyledText>
			</View>
		</TouchableRippleNative>
	);
};

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
	contentContainer: {
		gap: 4,
	}
});

export default FoodLifeTime;