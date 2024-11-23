import {ImageSourcePropType, StyleSheet} from "react-native";
import React from "react";
import {Image} from "expo-image";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Column} from "@/components/shared/Column";
import {Colors} from "@/constants/Color";

interface HeaderDeviceProps {
	registeredOnApp: boolean;
	connected: boolean;
	name: string;
	image: ImageSourcePropType;
}

const HeaderDevice = ({registeredOnApp, connected, name, image}: HeaderDeviceProps) => {
	return (
		<Column style={{
			...styles.headerItem,
			...(registeredOnApp && connected ? {backgroundColor: Colors.container} : {}),
		}}>
			<Image
				source={image}
				style={{width: 30, height: 30, opacity: 0.7}}
			/>
			<StyledText size={TextSize.BodyLarge} color={'contentDim'} style={styles.headerDeviceName}>{name}</StyledText>
		</Column>
	)
}

const styles = StyleSheet.create({
	container: {},
	headerItem: {
		flex: 1,
		padding: 12,
		backgroundColor: Colors.containerDark,
		borderRadius: 12
	},
	headerDeviceName: {
		marginTop: 12,
	}
});

export default HeaderDevice
