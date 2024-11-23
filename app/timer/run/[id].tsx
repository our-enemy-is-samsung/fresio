import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Pressable, StatusBar, Dimensions, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyledText from '@/components/shared/Text';
import View from '@/components/shared/View';
import { Column } from '@/components/shared/Column';
import { Row } from '@/components/shared/Row';
import { TextSize } from '@/enums/TextSize';
import { Colors } from '@/constants/Color';
import useTimerStore from '@/state/timer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MOBILE_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 400);
const PROGRESS_BAR_HEIGHT = 6;
const PROGRESS_BAR_GAP = 4;

interface TimerStep {
    id: string;
    order: number;
    hours: number;
    minutes: number;
    recipe: string;
}

interface TimerData {
    id: string;
    name: string;
    emoji: string;
    color: string;
    steps: TimerStep[];
    createdAt: string;
}

const ProgressBar = ({
                         isActive,
                         isPast,
                         duration,
                         isRunning,
                         onComplete,
                         progress: externalProgress
                     }) => {
    const progressAnimation = React.useRef(new Animated.Value(0)).current;
    const [animation, setAnimation] = useState(null);

    useEffect(() => {
        if (isActive && isRunning) {
            const remainingDuration = duration;

            const newAnimation = Animated.timing(progressAnimation, {
                toValue: 1,
                duration: remainingDuration * 1000,
                useNativeDriver: false,
            });

            setAnimation(newAnimation);
            newAnimation.start(({ finished }) => {
                if (finished) {
                    onComplete?.();
                }
            });

            return () => {
                newAnimation.stop();
            };
        }
    }, [isActive, isRunning, duration, onComplete]);

    useEffect(() => {
        if (!isRunning && animation) {
            animation.stop();
        } else if (isRunning && animation) {
            animation.start();
        }
    }, [isRunning, animation]);

    const width = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.progressBarContainer}>
            <View style={[
                styles.progressBarBackground,
                isPast && styles.progressBarCompleted
            ]}>
                {(isActive || isPast) && (
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            isPast ? styles.progressBarCompleted : { width },
                        ]}
                    />
                )}
            </View>
        </View>
    );
};

