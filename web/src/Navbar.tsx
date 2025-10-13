import * as chakra from '@chakra-ui/react';
import Heading from './Heading';
import NavbarItem from './NavbarItem';

const Navbar = () => {
	return (
		<>
			<Heading>Cos tam transport exclusive</Heading>
			<NavbarItem content="Panel Administracyjny"/>
			<NavbarItem content="Panel Administracyjny"/>
			<NavbarItem content="Panel Administracyjny"/>
		</>
	);
}

export default Navbar;
