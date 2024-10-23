import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import ListLoading from '@/assets/lottie/listLoading.json';
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useEffect, useState} from "react";
import BlutoothDevice from "@/feature/connect/ui/BlutoothDevice";

const PageFindingDevice = () => {
	const [findingDevice, setFindingDevice] = useState<Array<{ name: string, id: string }>>([]);

	useEffect(() => {
		setTimeout(() => {
			setFindingDevice([
				{
					name: 'FresioSmartFridge_V1',
					id: 'mkmlmko-1234-1234-1234-1234',
				},
				{
					name: 'FresioSmartFridge_V1',
					id: 'mkmlmko-1234-1234-1234-1234',
				}
			])
		}, 2000)
	})

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>
						{findingDevice.length > 0 ? `${findingDevice.length}개의 스마트 기기를 찾았어요` : '기기 찾는 중...'}
					</Text>
				</View>

				{findingDevice && (
					<View style={styles.findingDeviceContainer}>
						{findingDevice.map((device, index) => (
							<BlutoothDevice key={index} deviceName={device.name} onClick={() => {
							}}/>
						))}
					</View>
				)}
				{findingDevice.length === 0 && (
					<LottieView
						autoPlay
						style={{
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').width,
							transform: [
								{scale: 1.1}, // 확대 비율 조정
							]
						}}
						speed={0.7}
						source={ListLoading}
					/>
				)}
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
				>다음</Button>
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
	},

	findingDeviceContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 28,

		paddingTop: 36,
		paddingHorizontal: 22,
	}
})

export default PageFindingDevice;