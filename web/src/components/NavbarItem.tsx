import * as chakra from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

const NavbarItem = (props: { content: string, linkPath: string }) => {
	let location = useLocation();
	let isActive = location.pathname.startsWith(props.linkPath);
	let btnBackground = isActive == true ? "yellow.500" : "none";

	return (
		<NavLink to={props.linkPath}><chakra.Button
			w="100%"
			borderRadius="0"
			bg={btnBackground}
			color="black"
			_hover={{bg:"yellow.500"}}
			>{props.content}</chakra.Button></NavLink>
	);
}

export default NavbarItem;
