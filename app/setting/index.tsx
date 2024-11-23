import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Color';
import useToastStore from "@/state/toast";
import PageHeader from "@/components/shared/PageHeader";
import {Row} from "@/components/shared/Row";
import HeaderDevice from "@/components/setting/HeaderDevice";
import DeviceCamera from '@/assets/images/setting/fresio_cam.png';

const PageSettings = () => {
	const {addToast} = useToastStore();

	return (
		<ScrollView style={{
			...styles.container,
			paddingTop: 10,
		}}>
			<PageHeader name={'설정'} style={{marginTop: 10}}/>
			<Row style={styles.header}>
				<HeaderDevice
					image={DeviceCamera}
					name={'프레시오 카메라'}
					connected={true}
					registeredOnApp={true}
				/>
			</Row>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	header: {
		justifyContent: 'space-between',
		gap: 18,

		paddingHorizontal: 22,
	},
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

export default PageSettings;