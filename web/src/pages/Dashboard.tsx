import { useContext } from 'react';
import * as chakra from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Heading, Card, Table } from '../components';
import { dataCtx } from '../DataContext';
import { FetchStatus, type IDataContext } from '../interfaces';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useEmployeeStore, useVehicleStore, useTransportStore } from '../stores';

const Content = (props: { data: IDataContext }) => {
	const employeeStore = useEmployeeStore();
	const vehicleStore = useVehicleStore();
	const transportStore = useTransportStore();

	if(props.data.status == FetchStatus.Success) {
		return (
			<chakra.TabsRoot defaultValue="reservations">
				<chakra.TabsList>
					<chakra.TabsTrigger value="reservations">Rezerwacje</chakra.TabsTrigger>
					<chakra.TabsTrigger value="employees">Pracownicy</chakra.TabsTrigger>
					<chakra.TabsTrigger value="vehicles">Pojazdy</chakra.TabsTrigger>
				</chakra.TabsList>
				<chakra.TabsContent value="reservations">
					<Table data={transportStore.items}/>
				</chakra.TabsContent>
				<chakra.TabsContent value="employees">
					<Table data={employeeStore.items}/>
				</chakra.TabsContent>
				<chakra.TabsContent value="vehicles">
					<Table data={vehicleStore.items}/>
				</chakra.TabsContent>
			</chakra.TabsRoot>
		);
	}

}

const DashboardPage = () => {
	const data = useContext(dataCtx);
	let navigate = useNavigate();
	const employeeStore = useEmployeeStore();
	const vehicleStore = useVehicleStore();
	const transportStore = useTransportStore();

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
				<chakra.Flex paddingY="10px" justifyContent="space-between" alignItems="start">
					<chakra.Flex w="100%" justifyContent="start" alignItems="center">
						<chakra.Box w="25%">
							<Card dotColor={transportStore.count > 0 ? "green.500" : "red.500"} title="Ilość transportów" content={transportStore.count}/>
						</chakra.Box>
						<chakra.Box paddingLeft="10px" w="25%">
							<Card dotColor={employeeStore.count > 0 ? "blue.500" : "red.500"} title="Ilość pracowników" content={employeeStore.count}/>
						</chakra.Box>
						<chakra.Box paddingLeft="10px" w="25%">
							<Card dotColor={vehicleStore.count > 0 ? "orange.500" : "red.500"} title="Ilość pojazdów" content={vehicleStore.count}/>
						</chakra.Box>
					</chakra.Flex>
					<chakra.Button onClick={() => navigate("/dashboard/newreservation")} paddingX="10px"><IoIosAddCircleOutline/><chakra.Text>Nowa rezerwacja</chakra.Text></chakra.Button>
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
