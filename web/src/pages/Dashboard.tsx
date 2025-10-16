import { useEffect, useState } from 'react';
import * as chakra from '@chakra-ui/react';
import { Heading } from '../components';

interface ITransport {
	id: number;
	name: string;
	type: string;
	reservation: string;
}

enum FetchStatus {
	Pending = 0,
	Success = 1,
	Failed = 2
}

const fetchTransports = async () => {
	const headers = new Headers();
	headers.append("Accept","application/json");
	headers.append("Access-Control-Allow-Origin","*");
	const res = await fetch("http://127.0.0.1:8081/transport",{method:"GET",headers:headers});
	const data  = await res.json();
	return data;
}

const DashboardPage = () => {
	let [status,setStatus] = useState<FetchStatus>(FetchStatus.Pending);
	let [transportData,setTransportData] = useState<ITransport[]>([]);

	useEffect(() => {
		fetchTransports().then((res) => {
			setTransportData(res['data']);
			setStatus(FetchStatus.Success);
		}).catch(_ => {
			setStatus(FetchStatus.Failed);
		});
	},[]);

	const renderRow = (data: ITransport) => {
		if(status == FetchStatus.Success) {
			return (
				<chakra.TableRow key={data.id} _hover={{bg:"gray.100"}}>
					<chakra.TableCell>{data.name}</chakra.TableCell>
					<chakra.TableCell>{data.type}</chakra.TableCell>
					<chakra.TableCell>{data.reservation}</chakra.TableCell>
				</chakra.TableRow>
			);
		}
	}

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
			{status != FetchStatus.Failed ? (
				<chakra.TableRoot size="md">
					<chakra.TableHeader>
						<chakra.TableRow>
							<chakra.TableCell><chakra.Text fontWeight="bold">Nazwa</chakra.Text></chakra.TableCell>
							<chakra.TableCell><chakra.Text fontWeight="bold">Typ</chakra.Text></chakra.TableCell>
							<chakra.TableCell><chakra.Text fontWeight="bold">Rezerwacja</chakra.Text></chakra.TableCell>
						</chakra.TableRow>
					</chakra.TableHeader>
					<chakra.TableBody>
						{transportData.map(obj => {
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
