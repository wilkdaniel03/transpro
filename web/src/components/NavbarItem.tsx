import * as chakra from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

const NavbarItem = (props: { content: string, linkPath: string, icon: React.ReactNode }) => {
	let location = useLocation();
	let isActive = location.pathname.startsWith(props.linkPath);
	let btnBackground = isActive == true ? "gray.100" : "none";

	return (
		<NavLink to={props.linkPath}><chakra.Flex w="100%" justifyContent="center" alignItems="center"><chakra.Button
			w="80%"
			borderRadius="12px"
			bg={btnBackground}
			color="black"
			marginTop="5px"
			display="flex"
			justifyContent="start"
			alignItems="center"
			_hover={{bg:"gray.100"}}
			>
				{props.icon}<chakra.Text color="gray.800">{props.content}</chakra.Text>
			</chakra.Button></chakra.Flex></NavLink>
	);
}

export default NavbarItem;
