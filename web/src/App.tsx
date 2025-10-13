import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<h1>Hello!</h1>
		</ChakraProvider>
	);
};

export default App;
