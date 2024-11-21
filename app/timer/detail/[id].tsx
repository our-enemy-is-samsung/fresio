import {SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

const PageTimerDetail = () => {
	const inset = useSafeAreaInsets();
	return (
		<>
			<SafeAreaView style={{marginTop: inset.top}}>
				<StyledText size={TextSize.BodySmall} color={'content'}>asd</StyledText>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {}
});

export default PageTimerDetail;
