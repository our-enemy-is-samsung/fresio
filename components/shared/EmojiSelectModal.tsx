// components/timer/EmojiSelectorModal.tsx
import {Modal, Pressable, StyleSheet} from "react-native";
import {Colors} from "@/constants/Color";
import View from "@/components/shared/View";
import EmojiSelector from "react-native-emoji-selector";

interface EmojiSelectorModalProps {
	visible: boolean;
	onClose: () => void;
	onEmojiSelected: (emoji: string) => void;
}

const EmojiSelectorModal = ({visible, onClose, onEmojiSelected}: EmojiSelectorModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<Pressable
				style={styles.backdrop}
				onPress={onClose}
			>
				<View style={styles.emojiSelectorContainer}>
					<EmojiSelector
						onEmojiSelected={(emoji) => {
							onEmojiSelected(emoji);
							onClose();
						}}
						showSearchBar={false}
						showHistory={false}
						showSectionTitles={true}
						columns={8}
					/>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	emojiSelectorContainer: {
		height: 400,
		backgroundColor: Colors.surface,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 16,
		overflow: 'hidden',
	},
});

export default EmojiSelectorModal;