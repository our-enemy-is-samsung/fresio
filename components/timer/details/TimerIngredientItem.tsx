import {StyleSheet, TouchableOpacity} from 'react-native';
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {Colors} from "@/constants/Color";
import {TextSize} from "@/enums/TextSize";
import {TouchableRipple} from "react-native-paper";
import {Feather} from '@expo/vector-icons';
import {calculateRemainingDays} from "@/utils/Food/time";

interface IngredientItemProps {
	ingredientName: string;
	quantity: string;
	expiredAt: string;
	createdAt: string;
	onEdit?: () => void;
	onDelete?: () => void;
	showActions?: boolean;
}

const IngredientItem = ({
	ingredientName,
	                        quantity,
	                        expiredAt,
	                        createdAt,
	                        onEdit,
	                        onDelete,
	                        showActions = true
                        }: IngredientItemProps) => {
	const expiryDate = new Date(expiredAt);
	const createDate = new Date(createdAt);
	const remainingDays = calculateRemainingDays(expiryDate);

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
					<Column style={{gap: 4}}>
						<StyledText
							size={TextSize.BodyLarge}
							color={'content'}
							style={{fontWeight: '600'}}
						>
							{ingredientName} {quantity}개
						</StyledText>
						<StyledText
							size={TextSize.LabelSmall}
							color={'contentDim'}
						>
							{createDate.toLocaleDateString()} 추가
						</StyledText>
					</Column>
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
				<Row style={styles.expireInfo}>
					<StyledText size={TextSize.BodySmall} color={'brandDark'}>
						{remainingDays}
					</StyledText>
					<StyledText size={TextSize.BodySmall} color={'contentDim'}>
						{expiryDate.toLocaleDateString()} 소비기한
					</StyledText>
				</Row>
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
		alignItems: 'flex-start',
	},
	expireInfo: {
		gap: 8,
		alignItems: 'center',
	},
	iconContainer: {
		gap: 8,
	},
	iconButton: {
		padding: 4,
		borderRadius: 4,
	}
});

export default IngredientItem;