import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import ListLoading from "@/assets/lottie/listLoading.json";
import {Colors} from "@/constants/Color";
import RefreshIcon from "@/components/onboard/RefreshIcon";
import BackIcon from "@/components/onboard/BackIcon";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";

const SelectNetworkScreen = () => {
  const [wifiList, setWifiList] = useState<Array<{ ssid: string; strength: number }>>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [selectedSSID, setSelectedSSID] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setWifiList([
        { ssid: "HOME_WIFI_5G", strength: 90 },
        { ssid: "MyWiFi", strength: 75 },
        { ssid: "Guest_Network", strength: 60 },
        { ssid: "Office_WiFi", strength: 45 },
        { ssid: "Public_WiFi", strength: 30 },
        { ssid: "Coffee_Shop", strength: 85 },
        { ssid: "Library_WiFi", strength: 70 },
        { ssid: "Airport_Free", strength: 55 },
        { ssid: "Hotel_Guest", strength: 40 },
        { ssid: "Restaurant_5G", strength: 65 },
      ]);
      setIsScanning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWifiSelect = (ssid: string) => {
    setSelectedSSID(ssid);
    setTimeout(() => {
      router.push(`/onboard/onboarddiet/WifiLoadingScreen?ssid=${ssid}`);
    }, 150);
  };

  const WiFiItem = ({ ssid, strength, index, selected, onSelect }: {
    ssid: string;
    strength: number;
    index: number;
    selected: boolean;
    onSelect: () => void;
  }) => {
    const itemOpacity = useSharedValue(0);
    const itemTranslateY = useSharedValue(20);

    useEffect(() => {
      if (itemOpacity.value === 0 && itemTranslateY.value === 20) {
        itemOpacity.value = withDelay(index * 100, withTiming(1, { duration: 300 }));
        itemTranslateY.value = withDelay(index * 100, withSpring(0, { damping: 20, stiffness: 90 }));
      }
    }, []);

    const itemAnimatedStyle = useAnimatedStyle(() => ({
      opacity: itemOpacity.value,
      transform: [{ translateY: itemTranslateY.value }],
    }));

    return (
      <Animated.View style={itemAnimatedStyle}>
        <TouchableOpacity
          onPress={onSelect}
          style={{
            ...styles.wifiItem,
            backgroundColor: selected ? Colors["brand"] : "white",
          }}
        >
          <View style={styles.wifiItemContent}>
            <MaterialIcons
              name="network-wifi"
              size={24}
              color={selected ? "white" : Colors["contentDim"]}
            />
            <StyledText
              size={TextSize.ContentLarge}
              color={selected ? "surface" : "content"}
              style={styles.wifiText}
            >
              {ssid}
            </StyledText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
          <StyledText 
            size={TextSize.TitleMedium} 
            color="content"
            textAlign="center"
          >
            프레시오의 Wi-Fi를{'\n'}아래에서 선택해주세요
          </StyledText>
        </View>

        <View style={styles.titleRow}>
          <StyledText 
            size={TextSize.ContentLarge} 
            color="contentDim"
          >
            Wi-Fi 리스트
          </StyledText>
          <TouchableOpacity
            style={styles.refreshContainer}
            onPress={() => setIsScanning(true)}
          >
            <RefreshIcon size={16} color="#707085" />
            <StyledText 
              size={TextSize.ContentLarge} 
              color="contentDim"
              style={styles.refreshText}
            >
              새로고침
            </StyledText>
          </TouchableOpacity>
        </View>

        {isScanning ? (
          <LottieView
            autoPlay
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,
              transform: [{ scale: 1.1 }],
            }}
            speed={0.7}
            source={ListLoading}
          />
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {wifiList.map((wifi, index) => (
              <WiFiItem
                key={index}
                ssid={wifi.ssid}
                strength={wifi.strength}
                index={index}
                selected={selectedSSID === wifi.ssid}
                onSelect={() => handleWifiSelect(wifi.ssid)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 23,
  },
  refreshContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  refreshText: {
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
    gap: 12,
  },
  wifiItem: {
    display: "flex",
    width: "100%",
    padding: 20,
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 13,
    backgroundColor: "#FFF",
    marginBottom: -3,
  },
  wifiItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  wifiText: {
    flex: 1,
    textAlign: "left",
  }
});

export default SelectNetworkScreen;