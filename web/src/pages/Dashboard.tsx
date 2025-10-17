import { useContext } from 'react';
import * as chakra from '@chakra-ui/react';
import { Heading, Card, Table } from '../components';
import { dataCtx } from '../DataContext';
import { FetchStatus, type IDataContext } from '../interfaces';

const Content = (props: { data: IDataContext }) => {
	if(props.data.status == FetchStatus.Success) {
		return (
			<chakra.TabsRoot defaultValue="reservations">
				<chakra.TabsList>
					<chakra.TabsTrigger value="reservations">Reservations</chakra.TabsTrigger>
					<chakra.TabsTrigger value="employees">Employees</chakra.TabsTrigger>
					<chakra.TabsTrigger value="vehicles">Vehicles</chakra.TabsTrigger>
				</chakra.TabsList>
				<chakra.TabsContent value="reservations">
					<Table data={props.data.transport}/>
				</chakra.TabsContent>
				<chakra.TabsContent value="employees">
					<Table data={props.data.employee}/>
				</chakra.TabsContent>
				<chakra.TabsContent value="vehicles">
					<Table data={props.data.vehicle}/>
				</chakra.TabsContent>
			</chakra.TabsRoot>
		);
	}

}

const DashboardPage = () => {
	const data = useContext(dataCtx);

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
				<chakra.Flex paddingY="10px" justifyContent="space-between" alignItems="start">
					<chakra.Flex w="100%" justifyContent="start" alignItems="center">
						<chakra.Box w="25%">
							<Card dotColor={data.transport.length > 0 ? "green.500" : "red.500"} title="Ilość transportów" content={data.transport.length}/>
						</chakra.Box>
						<chakra.Box paddingLeft="10px" w="25%">
							<Card dotColor={data.employee.length > 0 ? "blue.500" : "red.500"} title="Ilość pracowników" content={data.transport.length}/>
						</chakra.Box>
						<chakra.Box paddingLeft="10px" w="25%">
							<Card dotColor={data.vehicle.length > 0 ? "orange.500" : "red.500"} title="Ilość pojazdów" content={data.vehicle.length}/>
						</chakra.Box>
					</chakra.Flex>
					<chakra.Button>New reservation</chakra.Button>
				</chakra.Flex>
			{data.status != FetchStatus.Failed ? (
				<Content data={data}/>
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
