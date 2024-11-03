import {ActivityIndicator, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import StyledText from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";
import {Image} from 'expo-image';
import {TouchableRipple} from "react-native-paper";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

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
            <View>
                <View style={styles.imageContainer}>
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
                            <ActivityIndicator color="#ffffff" />
                        </View>
                    )}
                </View>

                <View style={styles.infoContainer}>
                    <StyledText
                        size={TextSize.BodySmall}
                        color={'grayScale100'}
                        style={styles.name}
                    >
                        {name}
                    </StyledText>

                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <MaterialIcons name="access-time" size={16} color="#666666" />
                            <StyledText
                                size={TextSize.LabelLarge}
                                color={'grayScale80'}
                            >
                                {cookTime}
                            </StyledText>
                        </View>

                        <View style={styles.metaItem}>
                            <MaterialIcons name="signal-cellular-alt" size={16} color="#666666" />
                            <StyledText
                                size={TextSize.LabelLarge}
                                color={'grayScale80'}
                            >
                                {difficulty}
                            </StyledText>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,

        marginRight: 12,

        borderRadius: 12,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 150,
        height: 150,

        borderRadius: 12,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    infoContainer: {
        paddingTop: 12,
        gap: 8,
    },
    name: {
        fontWeight: '600',
    },
    metaContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});

export default Recipe;