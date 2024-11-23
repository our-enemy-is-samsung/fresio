import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '@/constants/Color';
import useToastStore from "@/state/toast";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {Column} from "@/components/shared/Column";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import StyledButton from "@/components/shared/Button";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonSize, ButtonStyle} from "@/types/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import {router} from "expo-router";
import Slider from '@react-native-community/slider';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const DeviceVolumePage = () => {
	const {addToast} = useToastStore();
	const [volume, setVolume] = useState(50);
	const inset = useSafeAreaInsets();

	const handleSave = () => {
		addToast('볼륨 설정이 저장되었습니다.', 'success');
		// TODO: 실제 저장 로직 구현
		router.back();
	};

	return (
		<View style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<BackButtonHeader name="디바이스 볼륨"/>

			<View style={styles.content}>
				<Column style={styles.section}>
					<StyledText
						size={TextSize.BodyLarge}
						color="contentDim"
						style={styles.description}
					>
						프레시오 디바이스의 볼륨을 조절해주세요.{'\n'}
						언제든지 변경할 수 있습니다.
					</StyledText>

					<View style={styles.volumeContainer}>
						<MaterialCommunityIcons
							name={volume === 0 ? "volume-off" : volume < 30 ? "volume-low" : volume < 70 ? "volume-medium" : "volume-high"}
							size={24}
							color={Colors.content}
						/>
						<Slider
							style={styles.slider}
							minimumValue={0}
							maximumValue={100}
							value={volume}
							onValueChange={setVolume}
							minimumTrackTintColor={Colors.brand}
							maximumTrackTintColor={Colors.containerDarker}
							thumbTintColor={Colors.brand}
						/>
						<StyledText
							size={TextSize.BodyLarge}
							color="content"
						>
							{Math.round(volume)}%
						</StyledText>
					</View>

					<View style={styles.infoContainer}>
						<Ionicons name="information-circle-outline" size={20} color={Colors.contentDim}/>
						<StyledText
							size={TextSize.BodyLarge}
							color="contentDim"
						>
							현재 볼륨이 {Math.round(volume)}%로 설정됩니다
						</StyledText>
					</View>
				</Column>
			</View>

			<View style={styles.footer}>
				<StyledButton
					style={ButtonStyle.Primary}
					size={ButtonSize.Medium}
					fullWidth
					onPress={handleSave}
				>
					저장하기
				</StyledButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	content: {
		flex: 1,
	},
	section: {
		padding: 22,
		gap: 24,
	},
	description: {
		lineHeight: 20,
	},
	volumeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		paddingHorizontal: 8,
	},
	slider: {
		flex: 1,
		height: 40,
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
		backgroundColor: Colors.containerDark,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	footer: {
		padding: 22,
		paddingBottom: 34,
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
	}
});

export default DeviceVolumePage;