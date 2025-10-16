import * as chakra from '@chakra-ui/react';
import Heading from './Heading';
import NavbarItem from './NavbarItem';

const Navbar = () => {
	return (
		<chakra.Flex h="100%" paddingY="5px" flexDirection="column" justifyContent="space-between" alignItems="center">
			<chakra.Box><Heading>Cos tam transport exclusive</Heading></chakra.Box>
			<chakra.Box w="100%">
				<NavbarItem content="Panel Administracyjny" linkPath="/dashboard"/>
				<NavbarItem content="Powiadomienia" linkPath="/notifications"/>
				<NavbarItem content="Profil" linkPath="/profile"/>
			</chakra.Box>
			<chakra.Box h="10%"/>
		</chakra.Flex>
	);
}

export default Navbar;
