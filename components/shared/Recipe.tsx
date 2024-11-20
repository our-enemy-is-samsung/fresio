import {ActivityIndicator, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {Image} from 'expo-image';
import {TouchableRipple} from "react-native-paper";
import {MaterialIcons} from '@expo/vector-icons';
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Row} from "@/components/shared/Row";
import {Colors} from "@/constants/Color";
import {Column} from "@/components/shared/Column";

interface RecipeProps {
	name: string;
	imageUrl: string;
	cookTime?: string;
	difficulty?: string;
	isBookmarked?: boolean;
	onPress?: () => void;
	onBookmarkPress?: () => void;
}

const Recipe = ({
	                name,
	                imageUrl,
	                cookTime = "30분",
	                difficulty = "쉬움",
	                onPress,
                }: RecipeProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleImageError = () => {
		setImageError(true);
		setIsLoading(false);
	};

	return (
		<TouchableRipple
			style={styles.container}
			onPress={onPress}
			rippleColor="rgba(0, 0, 0, .1)"
		>
			<Row style={styles.contentWrap}>
				<View>
					<Image
						source={imageError ? '' : imageUrl}
						style={styles.image}
						contentFit="cover"
						transition={200}
						onLoad={handleImageLoad}
						onError={handleImageError}
					/>
					{isLoading && (
						<View style={styles.loadingOverlay}>
							<ActivityIndicator color="#ffffff"/>
						</View>
					)}
				</View>

				<Column>
					<StyledText
						size={TextSize.LabelLarge}
						color={'contentDim'}
					>
						김치
					</StyledText>
					<StyledText
						size={TextSize.ContentSmall}
						color={'content'}
						style={styles.name}
					>
						{name}
					</StyledText>

					<View style={styles.metaContainer}>
						<View style={{
							...styles.metaItem,
							backgroundColor: Colors['errorBackground']
						}}>
							<MaterialIcons name="signal-cellular-alt" size={14} color={Colors['error']}/>
							<StyledText
								size={TextSize.LabelSmall}
								color={'error'}
							>
								{difficulty}
							</StyledText>
						</View>
						<View style={{
							...styles.metaItem,
							backgroundColor: Colors['containerDark']
						}}>
							<MaterialIcons name="access-time" size={14} color={Colors.contentDim}/>
							<StyledText
								size={TextSize.LabelSmall}
								color={'contentDim'}
							>
								{cookTime}
							</StyledText>
						</View>
					</View>
				</Column>
			</Row>
		</TouchableRipple>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,

		borderRadius: 12,
	},
	contentWrap: {
		flex: 1,

		gap: 14,
	},
	image: {
		width: 100,
		height: 80,

		borderRadius: 8,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
	},
	name: {
		width: '100%',
		fontWeight: '600',

		marginTop: 2,
		marginBottom: 8,
	},
	metaContainer: {
		flexDirection: 'row',
		gap: 6,
	},
	metaItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,

		paddingHorizontal: 6,
		paddingVertical: 3,

		borderRadius: 9999,
	},
});

export default Recipe;