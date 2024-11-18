import {SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import OnboardNextHeader from "@/components/onboard/onboardNextHeader";
import OnboardTitle from "@/components/onboard/onboardTitle";
import OnboardBlurGradient from "@/components/onboard/onboardBlurGradient";

const PageConnectDevice = () => {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<SafeAreaView style={{marginTop: safeAreaInsets.top, flex: 1}}>
			<OnboardNextHeader onPress={() => {}} />
			<OnboardTitle title={'제품 연결 준비'} description={'프레시오의 페어링 버튼을 3초 이상 눌러주세요\n' +
				'연결이 준비되면 기기에서 소리가 재생됩니다'} />
			<OnboardBlurGradient />

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {}
});

export default PageConnectDevice;
