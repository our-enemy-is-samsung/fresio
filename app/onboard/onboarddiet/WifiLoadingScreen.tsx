import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from "lottie-react-native";
import BackIcon from '@/components/onboard/BackIcon';
import { TextSize } from "@/enums/TextSize";

const WifiLoadingScreen = () => {
  const { ssid } = useLocalSearchParams<{ ssid: string }>();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboard/onboarddiet/RegisterFoodScreen');
    }, 10000); // 10초 후 자동 이동

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <BackIcon />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.header}>
            프레시오에서{'\n'}Wi-Fi를 연결중입니다
          </Text>
          <Text style={styles.description}>
            잠시만 기다려주세요
          </Text>
        </View>

        <View style={styles.loadingContainer}>
          <LottieView
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../../assets/lottie/listLoading.json')}
          />
        </View>

        <Text style={styles.ssidText}>
          {ssid}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
    padding: 8,
  },
  content: {
    padding: 22,
    flex: 1,
    marginTop: 48,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    fontSize: TextSize.TitleMedium, // TitleMedium 사용
    fontWeight: '600',
    color: '#141414',
    marginBottom: 15,
    fontFamily: 'Wanted Sans Variable',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: 0.56,
  },
  description: {
    fontSize: TextSize.ContentLarge, // ContentLarge 사용
    fontWeight: '500',
    color: '#707085',
    lineHeight: 22,
    fontFamily: 'Wanted Sans Variable',
    textAlign: 'center',
    letterSpacing: 0.32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  ssidText: {
    color: '#707085',
    textAlign: 'center',
    fontFamily: 'Wanted Sans Variable',
    fontSize: TextSize.HeadingLarge, // HeadingLarge 사용
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.42,
    marginBottom: 40,
  }
});

export default WifiLoadingScreen;
