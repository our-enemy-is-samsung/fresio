import NavBar from "@/components/molecules/NavBar";
import Feather from "@expo/vector-icons/Feather";

const NavBarTemplate = () => {
	return (
		<NavBar>
			<NavBar.Item icon={<Feather name="home"/>} title={'홈'} selected={true} onClick={() => console.log('asd')}/>
			<NavBar.Item icon={<Feather name="grid"/>} title={'음식'} selected={false} onClick={() => console.log('asd')}/>
		</NavBar>
	)
}

export default NavBarTemplate;