import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {Colors} from "@/constants/Color";
import {HomePageStyle} from "@/constants/Home/HomeStyle";
import CreateTimerButton from "@/components/timer/createTimerButton";
import TimerPreviewCard from "@/components/timer/timerPreviewCard";
import {Row} from "@/components/shared/Row";

const PageTime = () => {
	return (
		<>
			<SafeAreaView style={styles.container}>
				<PageHeader name={'타이머'}/>
				<ScrollView style={{flex: 1}}>
					<View style={styles.section} mt={20}>
						<CreateTimerButton onPress={() => {
						}}/>

						<View style={{height: 20}}/>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{gap: 12}}
						>
							<Row style={{flexWrap: 'wrap', gap: 10}}>
								<TimerPreviewCard/>
								<TimerPreviewCard/>
								<TimerPreviewCard/>
								<TimerPreviewCard/>
								<TimerPreviewCard/>
							</Row>
						</ScrollView>
					</View>
					<View style={{height: 100}}/>
				</ScrollView>
			</SafeAreaView>
			<NavBarTemplate/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',

		backgroundColor: Colors['surface'],

		paddingTop: HomePageStyle.paddingTop,
	},

	header: {
		paddingHorizontal: 22,
		paddingVertical: 5,

		justifyContent: 'space-between',
		alignItems: 'center',
	},

	section: {
		paddingHorizontal: 22,
	}
})

export default PageTime;