const TimerRunPage = () => {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getTimerById } = useTimerStore();
    const [timer, setTimer] = useState<TimerData | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [progress, setProgress] = useState(0);

    const goToNextStep = useCallback(() => {
        if (timer && currentStep < timer.steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const nextStepTime = (timer.steps[nextStep].hours * 60 * 60) + (timer.steps[nextStep].minutes * 60);
            setTimeLeft(nextStepTime);
            setProgress(0);
            setIsRunning(true);
        }
    }, [currentStep, timer]);

    const goToPreviousStep = useCallback(() => {
        if (timer && currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            const prevStepTime = (timer.steps[prevStep].hours * 60 * 60) + (timer.steps[prevStep].minutes * 60);
            setTimeLeft(prevStepTime);
            setProgress(0);
            setIsRunning(true);
        }
    }, [currentStep, timer]);

    // 타이머 초기화 및 데이터 로드
    useEffect(() => {
        let mounted = true;

        const loadTimer = async () => {
            if (id) {
                try {
                    const timerData = await getTimerById(id);
                    if (!mounted) return;

                    if (timerData) {
                        const sortedSteps = [...timerData.steps].sort((a, b) => {
                            const orderA = typeof a.order === 'number' ? a.order : 0;
                            const orderB = typeof b.order === 'number' ? b.order : 0;
                            return orderA - orderB;
                        });

                        const updatedTimer = {
                            ...timerData,
                            steps: sortedSteps
                        };

                        const firstStep = sortedSteps[0];
                        if (firstStep) {
                            const initialSeconds = (firstStep.hours * 60 * 60) + (firstStep.minutes * 60);
                            setTimer(updatedTimer);
                            setCurrentStep(0);
                            setTimeLeft(initialSeconds);
                            setProgress(0);
                            setIsRunning(true);
                        }
                    } else {
                        router.replace('/timer');
                    }
                } catch (error) {
                    console.error('Error loading timer:', error);
                    if (mounted) {
                        router.replace('/timer');
                    }
                }
            }
        };

        loadTimer();

        return () => {
            mounted = false;
            setTimer(null);
            setCurrentStep(0);
            setTimeLeft(0);
            setProgress(0);
            setIsRunning(false);
        };
    }, [id]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) return 0;
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0 && timer && currentStep < timer.steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const nextStepTime = (timer.steps[nextStep].hours * 60 * 60) + (timer.steps[nextStep].minutes * 60);
            setTimeLeft(nextStepTime);
            setProgress(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, timeLeft, currentStep, timer]);

    useEffect(() => {
        if (timer && timer.steps[currentStep]) {
            const totalSeconds = (timer.steps[currentStep].hours * 60 * 60) + (timer.steps[currentStep].minutes * 60);
            const progressValue = Math.max(0, Math.min(1, (totalSeconds - timeLeft) / totalSeconds));
            setProgress(progressValue);
        }
    }, [timeLeft, currentStep, timer]);

    const handleStepComplete = useCallback(() => {
        if (timer && currentStep < timer.steps.length - 1) {
            goToNextStep();
        }
    }, [currentStep, timer, goToNextStep]);

    const toggleTimer = useCallback(() => {
        setIsRunning(prev => !prev);
    }, []);

    const formatTime = useCallback((totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, []);

    if (!timer) {
        return (
            <View style={styles.containerWrapper}>
                <View style={styles.mobileFrame}>
                    <View style={styles.loadingContainer}>
                        <StyledText size={TextSize.BodyLarge} color="contentDim">Loading...</StyledText>
                    </View>
                </View>
            </View>
        );
    }

    const currentStepData = timer.steps[currentStep];
    const stepDuration = (currentStepData.hours * 60 * 60) + (currentStepData.minutes * 60);

    return (
        <View style={styles.containerWrapper}>
            <View style={styles.mobileFrame}>
                <View style={styles.storyBarsContainer}>
                    {timer.steps.map((step, index) => (
                        <ProgressBar
                            key={step.id}
                            isActive={index === currentStep}
                            isPast={index < currentStep}
                            duration={stepDuration}
                            isRunning={isRunning}
                            onComplete={handleStepComplete}
                            progress={index === currentStep ? progress : 0}
                        />
                    ))}
                </View>
                <LinearGradient
                    colors={['#E6F9EE', '#E6F9EE']}
                    style={[styles.content, { paddingTop: Math.max(insets.top, 20) }]}
                >
                    <Pressable
                        style={styles.previousStepArea}
                        onPress={goToPreviousStep}
                    />
                    <Pressable
                        style={styles.nextStepArea}
                        onPress={goToNextStep}
                    />
                    <Column style={styles.timerContent}>
                        <StyledText size={TextSize.TitleLarge} color="content" style={styles.titleText}>
                            {currentStepData.recipe}
                        </StyledText>

                        <StyledText size={TextSize.Display} color="content" style={styles.timerText}>
                            {formatTime(timeLeft)}
                        </StyledText>

                        <Pressable
                            style={styles.pauseButton}
                            onPress={toggleTimer}
                        >
                            {isRunning ? (
                                <Row style={styles.buttonContent}>
                                    <MaterialIcons name="pause" size={24} color="#FFFFFF" />
                                    <StyledText size={TextSize.BodyLarge} color="container">타이머 멈추기</StyledText>
                                </Row>
                            ) : (
                                <Row style={styles.buttonContent}>
                                    <MaterialIcons name="play-arrow" size={24} color="#FFFFFF" />
                                    <StyledText size={TextSize.BodyLarge} color="container">타이머 시작하기</StyledText>
                                </Row>
                            )}
                        </Pressable>

                        <View style={styles.recipeCard}>
                            <StyledText size={TextSize.TitleSmall} color="contentDim" style={styles.recipeTitle}>
                                현재 레시피
                            </StyledText>
                            <StyledText size={TextSize.BodyLarge} color="content" style={styles.recipeText}>
                                {currentStepData.recipe}
                            </StyledText>
                        </View>
                    </Column>
                </LinearGradient>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surfaceDim,
    },
    previousStepArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '30%',
        height: '100%',
        zIndex: 1,
    },
    nextStepArea: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '30%',
        height: '100%',
        zIndex: 1,
    },
    mobileFrame: {
        width: MOBILE_WIDTH,
        height: '80%',
        maxHeight: 800,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 8,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderColor: Colors.container,
        backgroundColor: '#E6F9EE',
        overflow: 'hidden',
    },
    storyBarsContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 12,
        gap: PROGRESS_BAR_GAP,
        zIndex: 1,
    },
    progressBarContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: PROGRESS_BAR_HEIGHT,
        borderRadius: PROGRESS_BAR_HEIGHT,
    },
    progressBarBackground: {
        flex: 1,
        borderRadius: PROGRESS_BAR_HEIGHT,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#000000',
        borderRadius: PROGRESS_BAR_HEIGHT,
    },
    progressBarCompleted: {
        width: '100%',
        borderRadius: PROGRESS_BAR_HEIGHT,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        padding: 24,
        position: 'relative',
    },
    timerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        paddingBottom: 60,
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'PretendardBold',
    },
    timerText: {
        fontSize: 96,
        fontWeight: '600',
        letterSpacing: 2,
        lineHeight: 96,
        textAlign: 'center',
        fontFamily: 'PretendardBold',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F9EE',
    },
    pauseButton: {
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 4,
    },
    recipeCard: {
        width: '100%',
        backgroundColor: Colors.container,
        borderRadius: 24,
        padding: 24,
        gap: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    recipeTitle: {
        fontWeight: '600',
        fontFamily: 'PretendardBold',
        fontSize: 20,
    },
    recipeText: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: 'PretendardMedium',
    },
});

export default TimerRunPage;