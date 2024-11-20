
import Feather from "@expo/vector-icons/Feather";
import {useNavigation} from "expo-router";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase, useRoute} from "@react-navigation/native";
import NavBar from "@/components/shared/NavBar";

const NavBarTemplate = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	const currentRoute = useRoute().name;

	console.log(currentRoute);

	return (
		<NavBar>
			<NavBar.Item icon={<Feather name="home"/>} title={'홈'} selected={currentRoute === 'index'} onClick={() => navigation.navigate('index')}/>
			<NavBar.Item icon={<Feather name="grid"/>} title={'냉장고 음식'} selected={currentRoute === 'food/index'} onClick={() => navigation.navigate('food/index')}/>
		</NavBar>
	)
}

export default NavBarTemplate;