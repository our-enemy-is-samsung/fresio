import {SafeAreaView, StyleSheet} from "react-native";
import React, {useState} from "react";
import {Colors} from "@/constants/Color";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface OnboardTemplateProps {
	children?: React.ReactNode;
}

const OnboardTemplate = ({children}: OnboardTemplateProps) => {
	const [step, setStep] = useState('');
	const inset = useSafeAreaInsets();
	return (
		<>
			<SafeAreaView style={{
				...styles.container,

			}}>
				<BackButtonHeader />
				{children}
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surfaceDim
	}
});

export default OnboardTemplate
