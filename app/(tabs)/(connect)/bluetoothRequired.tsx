import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import BluetoothJson from '@/assets/lottie/bluetooth.json';
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useRouter} from "expo-router";

const PageBluetoothRequired = () => {
	const router = useRouter();

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>블루투스 허용</Text>
					<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'}>
						근처 블루투스 기기를 감지하고 연결하려면 {'\n'}블루투스를 사용해야 합니다
					</Text>
				</View>
				<LottieView
					autoPlay
					style={{
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').width,
					}}
					source={BluetoothJson}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Secondary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
				>취소</Button>
				<Button
					radius={9999}
					style={ButtonStyle.Primary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
					onPress={() => router.push('/(connect)/findingDevice')}
				>
					다음
				</Button>
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,

		paddingHorizontal: 20,
	}
})

export default PageBluetoothRequired;