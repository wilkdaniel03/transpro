import * as chakra from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Navbar } from '../components';

const ContainerLayout = () => {
	return (
		<>
			<chakra.Box zIndex="2" position="fixed" w="25%" h="100%" bg='gray.200' paddingTop="10px"><Navbar/></chakra.Box>
			<chakra.Box padding="20px" marginLeft="auto" w="75%">
				<Outlet/>
			</chakra.Box>
		</>
	);
}

export default ContainerLayout;
