import {SafeAreaView, StyleSheet} from 'react-native';
import PageHeader from "@/components/molecules/PageHeader";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import View from "@/components/atoms/View";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const HomeScreen = () => {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<View style={{flex: 1, paddingTop: safeAreaInsets.top}}>
			<PageHeader name={'홈'} />
		</View>
	);
}

export default HomeScreen;