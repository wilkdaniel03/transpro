import { useContext } from 'react';
import * as chakra from '@chakra-ui/react';
import { Heading, Card } from '../components';
import { dataCtx } from '../DataContext';
import { FetchStatus, type ITransport} from '../interfaces';

const DashboardPage = () => {
	const data = useContext(dataCtx);

	const renderRow = (data: ITransport) => {
		return (
			<chakra.TableRow key={data.id} _hover={{bg:"gray.100"}}>
				<chakra.TableCell>{data.name}</chakra.TableCell>
				<chakra.TableCell>{data.type}</chakra.TableCell>
				<chakra.TableCell>{data.reservation}</chakra.TableCell>
			</chakra.TableRow>
		);
	}

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
				<chakra.Flex justifyContent="space-between" alignItems="start">
					<chakra.Box w="33%">
						<Card dotColor={data.transport.length > 0 ? "green.500" : "red.500"} title="Ilość transportów" content={data.transport.length}/>
					</chakra.Box>
					<chakra.Button>New reservation</chakra.Button>
				</chakra.Flex>
			{data.status != FetchStatus.Failed ? (
				<chakra.TableRoot size="md">
					<chakra.TableHeader>
						<chakra.TableRow>
							<chakra.TableCell><chakra.Text fontWeight="bold">Nazwa</chakra.Text></chakra.TableCell>
							<chakra.TableCell><chakra.Text fontWeight="bold">Typ</chakra.Text></chakra.TableCell>
							<chakra.TableCell><chakra.Text fontWeight="bold">Rezerwacja</chakra.Text></chakra.TableCell>
						</chakra.TableRow>
					</chakra.TableHeader>
					<chakra.TableBody>
						{data.transport.map(obj => {
							return renderRow(obj);
						})}
					</chakra.TableBody>
				</chakra.TableRoot>
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
