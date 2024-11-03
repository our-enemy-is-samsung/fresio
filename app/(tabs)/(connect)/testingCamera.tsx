import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Platform, SafeAreaView, StyleSheet} from "react-native";
import View from "@/components/atoms/View";
import ConnectHeader from "@/feature/connect/ui/ConnectHeader";
import Button from "@/components/atoms/Button";
import {ButtonSize, ButtonStyle} from "@/shared/types/Button";
import {Image} from "expo-image";
import {router} from "expo-router";

const PageTestingCamera = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<ConnectHeader/>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text size={TextSize.BodyLarge} color={'grayScale100'}>기기 카메라 테스트</Text>
					<Text size={TextSize.BodyLarge} color={'grayScale60'} textAlign={'center'}>
						카메라가 제대로 작동하는지 확인해주세요
					</Text>
				</View>
				<View style={styles.cameraContainer}>
					<Image
						source={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGlrwOvvifV7MQCXZosv0h_3J5K0UBW_Rpg&s'}
						style={styles.cameraView}
					/>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					radius={9999}
					style={ButtonStyle.Secondary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 22}}
				>보이지 않습니다</Button>
				<Button
					radius={9999}
					style={ButtonStyle.Primary}
					size={ButtonSize.Small}
					buttonStyles={{paddingHorizontal: 36}}
					onPress={() => router.push('/(connect)/finishConnect')}
				>제대로 보입니다</Button>
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
	cameraContainer: {
		paddingHorizontal: 22,
		marginTop: 36,
	},
	cameraView: {
		width: '100%',
		height: 270,

		borderRadius: 12,
	},

	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,

		paddingHorizontal: 20,
		paddingBottom: Platform.OS === 'ios' ? 0 : 20,
	}
})

export default PageTestingCamera;