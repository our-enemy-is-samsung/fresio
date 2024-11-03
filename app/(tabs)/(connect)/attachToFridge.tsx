import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Platform, SafeAreaView, StyleSheet} from "react-native";
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {router} from "expo-router";

const PageAttageToFridge = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>
						기기 설치
					</Text>
					<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'}>
						Fresio 기기를 냉장고에 부착해주세요
					</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Primary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
					onPress={() => router.push('/(connect)/wifiList')}
				>설치 했어요</Button>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		paddingTop: 42,
	},
	textContainer: {
		alignItems: 'center',

		gap: 20,
	},
	buttonContainer: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		gap: 12,

		paddingHorizontal: 20,
		paddingBottom: Platform.OS === 'ios' ? 0 : 20,
	}
})

export default PageAttageToFridge;