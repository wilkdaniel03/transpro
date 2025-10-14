import * as chakra from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Navbar } from '../components';

const ContainerLayout = () => {
	return (
		<chakra.Grid
			w="100vw"
			h="100vh"
			templateRows="1fr"
			templateColumns="25% 75%"
		>
			<chakra.GridItem bg='gray.200' paddingTop="10px"><Navbar/></chakra.GridItem>
			<chakra.GridItem padding="20px">
				<Outlet/>
			</chakra.GridItem>
		</chakra.Grid>
	);
}

export default ContainerLayout;
