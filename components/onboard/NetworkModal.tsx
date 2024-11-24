import React from 'react';
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {Colors} from "@/constants/Color";

interface NetworkModalProps {
	visible: boolean;
	onClose: () => void;
	ssid: string;
	onConnect: (password: string) => void;
}

const NetworkModal: React.FC<NetworkModalProps> = ({
	                                                   visible,
	                                                   onClose,
	                                                   ssid,
	                                                   onConnect,
                                                   }) => {
	const [password, setPassword] = React.useState('');

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.modalContainer}
			>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>
						{ssid ? `${ssid} 비밀번호 입력` : 'Hobinjwa-8028 비밀번호 입력'}
					</Text>

					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="비밀번호 입력"
							placeholderTextColor="#A0A0A0"
							secureTextEntry
							value={password}
							onChangeText={setPassword}
							autoFocus
						/>
					</View>

					<TouchableOpacity
						style={styles.connectButton}
						onPress={() => {
							onConnect(password);
							setPassword('');
						}}
					>
						<Text style={styles.connectButtonText}>연결하기</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 20,
	},
	modalContent: {
		width: '100%',
		maxWidth: 400,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 24,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#141414',
		marginBottom: 24,
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		marginBottom: 24,
	},
	input: {
		width: '100%',
		height: 50,
		borderWidth: 1,
		borderColor: '#E5E5E5',
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#141414',
		backgroundColor: '#F8F8F8',
	},
	connectButton: {
		width: '100%',
		height: 56,
		backgroundColor: Colors.brand,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	connectButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default NetworkModal;