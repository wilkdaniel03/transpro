import * as chakra from '@chakra-ui/react';

const Heading = (props: {children: React.ReactNode}) => {
	return (
		<chakra.Heading>{props.children}</chakra.Heading>
	);
}

export default Heading;
