import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Colors} from '@/constants/Color';
import useToastStore from "@/state/toast";
import BackButtonHeader from "@/components/shared/BackButtonHeader";
import {Column} from "@/components/shared/Column";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import {TextSize} from "@/enums/TextSize";
import StyledButton from "@/components/shared/Button";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ButtonSize, ButtonStyle} from "@/types/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import {router} from "expo-router";

const UsernameSettingsPage = () => {
	const {addToast} = useToastStore();
	const defaultValues = '홍길동'
	const [username, setUsername] = useState(defaultValues);
	const inset = useSafeAreaInsets();

	const handleSave = () => {
		if (!username.trim()) {
			addToast('사용자 이름을 입력해주세요.', 'error');
			return;
		}
		addToast('사용자 이름이 저장되었습니다.', 'success');
		// TODO: 실제 저장 로직 구현
		router.back();
	};

	const handleClear = () => {
		setUsername('');
	};

	return (
		<View style={{
			...styles.container,
			marginTop: inset.top
		}}>
			<BackButtonHeader name="사용자 이름"/>

			<View style={styles.content}>
				<Column style={styles.section}>
					<StyledText
						size={TextSize.BodyLarge}
						color="contentDim"
						style={styles.description}
					>
						프레시오가 사용자를 부를 이름을 설정해주세요.{'\n'}
						언제든지 변경할 수 있습니다.
					</StyledText>

					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={username}
							onChangeText={setUsername}
							placeholder="사용자 이름 입력"
							placeholderTextColor={Colors.contentSecondary}
						/>
						{username.length > 0 && (
							<TouchableOpacity
								onPress={handleClear}
								style={styles.clearButton}
							>
								<MaterialCommunityIcons
									name="close-circle"
									size={20}
									color={Colors.contentSecondary}
								/>
							</TouchableOpacity>
						)}
					</View>

					{username.length > 0 && (
						<View style={styles.nameContainer}>
							<Ionicons name="information-circle-outline" size={20} color={Colors.contentDim} />
							<StyledText
								size={TextSize.BodyLarge}
								color="contentDim"
							>
								프레시오가 "{username}"님이라고 부를게요
							</StyledText>
						</View>
					)}
				</Column>
			</View>

			<View style={styles.footer}>
				<StyledButton
					style={ButtonStyle.Primary}
					size={ButtonSize.Medium}
					fullWidth
					onPress={handleSave}
					disabled={!username.trim()}
				>
					저장하기
				</StyledButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	content: {
		flex: 1,
	},
	section: {
		padding: 22,
		gap: 24,
	},
	description: {
		lineHeight: 20,
	},
	inputContainer: {
		position: 'relative',
		width: '100%',
	},
	input: {
		width: '100%',
		height: 52,
		backgroundColor: Colors.containerDark,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: Colors.content,
		borderWidth: 1,
		borderColor: Colors.containerDarker,
	},
	clearButton: {
		position: 'absolute',
		right: 16,
		top: '50%',
		transform: [{translateY: -10}],
	},
	footer: {
		padding: 22,
		paddingBottom: 34,
		borderTopWidth: 1,
		borderTopColor: Colors.containerDark,
	},
	nameContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 4,

		backgroundColor: Colors.containerDark,

		borderRadius: 8,

		paddingVertical: 12,
		paddingHorizontal: 16,
	}
});

export default UsernameSettingsPage;