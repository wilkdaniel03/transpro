import * as chakra from '@chakra-ui/react';

const NavbarItem = (props: { content: string }) => {
	return (
		<chakra.Button
			w="100%"
			borderRadius="0"
			bg="yellow.500"
			color="black">{props.content}</chakra.Button>
	);
}

export default NavbarItem;
