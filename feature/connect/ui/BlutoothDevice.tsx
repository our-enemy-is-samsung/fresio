import {StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import View from "@/components/atoms/View";
import {Colors} from "@/shared/constants/Color";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface BlutoothDeviceProps {
	deviceName: string;
	onClick: () => void;
}

const BlutoothDevice = ({deviceName, onClick}: BlutoothDeviceProps) => {
	const colorScheme = useColorScheme() ?? 'light';
	return (
		<TouchableOpacity style={styles.container} onPress={onClick}>
			<View style={{
				...styles.icon,
				backgroundColor: Colors[colorScheme]['brand50'],
			}}>
				<MaterialCommunityIcons name="fridge-outline" size={24} color="white"/>
			</View>
			<View style={styles.nameContainer}>
				<Text size={TextSize.BodyLarge} color={'grayScale100'}>{deviceName}</Text>
				<Text size={TextSize.BodySmall} color={'grayScale60'}>눌러서 연결하기</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',

		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	icon: {
		width: 50,
		height: 50,

		alignItems: 'center',
		justifyContent: 'center',

		borderRadius: 9999,
	},
	nameContainer: {
		gap: 4
	}
})

export default BlutoothDevice;