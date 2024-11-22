import React, {useEffect, useRef, useState} from 'react';
import {Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Feather} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {format} from 'date-fns';
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import StyledButton from "@/components/shared/Button";
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import useToastStore from "@/state/toast";
import {ButtonSize, ButtonStyle} from "@/types/Button";

// Mock data for food autocomplete
const MOCK_FOODS = [
    "농심 신라면",
    "농심 짜파게티",
    "풀무원 두부",
    "CJ 스팸",
    "오뚜기 컵밥",
    "동원 참치캔",
    "청정원 고추장",
    "비비고 만두",
    "햇반",
    "맛있는 라면"
];

interface AddFoodModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        expiryDate: Date;
        image?: string;
    }) => void;
}

const AddFoodModal = ({visible, onClose, onSubmit}: AddFoodModalProps) => {
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const {addToast} = useToastStore();
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (name.length >= 1) {
            const filtered = MOCK_FOODS.filter(food =>
                food.toLowerCase().includes(name.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setShowSuggestions(false);
        }
    }, [name]);

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            addToast('이미지를 불러오는 중 오류가 발생했습니다.', 'error', 3000);
        }
    };

    const handleSubmit = () => {
        if (!name.trim()) {
            addToast('상품명을 입력해주세요.', 'warn', 3000);
            return;
        }

        onSubmit({
            name: name.trim(),
            expiryDate,
            image: image ?? undefined,
        });

        // Reset form
        setName('');
        setImage(null);
        setExpiryDate(new Date());
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Row style={styles.header}>
                        <StyledText size={TextSize.HeadingSmall} color="content">
                            식품 등록
                        </StyledText>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color={Colors.contentDim}/>
                        </TouchableOpacity>
                    </Row>

                    <ScrollView style={styles.formContainer}>
                        <Column style={styles.imageSection}>
                            <TouchableOpacity
                                style={styles.imagePickerButton}
                                onPress={handleImagePick}
                            >
                                {image ? (
                                    <Image
                                        source={{uri: image}}
                                        style={styles.selectedImage}
                                    />
                                ) : (
                                    <Column style={styles.imagePlaceholder}>
                                        <View style={styles.imageIconContainer}>
                                            <Feather name="camera" size={24} color={Colors.contentDim}/>
                                        </View>
                                        <StyledText size={TextSize.BodySmall} color="contentDim">
                                            이미지 선택
                                        </StyledText>
                                    </Column>
                                )}
                            </TouchableOpacity>
                        </Column>

                        <Column style={styles.inputSection}>
                            <View style={styles.inputContainer}>
                                <StyledText size={TextSize.BodySmall} color="contentDim" style={styles.inputLabel}>
                                    상품명
                                </StyledText>
                                <View style={[
                                    styles.inputWrapper,
                                    isNameFocused && styles.inputWrapperFocused
                                ]}>
                                    <TextInput
                                        ref={inputRef}
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        onFocus={() => setIsNameFocused(true)}
                                        onBlur={() => setIsNameFocused(false)}
                                        placeholder="상품명을 입력하세요"
                                        placeholderTextColor={Colors.contentSecondary}
                                    />
                                    {name.length > 0 && (
                                        <TouchableOpacity
                                            style={styles.clearButton}
                                            onPress={() => setName('')}
                                        >
                                            <Feather name="x-circle" size={16} color={Colors.contentSecondary}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {showSuggestions && (
                                    <View style={styles.suggestionsContainer}>
                                        {suggestions.map((suggestion, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.suggestionItem,
                                                    index === suggestions.length - 1 && styles.lastSuggestionItem
                                                ]}
                                                onPress={() => {
                                                    setName(suggestion);
                                                    setShowSuggestions(false);
                                                    inputRef.current?.blur();
                                                }}
                                            >
                                                <StyledText size={TextSize.BodySmall} color="content">
                                                    {suggestion}
                                                </StyledText>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <StyledText size={TextSize.BodySmall} color="contentDim" style={styles.inputLabel}>
                                    유통기한
                                </StyledText>
                                <TouchableOpacity
                                    style={styles.dateInputWrapper}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <StyledText size={TextSize.BodySmall} color="content">
                                        {format(expiryDate, 'yyyy년 MM월 dd일')}
                                    </StyledText>
                                    <Feather name="calendar" size={16} color={Colors.contentDim}/>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={expiryDate}
                                        mode="date"
                                        onChange={(event, date) => {
                                            setShowDatePicker(false);
                                            if (date) setExpiryDate(date);
                                        }}
                                    />
                                )}
                            </View>
                        </Column>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <StyledButton
                            style={ButtonStyle.Secondary}
                            size={ButtonSize.Medium}
                            onPress={onClose}
                        >
                            취소
                        </StyledButton>
                        <StyledButton
                            style={ButtonStyle.Primary}
                            size={ButtonSize.Medium}
                            onPress={handleSubmit}
                            buttonStyles={{flex: 1}}
                        >
                            등록하기
                        </StyledButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 34,
        height: 500,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerButton: {
        width: 120,
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.containerDark,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    imageIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.containerDarker,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSection: {
        gap: 16,
    },
    inputContainer: {
        gap: 8,
    },
    inputLabel: {
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.containerDarkest,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        paddingHorizontal: 16,
        height: 48,
    },
    inputWrapperFocused: {
        borderColor: Colors.brand,
        borderWidth: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.content,
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
    dateInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.containerDarkest,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        paddingHorizontal: 16,
        height: 48,
    },
    suggestionsContainer: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.containerDarkest,
        borderRadius: 12,
        zIndex: 1000,
        maxHeight: 200,
        marginTop: 4,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.containerDark,
    },
    lastSuggestionItem: {
        borderBottomWidth: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        marginTop: 20,
    },
});

export default AddFoodModal;