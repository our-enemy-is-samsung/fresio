import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '@/constants/Color';
import useToastStore from "@/state/toast";
import PageHeader from "@/components/shared/PageHeader";
import { Row } from "@/components/shared/Row";
import { Column } from "@/components/shared/Column";
import StyledText from "@/components/shared/Text";
import View from "@/components/shared/View";
import { TextSize } from "@/enums/TextSize";
import DeviceCamera from '@/assets/images/setting/fresio_cam.png';
import DeviceUnregistered from '@/assets/images/setting/splash.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderDeviceProps {
    image: ImageSourcePropType;
    name: string;
    connected: boolean;
    registered: boolean;
    onPress?: () => void;
}

const HeaderDevice = ({
    image,
    name,
    connected,
    registered,
    onPress
}: HeaderDeviceProps) => {
    return (
        <TouchableOpacity 
            style={[
                styles.deviceContainer,
                !registered && styles.deviceContainerUnregistered
            ]} 
            onPress={onPress}
        >
            <Column style={styles.deviceContent}>
                <Image 
                    source={registered ? image : DeviceUnregistered}
                    style={[
                        styles.deviceImage,
                        !registered && styles.deviceImageUnregistered
                    ]} 
                    resizeMode="contain" 
                />
                <View style={styles.deviceTextContainer}>
                    <StyledText 
                        size={TextSize.BodyLarge}
                        color="contentDim"
                        style={styles.deviceName}
                    >
                        {name}
                    </StyledText>
                    <View style={styles.statusContainer}>
                        <StyledText 
                            size={TextSize.BodySmall}
                            color={registered ? (connected ? 'brand' : 'contentDim') : 'contentDim'}
                            style={styles.statusText}
                        >
                            {registered ? (connected ? '연결됨' : '등록됨') : '등록안됨'}
                        </StyledText>
                        <View 
                            style={[
                                styles.statusDot,
                                { backgroundColor: registered 
                                    ? (connected ? Colors.brand : Colors.contentDim)
                                    : Colors.contentDim 
                                }
                            ]} 
                        />
                    </View>
                </View>
            </Column>
        </TouchableOpacity>
    );
};

const SettingItem = ({ icon, title, description, onClick }: { 
    icon: React.ReactNode, 
    title: string, 
    description: string,
    onClick: () => void 
}) => (
    <TouchableOpacity onPress={onClick}>
        <Row style={styles.settingItem}>
            <Row style={styles.settingIcon}>
                {icon}
                <Column style={{ gap: 4 }}>
                    <StyledText size={TextSize.BodySmall} color="content">{title}</StyledText>
                    <StyledText size={TextSize.LabelSmall} color="contentSecondary">{description}</StyledText>
                </Column>
            </Row>
            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.contentSecondary} />
        </Row>
    </TouchableOpacity>
);

const PageSettings = () => {
    const { addToast } = useToastStore();

    const handleDeviceConnect = (registered: boolean) => {
        if (registered) {
            addToast('디바이스가 연결되었습니다.', 'success');
        } else {
            addToast('먼저 디바이스를 등록해주세요.', 'error');
        }
    };

    const handleSettingClick = (setting: string) => {
        addToast(`${setting} 설정으로 이동합니다.`, 'info');
    };

    const renderSettingIcon = (name: string) => (
        <MaterialCommunityIcons 
            name={name as any} 
            size={24} 
            color={Colors.contentSecondary} 
            style={styles.settingItemIcon}
        />
    );

    return (
        <ScrollView style={styles.container}>
            <PageHeader name={'설정'} style={{ marginTop: 10 }}/>
            
            <View style={styles.section}>
                <StyledText size={TextSize.BodySmall} color="contentDim" style={styles.sectionTitle}>
                    설정
                </StyledText>
                
                <Row style={styles.header}>
                    <HeaderDevice
                        image={DeviceCamera}
                        name={'프레시오 카메라'}
                        connected={true}
                        registered={true}
                        onPress={() => handleDeviceConnect(true)}
                    />
                    <HeaderDevice
                        image={DeviceCamera}
                        name={'프레시오 디바이스'}
                        connected={false}
                        registered={false}
                        onPress={() => handleDeviceConnect(false)}
                    />
                </Row>
            </View>

            <View style={styles.section}>
                <SettingItem
                    icon={renderSettingIcon('devices')}
                    title="프레시오 디바이스 연결"
                    description="블루투스 프레시오 디바이스를 연결합니다"
                    onClick={() => handleSettingClick('프레시오 디바이스 연결')}
                />
            </View>

            <View style={styles.section}>
                <StyledText size={TextSize.BodySmall} color="contentDim" style={styles.sectionTitle}>
                    기본 설정
                </StyledText>
                
                <Column style={styles.settingsList}>
                    <SettingItem
                        icon={renderSettingIcon('food')}
                        title="선호하는 식단"
                        description="선호하는 식단을 변경합니다"
                        onClick={() => handleSettingClick('선호하는 식단')}
                    />
                    <SettingItem
                        icon={renderSettingIcon('account')}
                        title="사용자 나이"
                        description="사용자 나이를 설정합니다"
                        onClick={() => handleSettingClick('사용자 나이')}
                    />
                    <SettingItem
                        icon={renderSettingIcon('logout')}
                        title="로그아웃"
                        description="프레시오 연결 및 앱을 로그아웃합니다"
                        onClick={() => handleSettingClick('로그아웃')}
                    />
                </Column>
            </View>


            <View style={styles.section}>
                <StyledText size={TextSize.BodySmall} color="contentDim" style={styles.sectionTitle}>
                    디바이스 설정
                </StyledText>
                
                <Column style={styles.settingsList}>
                    <SettingItem
                        icon={renderSettingIcon('account-edit')}
                        title="사용자 이름"
                        description="프레시오가 사용자 부르는 이름을 설정합니다"
                        onClick={() => handleSettingClick('사용자 이름')}
                    />
                    <SettingItem
                        icon={renderSettingIcon('volume-high')}
                        title="디바이스 볼륨"
                        description="프레시오 디바이스 볼륨을 조절합니다"
                        onClick={() => handleSettingClick('디바이스 볼륨')}
                    />
                </Column>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
        paddingTop: 10,
    },
    section: {
        paddingHorizontal: 22,
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    header: {
        justifyContent: 'space-between',
        gap: 18,
    },
    deviceContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: Colors.container,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.containerDarker,
    },
    deviceContainerUnregistered: {
        backgroundColor: Colors.containerDark,
        borderWidth: 0,
    },
    deviceContent: {
        width: '100%',
        gap: 12,
    },
    deviceImage: {
        width: 40,
        height: 40,
    },
    deviceImageUnregistered: {
        opacity: 0.5,
        tintColor: Colors.contentSecondary,
    },
    deviceTextContainer: {
        gap: 4,
    },
    deviceName: {
        fontFamily: "Wanted Sans Variable",
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.34,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusText: {
        fontFamily: "Wanted Sans Variable",
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 19,
        letterSpacing: 0.28,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 2,
    },
    settingsList: {
        gap: 8,
    },
    settingItem: {
        padding: 16,
        borderRadius: 12,
        justifyContent: 'space-between',
    },
    settingIcon: {
        gap: 12,
        alignItems: 'center',
    },
    settingItemIcon: {
        width: 24,
        height: 24,
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
        backgroundColor: Colors.contentSecondary,
        borderRadius: 12,
    }
});

export default PageSettings;