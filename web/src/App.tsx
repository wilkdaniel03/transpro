import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Heading from './Heading';

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<Heading/>
		</ChakraProvider>
	);
};

export default App;
