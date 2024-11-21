import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {Colors} from "@/constants/Color";
import {TextSize} from "@/enums/TextSize";
import {TouchableRipple} from "react-native-paper";
import {Feather} from '@expo/vector-icons';

interface TimerStepPreviewProps {
	titleColor: string;
	hour: number;
	minute: number;
	recife?: string;
	onEdit?: () => void;
	onDelete?: () => void;
	showActions?: boolean;
}

const TimerStepPreview = ({
	                          titleColor,
	                          recife,
	                          hour,
	                          minute,
	                          onEdit,
	                          onDelete,
	                          showActions = true
                          }: TimerStepPreviewProps) => {
	return (
		<TouchableRipple
			style={styles.container}
			rippleColor={Colors['brandDark']}
			android_ripple={{
				radius: 18,
			}}
			borderless
		>
			<Column style={styles.content}>
				<Row style={styles.titleRow}>
					<Text style={{...styles.title, color: titleColor, fontWeight: 600}}>
						타이머 {hour}시간 {minute}분
					</Text>
					{showActions && (
						<Row style={styles.iconContainer}>
							<TouchableOpacity style={styles.iconButton} onPress={onEdit}>
								<Feather name="edit" size={16} color={Colors['contentDim']}/>
							</TouchableOpacity>
							<TouchableOpacity style={styles.iconButton} onPress={onDelete}>
								<Feather name="trash-2" size={18} color={Colors['contentDim']}/>
							</TouchableOpacity>
						</Row>
					)}
				</Row>
				<StyledText size={TextSize.BodySmall} color={'contentDim'}>{recife || '레시피 없음'}</StyledText>
			</Column>
		</TouchableRipple>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: Colors['containerDarkest'],
		padding: 16,
		paddingVertical: 14,
	},
	content: {
		gap: 12,
	},
	titleRow: {
		justifyContent: 'space-between',
		width: '100%',
	},
	title: {
		fontSize: 19,
	},
	iconContainer: {
		gap: 8,
	},
	iconButton: {
		padding: 4,
		borderRadius: 4,
	}
});

export default TimerStepPreview;