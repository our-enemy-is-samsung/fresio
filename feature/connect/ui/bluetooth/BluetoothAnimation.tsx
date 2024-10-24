import LottieView from "lottie-react-native";
import BluetoothJson from '@/assets/lottie/bluetooth.json';
import {FC} from "react";

interface BluetoothAnimationProps {
	width: number;
}

export const BluetoothAnimation: FC<BluetoothAnimationProps> = ({width}) => (
	<LottieView
		autoPlay
		style={{
			width,
			height: width,
		}}
		source={BluetoothJson}
	/>
);