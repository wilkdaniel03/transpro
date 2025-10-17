import { useContext } from 'react';
import * as chakra from '@chakra-ui/react';
import { Heading, Card, Table } from '../components';
import { dataCtx } from '../DataContext';
import { FetchStatus } from '../interfaces';

const DashboardPage = () => {
	const data = useContext(dataCtx);

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
				<chakra.Flex justifyContent="space-between" alignItems="start">
					<chakra.Box w="33%">
						<Card dotColor={data.transport.length > 0 ? "green.500" : "red.500"} title="Ilość transportów" content={data.transport.length}/>
					</chakra.Box>
					<chakra.Button>New reservation</chakra.Button>
				</chakra.Flex>
			{data.status == FetchStatus.Success ? (
				<chakra.TabsRoot defaultValue="reservations">
					<chakra.TabsList>
						<chakra.TabsTrigger value="reservations">Reservations</chakra.TabsTrigger>
						<chakra.TabsTrigger value="employees">Employees</chakra.TabsTrigger>
						<chakra.TabsTrigger value="vehicles">Vehicles</chakra.TabsTrigger>
					</chakra.TabsList>
					<chakra.TabsContent value="reservations">
						<Table data={data.transport}/>
					</chakra.TabsContent>
					<chakra.TabsContent value="employees">
						<Table data={data.employee}/>
					</chakra.TabsContent>
					<chakra.TabsContent value="vehicles">
						<Table data={data.vehicle}/>
					</chakra.TabsContent>
				</chakra.TabsRoot>
			) : (
				<chakra.AlertRoot status="error">
					<chakra.AlertIndicator/>
					<chakra.AlertTitle fontSize="md">Failed to fetch data</chakra.AlertTitle>
				</chakra.AlertRoot>
			)}
		</>
	);
}

export default DashboardPage;
