import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Dimensions, Platform, SafeAreaView, StyleSheet} from "react-native";
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {useRouter} from "expo-router";
import {BluetoothAnimation} from "@/feature/connect/ui/bluetooth/BluetoothAnimation";

/**
 * 블루투스 권한 요청 페이지 컴포넌트
 *
 * @component
 * @description
 * 사용자에게 블루투스 권한을 요청하는 페이지를 렌더링합니다.
 * 블루투스 관련 애니메이션과 함께 권한 요청 설명을 표시하고,
 * 사용자가 수락/거절할 수 있는 버튼을 제공합니다.
 *
 * @example
 * ```tsx
 * <PageBluetoothRequired />
 * ```
 */
const PageBluetoothRequired = () => {
	const router = useRouter();

	const handleNext = () => router.push('/(connect)/findingDevice');
	const handleCancel = () => {/* 취소 로직 */};

	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.HeadingLarge} color={'grayScale100'}>블루투스 허용</Text>
					<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'} style={{lineHeight: 24}}>
						근처 블루투스 기기를 감지하고 연결하려면 {'\n'}블루투스를 사용해야 합니다
					</Text>
				</View>
				<BluetoothAnimation width={Dimensions.get('window').width} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Secondary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
					onPress={handleCancel}
				>취소</Button>
				<Button
					radius={9999}
					style={ButtonStyle.Primary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
					onPress={handleNext}
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
		paddingBottom: Platform.OS === 'ios' ? 0 : 20,
	}
})

export default PageBluetoothRequired;