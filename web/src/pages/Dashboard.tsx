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
				<Table data={data.transport}/>
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
