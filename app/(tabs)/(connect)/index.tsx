import {SafeAreaView} from "react-native";
import Text from "@/components/atoms/Text";
import {TextSize} from "@/shared/enums/TextSize";

const PageConnectFirst = () => {
	return (
		<SafeAreaView>
			<Text size={TextSize.HeadingLarge} color={'black'}>First</Text>
		</SafeAreaView>
	)
}

export default PageConnectFirst;