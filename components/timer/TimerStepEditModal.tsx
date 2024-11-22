import {Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import View from "@/components/shared/View";
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {Colors} from "@/constants/Color";
import {TextSize} from "@/enums/TextSize";
import Button from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import {useState} from "react";
import {MaterialIcons} from '@expo/vector-icons';

interface TimerStepEditModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (hours: number, minutes: number, recipe: string) => void;
    initialHours: number;
    initialMinutes: number;
    initialRecipe?: string;
}

const TimerStepEditModal = ({
                                visible,
                                onClose,
                                onSubmit,
                                initialHours,
                                initialMinutes,
                                initialRecipe
                            }: TimerStepEditModalProps) => {
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [recipe, setRecipe] = useState(initialRecipe || '');

    const handleIncrement = (type: 'hours' | 'minutes') => {
        if (type === 'hours') {
            setHours(prev => (prev < 23 ? prev + 1 : prev));
        } else {
            setMinutes(prev => (prev < 59 ? prev + 1 : prev));
        }
    };

    const handleDecrement = (type: 'hours' | 'minutes') => {
        if (type === 'hours') {
            setHours(prev => (prev > 0 ? prev - 1 : prev));
        } else {
            setMinutes(prev => (prev > 0 ? prev - 1 : prev));
        }
    };

    const handleSubmit = () => {
       onSubmit(hours, minutes, recipe);
       onClose();
    };

    return (
       <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={onClose}
       >
          <TouchableWithoutFeedback onPress={onClose}>
             <View style={styles.backdrop}>
                <TouchableWithoutFeedback>
                   <View style={styles.modalContainer}>
                      <Column style={styles.content}>
                         <StyledText size={TextSize.HeadingSmall} color={'content'}>타이머 수정</StyledText>

                         <Row style={styles.timeSection}>
                            <Column style={styles.timeContainer}>
                                <StyledText size={TextSize.BodySmall} color="contentDim">
                                    시간
                                </StyledText>
                                <Row style={styles.timeControl}>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => handleDecrement('hours')}
                                    >
                                        <MaterialIcons name="remove" size={24} color={Colors.contentDim}/>
                                    </TouchableOpacity>
                                    <StyledText size={TextSize.HeadingLarge} color="content">
                                        {hours.toString().padStart(2, '0')}
                                    </StyledText>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => handleIncrement('hours')}
                                    >
                                        <MaterialIcons name="add" size={24} color={Colors.contentDim}/>
                                    </TouchableOpacity>
                                </Row>
                            </Column>

                            <Column style={styles.timeContainer}>
                                <StyledText size={TextSize.BodySmall} color="contentDim">
                                    분
                                </StyledText>
                                <Row style={styles.timeControl}>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => handleDecrement('minutes')}
                                    >
                                        <MaterialIcons name="remove" size={24} color={Colors.contentDim}/>
                                    </TouchableOpacity>
                                    <StyledText size={TextSize.HeadingLarge} color="content">
                                        {minutes.toString().padStart(2, '0')}
                                    </StyledText>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => handleIncrement('minutes')}
                                    >
                                        <MaterialIcons name="add" size={24} color={Colors.contentDim}/>
                                    </TouchableOpacity>
                                </Row>
                            </Column>
                        </Row>

                         <Column style={styles.inputContainer}>
                            <StyledText size={TextSize.BodySmall} color={'content'}>레시피</StyledText>
                            <TextInput
                               style={styles.recipeInput}
                               value={recipe}
                               onChangeText={setRecipe}
                               placeholder="레시피를 입력해주세요"
                               multiline
                            />
                         </Column>

                         <Button
                            style={ButtonStyle.Primary}
                            size={ButtonSize.Large}
                            onPress={handleSubmit}
                            fullWidth
                         >
                            수정하기
                         </Button>
                      </Column>
                   </View>
                </TouchableWithoutFeedback>
             </View>
          </TouchableWithoutFeedback>
       </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
       flex: 1,
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       justifyContent: 'center',
       alignItems: 'center',
       padding: 16,
    },
    modalContainer: {
       width: '100%',
       backgroundColor: Colors.surface,
       borderRadius: 24,
       overflow: 'hidden',
    },
    content: {
       width: '100%',
       gap: 16,
       padding: 22,
    },
    inputContainer: {
       gap: 8,
    },
    timeSection: {
        justifyContent: 'space-between',
        gap: 16,
    },
    timeContainer: {
        flex: 1,
        gap: 8,
        alignItems: 'center',
    },
    timeControl: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.surfaceDim,
        borderRadius: 12,
        padding: 12,
    },
    timeButton: {
        padding: 8,
    },
    recipeInput: {
       width: '100%',
       height: 100,
       backgroundColor: Colors.surfaceDim,
       borderRadius: 12,
       padding: 16,
       textAlignVertical: 'top',
       fontSize: 15,
    },
});

export default TimerStepEditModal;