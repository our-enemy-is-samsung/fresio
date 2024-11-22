import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import {StyleSheet, ViewStyle} from "react-native";
import {calculateRemainingDays, getLifeTimeColor} from "@/utils/Food/time";
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import {FoodLifeTimeType} from "@/types/Food/Food";
import View from "@/components/shared/View";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

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

interface FoodLifeTimeProps extends FoodLifeTimeType {
	bigUI?: boolean;
	onPress?: () => void;
}

const FoodLifeTime = ({emoji, lifeTime, name, quantity, bigUI, onPress}: FoodLifeTimeProps) => {
	const remainingDaysText = calculateRemainingDays(lifeTime);
	const textColor = getLifeTimeColor(lifeTime);

	return (
		<TouchableRippleNative
			style={styles.container}
			onPress={onPress}
		>
			<View style={styles.wrap}>
				<View style={styles.left}>
					<StyledText
						size={bigUI ? TextSize.TitleMedium : TextSize.HeadingSmall}
						color="content"
					>
						{emoji}
					</StyledText>
					<View style={styles.contentContainer}>
						<StyledText
							size={bigUI ? TextSize.BodyLarge : TextSize.BodySmall}
							color="content"
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
					color="contentSecondary"
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