import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import * as chakra from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Navbar } from './components';
import { DashboardPage, NotificationsPage, ProfilePage } from './pages';

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
				<chakra.GridItem padding="20px">
					<BrowserRouter>
						<Routes>
							<Route path="/dashboard" element={<DashboardPage/>}/>
							<Route path="/notifications" element={<NotificationsPage/>}/>
							<Route path="/profile" element={<ProfilePage/>}/>
							<Route path="/*" element={<Navigate to="/dashboard"/>}/>
						</Routes>
					</BrowserRouter>
				</chakra.GridItem>
			</chakra.Grid>
		</ChakraProvider>
	);
};

export default App;
