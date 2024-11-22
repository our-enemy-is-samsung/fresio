import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import SearchIcon from '../../../components/onboard/SearchIcon';
import StyledText from "@/components/shared/Text";
import { Colors } from "@/constants/Color";
import { TextSize } from "@/enums/TextSize";

const RegisterFoodScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <StyledText
            size={TextSize.TitleMedium}
            color="content"
            textAlign="center"
            style={styles.header}
          >
            기존 냉장고에 있는{'\n'}음식을 등록해주세요
          </StyledText>
        </View>
        <View style={styles.searchContainer}>
          <SearchIcon style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="예) 사과, 계란, 한닭반킬로"
            placeholderTextColor="#707085"
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image
              source={require('../../../assets/images/onboard/image 10.png')}
              style={styles.foodImage}
            />
            <StyledText
              size={TextSize.BodyLarge}
              color="content"
              style={styles.foodName}
            >
              사과
            </StyledText>
          </View>
          <View style={styles.card}>
            <Image
              source={require('../../../assets/images/onboard/image.png')}
              style={styles.foodImage}
            />
            <StyledText
              size={TextSize.BodyLarge}
              color="content"
              style={styles.foodName}
            >
              대파
            </StyledText>
          </View>
          <View style={styles.card}>
            <Image
              source={require('../../../assets/images/onboard/image 10.png')}
              style={styles.foodImage}
            />
            <StyledText
              size={TextSize.BodyLarge}
              color="content"
              style={styles.foodName}
            >
              사과
            </StyledText>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <View style={styles.textContainer}>
            <StyledText
              size={TextSize.BodySmall}
              color="contentDim"
              textAlign="center"
              style={styles.progressText}
            >
              기기 소프트웨어를 다운로드 중...
            </StyledText>
            <StyledText
              size={TextSize.LabelSmall}
              color="contentDim"
              textAlign="center"
              style={styles.progressPercentage}
            >
              {progress}%
            </StyledText>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={() => router.push('/timer')}>
          <StyledText
            size={TextSize.BodyLarge}
            color="surface"
            style={styles.startButtonText}
          >
            시작하기
          </StyledText>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    marginBottom: 15,
    lineHeight: 32,
    letterSpacing: 0.56,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#E3E3F0',
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#707085',
    fontFamily: 'Wanted Sans Variable',
    fontSize: TextSize.BodySmall,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0.28,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    gap: 24,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  foodName: {
    letterSpacing: 0.34,
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: {
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#FFF3E8',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '150%',
    backgroundColor: '#F4902F',
    borderRadius: 19,
  },
  progressPercentage: {
    marginTop: 8,
  },
  startButton: {
    width: 358,
    height: 59,
    paddingVertical: 14,
    paddingHorizontal: 129,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: Colors.brand,
  },
  startButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default RegisterFoodScreen;
