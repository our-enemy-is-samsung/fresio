import {SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import OnboardNextHeader from "@/feature/onboard/ui/onboardNextHeader";
import OnboardTitle from "@/feature/onboard/ui/onboardTitle";

const PageConnectDevice = () => {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<SafeAreaView style={{marginTop: safeAreaInsets.top}}>
			<OnboardNextHeader />
			<OnboardTitle title={'기기 연결'} description={'프레시오의 페어링 버튼을 3초 이상 눌러주세요\n' +
				'연결이 준비되면 기기에서 소리가 재생됩니다'} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {}
});

export default PageConnectDevice;