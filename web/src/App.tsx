import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import * as chakra from '@chakra-ui/react';
import Heading from './Heading';
import Navbar from './Navbar';

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<chakra.Grid
				w="100vw"
				h="100vh"
				templateRows="1fr"
				templateColumns="25% 75%"
			>
				<chakra.GridItem bg='gray'><Navbar/></chakra.GridItem>
				<chakra.GridItem><Heading>Panel Administracyjny</Heading></chakra.GridItem>
			</chakra.Grid>
		</ChakraProvider>
	);
};

export default App;
