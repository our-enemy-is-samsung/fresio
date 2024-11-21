import {Animated, Easing, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Feather, FontAwesome} from '@expo/vector-icons';
import {Colors} from "@/constants/Color";
import React, {ReactNode, useRef, useState} from 'react';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ActionButtonProps {
	icon: ReactNode;
	label: string;
	onPress: () => void;
}

interface ExpandableFABProps {
	onCameraPress: () => void;
	onFormPress: () => void;
	style?: ViewStyle;
	testID?: string;
}

const ActionButton = ({icon, onPress}: ActionButtonProps) => (
	<TouchableOpacity
		style={styles.actionButton}
		onPress={onPress}
		activeOpacity={0.8}
	>
		{icon}
	</TouchableOpacity>
);

const ExpandableFAB = ({
	                       onCameraPress,
	                       onFormPress,
	                       style,
	                       testID
                       }: ExpandableFABProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const animation = useRef(new Animated.Value(0)).current;
	const backdropAnimation = useRef(new Animated.Value(0)).current;

	const toggleExpand = () => {
		const toValue = isExpanded ? 0 : 1;

		Animated.parallel([
			Animated.timing(animation, {
				toValue,
				duration: 200,
				easing: Easing.bezier(0.4, 0, 0.2, 1),
				useNativeDriver: true,
			}),
			Animated.timing(backdropAnimation, {
				toValue,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			})
		]).start();

		setIsExpanded(!isExpanded);
	};

	const actionButtonStyle = (index: number) => {
		return {
			transform: [{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -20 * (index + 1)], // 각 버튼의 위치 조정
				}),
			}],
			opacity: animation.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: [0, 0, 1],
			}),
		};
	};

	return (
		<>
			<Animated.View
				style={[
					styles.backdrop,
					{
						opacity: backdropAnimation.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1],
						}),
						// backdrop이 투명할 때는 터치 이벤트를 무시
						pointerEvents: isExpanded ? 'auto' : 'none',
					}
				]}
			>
				<TouchableOpacity
					style={{flex: 1}}
					activeOpacity={1}
					onPress={toggleExpand}
				/>
			</Animated.View>

			<Animated.View style={[styles.container, style]}>
				<Animated.View style={actionButtonStyle(1)}>
					<ActionButton
						icon={<FontAwesome6 name="barcode" size={24} color={Colors.container} />}
						label="사진 촬영"
						onPress={() => {
							toggleExpand();
							onCameraPress();
						}}
					/>
				</Animated.View>

				<Animated.View style={actionButtonStyle(0)}>
					<ActionButton
						icon={<FontAwesome name="pencil-square-o" size={22} color={Colors.container} />}
						label="직접 입력"
						onPress={() => {
							toggleExpand();
							onFormPress();
						}}
					/>
				</Animated.View>

				<TouchableOpacity
					testID={testID}
					style={[styles.mainButton]}
					onPress={toggleExpand}
					activeOpacity={0.8}
				>
					<Animated.View
						style={{
							transform: [{
								rotate: animation.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '45deg'],
								}),
							}],
						}}
					>
						<Feather
							name="plus"
							size={24}
							color={Colors.surface}
						/>
					</Animated.View>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 20,
		bottom: 90,
		alignItems: 'center',
		zIndex: 2,
	},
	mainButton: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		zIndex: 1,
	},
});

export default ExpandableFAB;