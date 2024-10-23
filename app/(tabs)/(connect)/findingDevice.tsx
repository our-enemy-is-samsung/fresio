import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import ListLoading from '@/assets/lottie/listLoading.json';
import CheckAnimation from '@/assets/lottie/check.json';
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useEffect, useState} from "react";

const PageFindingDevice = () => {
	const [findingDevice, setFindingDevice] = useState<{ name: string, id: string } | undefined>(undefined);

	useEffect(() => {
		setTimeout(() => {
			setFindingDevice({
				name: 'FresioSmartFridge_V1',
				id: 'mkmlmko-1234-1234-1234-1234',
			})
		}, 2000)
	})

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.TitleSmall} color={'grayScale100'}>
						{findingDevice ? `Fresio 제품을 찾았어요` : '기기 찾는 중...'}
					</Text>
					{findingDevice && (
						<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'}>
							{findingDevice.name}을(를) 등록 하시겠습니까?
						</Text>
					)}
				</View>

				{!findingDevice ? (
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
				) : (
					<View style={{
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').width,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<LottieView
							autoPlay
							loop={false}
							style={{
								width: 120,
								height: 120,
							}}
							speed={0.5}
							source={CheckAnimation}
						/>
					</View>
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