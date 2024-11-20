import React, { useRef } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

type OnboardingSwiperProps = {
    slides: {
        content: React.ReactNode;
    }[];
    onIndexChanged: (index: number) => void;
};

const OnboardingSwiper: React.FC<OnboardingSwiperProps> = ({ slides, onIndexChanged }) => {
    return (
        <Swiper
            loop={false}
            showsPagination={false}
            autoplay={false}
            onIndexChanged={onIndexChanged}
            scrollEnabled={true}
            removeClippedSubviews={false}
        >
            {slides.map((slide, index) => (
                <View key={index} style={{ flex: 1 }}>
                    {slide.content}
                </View>
            ))}
        </Swiper>
    );
};

export default OnboardingSwiper;