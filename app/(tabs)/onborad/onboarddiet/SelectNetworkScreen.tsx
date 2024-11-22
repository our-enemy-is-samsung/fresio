import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  Text as RNText,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import BackIcon from "../onboardComponents/BackIcon";
import RefreshIcon from "../onboardComponents/RefreshIcon";
import ListLoading from "@/assets/lottie/listLoading.json";
import NetworkModal from "../onboardComponents/NetworkModal";  // 모달 컴포넌트 임포트
import { Colors } from "@/constants/Color";

interface WiFiNetwork {
  ssid: string;
  strength: number;
}

const SelectNetworkScreen = () => {
  const [wifiList, setWifiList] = useState<WiFiNetwork[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [selectedSSID, setSelectedSSID] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  const refreshNetworks = () => {
    setIsScanning(true);
    setWifiList([]);
    setTimeout(() => {
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
  };

  useEffect(() => {
    refreshNetworks();
  }, []);

  const handleNetworkSelect = (ssid: string) => {
    setSelectedSSID(ssid);
    setIsModalVisible(true);
  };

  const handleConnect = () => {
    // Implement your connection logic here
    console.log(`Connecting to ${selectedSSID} with password: ${password}`);
    setIsModalVisible(false);
    setPassword("");
    // You might want to navigate to the next screen or show a success message
  };

  const WiFiItem = ({
    ssid,
    strength,
    index,
    selected,
    onSelect,
  }: {
    ssid: string;
    strength: number;
    index: number;
    selected: boolean;
    onSelect: () => void;
  }) => {
    const itemOpacity = useSharedValue(0);
    const itemTranslateY = useSharedValue(20);

    useEffect(() => {
      itemOpacity.value = withDelay(
        index * 100,
        withTiming(1, { duration: 300 })
      );
      itemTranslateY.value = withDelay(
        index * 100,
        withSpring(0, { damping: 20, stiffness: 90 })
      );
    }, []);

    const itemAnimatedStyle = useAnimatedStyle(() => ({
      opacity: itemOpacity.value,
      transform: [{ translateY: itemTranslateY.value }],
    }));

    return (
      <Animated.View style={itemAnimatedStyle}>
        <TouchableOpacity
          onPress={onSelect}
          style={[
            styles.wifiItem,
            { backgroundColor: selected ? Colors.brand : "white" },
          ]}
        >
          <View style={styles.wifiItemContent}>
            <MaterialIcons
              name="wifi"
              size={24}
              color={selected ? "white" : Colors.contentDim}
            />
            <RNText
              style={[
                styles.wifiItemText,
                { color: selected ? "white" : Colors.content },
              ]}
            >
              {ssid}
            </RNText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <RNText style={styles.titleText}>
          프레시오의 Wi-Fi를 {"\n"}아래에서 선택해주세요
        </RNText>

        <View style={styles.titleRow}>
          <RNText style={styles.headerText}>Wi-Fi 리스트</RNText>
          <TouchableOpacity
            style={styles.refreshContainer}
            onPress={refreshNetworks}
          >
            <RefreshIcon size={16} color="#707085" />
            <RNText style={styles.refreshText}>새로고침</RNText>
          </TouchableOpacity>
        </View>

        {isScanning ? (
          <LottieView
            autoPlay
            style={styles.loadingAnimation}
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
                key={wifi.ssid}
                ssid={wifi.ssid}
                strength={wifi.strength}
                index={index}
                selected={selectedSSID === wifi.ssid}
                onSelect={() => handleNetworkSelect(wifi.ssid)}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <NetworkModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        ssid={selectedSSID}
        password={password}
        onPasswordChange={setPassword}
        onConnect={handleConnect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#141414",
    textAlign: "center",
    lineHeight: 32,
    marginVertical: 50,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 23,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#707085",
  },
  refreshContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#707085",
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
    gap: 12,
  },
  loadingAnimation: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    transform: [{ scale: 1.1 }],
  },
  wifiItem: {
    width: "100%",
    padding: 20,
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
  wifiItemText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    textAlign: "left",
  },
});

export default SelectNetworkScreen;