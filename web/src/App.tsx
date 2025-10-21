import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { ContainerLayout } from './layouts';
import { 
	DashboardPage,
	NotificationsPage,
	ProfilePage,
	HelpPage,
	SettingsPage
} from './pages';
import DataContext from './DataContext';

const router = createBrowserRouter([
	{ path: "/", element: <ContainerLayout/>, children: [
		{ path: "/dashboard", element: <DashboardPage/>, children: [
			{ path: "/dashboard/newreservation" }
		] },
		{ path: "/notifications", element: <NotificationsPage/> },
		{ path: "/profile", element: <ProfilePage/> },
		{ path: "/help", element: <HelpPage/> },
		{ path: "/settings", element: <SettingsPage/> },
		{ path: "/*", element: <Navigate to="/dashboard"/> },
		{ path: "/", element: <Navigate to="/dashboard"/> }
	]},
	{ path: "/*", element: <Navigate to="/"/> }
]);

const App = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<DataContext>
				<RouterProvider router={router}/>
			</DataContext>
		</ChakraProvider>
	);
}

export default App;
