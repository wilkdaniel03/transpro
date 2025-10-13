import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import * as chakra from '@chakra-ui/react';
import { Navbar } from './components';
import { Dashboard } from './pages';

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<chakra.Grid
				w="100vw"
				h="100vh"
				templateRows="1fr"
				templateColumns="25% 75%"
			>
				<chakra.GridItem bg='gray.200' paddingTop="10px"><Navbar/></chakra.GridItem>
				<chakra.GridItem padding="20px"><Dashboard/></chakra.GridItem>
			</chakra.Grid>
		</ChakraProvider>
	);
};

export default App;
