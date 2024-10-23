import View from "@/components/atoms/View";
import {StyleSheet, TouchableOpacity} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

const ConnectHeader = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.touchable}>
				<Entypo name="dots-three-vertical" size={18} color="black"/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 22,
		paddingVertical: 7,

		alignItems: 'flex-end',
	},

	touchable: {
		padding: 5,
		marginRight: -5,
	}
})

export default ConnectHeader;