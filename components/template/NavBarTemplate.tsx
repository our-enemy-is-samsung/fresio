
import Feather from "@expo/vector-icons/Feather";
import {useNavigation} from "expo-router";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";
import NavBar from "@/components/shared/NavBar";

const NavBarTemplate = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<NavBar>
			<NavBar.Item icon={<Feather name="home"/>} title={'홈'} selected={true} onClick={() => navigation.navigate('index')}/>
			<NavBar.Item icon={<Feather name="grid"/>} title={'냉장고 음식'} selected={false} onClick={() => navigation.navigate('food/index')}/>
		</NavBar>
	)
}

export default NavBarTemplate;