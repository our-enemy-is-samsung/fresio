import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import NavBarTemplate from "@/components/template/NavBarTemplate";
import React, {useEffect} from "react";
import PageHeader from "@/components/shared/PageHeader";
import View from "@/components/shared/View";
import {Colors} from "@/constants/Color";
import {HomePageStyle} from "@/constants/Home/HomeStyle";
import CreateTimerButton from "@/components/timer/createTimerButton";
import TimerPreviewCard from "@/components/timer/timerPreviewCard";
import {Row} from "@/components/shared/Row";
import {useNavigation} from "expo-router";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";
import useTimerStore, {TimerStepType} from "@/state/timer";

const PageTime = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	// 타이머 스토어에서 필요한 상태와 함수들을 가져옵니다
	const {timers, isLoading, error, fetchTimers} = useTimerStore();

	// 컴포넌트가 마운트될 때 타이머 데이터를 불러옵니다
	useEffect(() => {
		fetchTimers();
	}, [fetchTimers]);

	// 총 시간을 계산하는 헬퍼 함수
	const calculateTotalDuration = (steps: TimerStepType[]) => {
		return steps.reduce((total, step) => total + (step.hours * 60 + step.minutes), 0);
	};

	return (
		<>
			<StatusBar barStyle={'dark-content'} backgroundColor={Colors['surface']}/>
			<SafeAreaView style={styles.container}>
				<PageHeader name={'타이머'} style={{marginTop: 10}}/>
				<ScrollView style={{flex: 1}}>
					<View style={styles.section} mt={20}>
						<CreateTimerButton onPress={() => {
							navigation.navigate('timer/create')
						}}/>

						<View style={{height: 20}}/>
						<ScrollView
							showsHorizontalScrollIndicator={false}
						>
							<Row style={{flexWrap: 'wrap', gap: 10}}>
								{timers.map((timer) => (
									<TimerPreviewCard
										key={timer.id}
										id={timer.id}
										emoji={timer.emoji}
										timerName={timer.name}
										jobCount={timer.steps.length}
										duration={calculateTotalDuration(timer.steps)}
									/>
								))}
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
		backgroundColor: Colors['surfaceDim'],
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