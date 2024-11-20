import {StyleSheet, Platform} from "react-native";
import {Row} from "@/components/shared/Row";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import {Colors} from "@/constants/Color";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {TouchableRipple} from "react-native-paper";

const SearchBarMock = () => {
    return (
        <TouchableRipple
            style={styles.container}
            onPress={() => {}}
            rippleColor="rgba(0, 0, 0, .1)"
            android_ripple={{
                radius: 300,
            }}
            borderless
        >
            <Row style={styles.content}>
                <MaterialIcons name="search" size={24} color={Colors['contentDim']}/>
                <StyledText size={TextSize.BodySmall} color={'contentDim'}> 레시피를 검색해보세요</StyledText>
            </Row>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors['containerDark'],
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 9999,
        overflow: Platform.select({
            android: 'hidden'
        })
    },
    content: {
        gap: 4,
    }
});

export default SearchBarMock