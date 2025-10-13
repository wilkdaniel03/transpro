import * as chakra from '@chakra-ui/react';

const NavbarItem = (props: { content: string }) => {
	return (
		<chakra.Button
			w="100%"
			borderRadius="0"
			bg="none"
			color="black"
			_hover={{bg:"yellow.500"}}>{props.content}</chakra.Button>
	);
}

export default NavbarItem;
