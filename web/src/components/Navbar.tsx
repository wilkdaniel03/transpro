import * as chakra from '@chakra-ui/react';
import NavbarItem from './NavbarItem';
import Logo from '../../logotype_corrected.webp';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = () => {
	const iconColor = "#3b82f6";

	return (
		<chakra.Flex h="100%" paddingY="5px" flexDirection="column" justifyContent="start" alignItems="center">
			<chakra.Box userSelect="none"><img src={Logo}/><chakra.Separator borderColor="gray.400" shadow="lg" marginLeft="auto" marginRight="auto" w="90%" size="sm"/></chakra.Box>
			<chakra.Box w="100%" marginTop="10px">
				<NavbarItem content="Panel Administracyjny" linkPath="/dashboard" icon={<IoHomeOutline color={iconColor}/>}/>
				<NavbarItem content="Powiadomienia" linkPath="/notifications" icon={<IoIosNotificationsOutline color={iconColor}/>}/>
				<NavbarItem content="Profil" linkPath="/profile" icon={<RxAvatar color={iconColor}/>}/>
				<chakra.Separator borderColor="gray.400" shadow="lg" marginLeft="auto" marginRight="auto" w="90%" size="sm" marginTop="10px" marginBottom="10px"/>
				<NavbarItem content="Pomoc" linkPath="/help" icon={<IoHelpBuoyOutline color={iconColor}/>}/>
				<NavbarItem content="Ustawienia" linkPath="/settings" icon={<IoSettingsOutline color={iconColor}/>}/>
			</chakra.Box>
			<chakra.Box h="10%"/>
		</chakra.Flex>
	);
}

export default Navbar;
