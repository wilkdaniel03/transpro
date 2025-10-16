import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { ContainerLayout } from './layouts';
import { DashboardPage, NotificationsPage, ProfilePage } from './pages';

const router = createBrowserRouter([
	{ path: "/", element: <ContainerLayout/>, children: [
		{ path: "/dashboard", element: <DashboardPage/> },
		{ path: "/notifications", element: <NotificationsPage/> },
		{ path: "/profile", element: <ProfilePage/> },
		{ path: "/*", element: <Navigate to="/dashboard"/> },
		{ path: "/", element: <Navigate to="/dashboard"/> }
	]},
	{ path: "/*", element: <Navigate to="/"/> }
]);

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<RouterProvider router={router}/>
		</ChakraProvider>
	);
}

export default App;
