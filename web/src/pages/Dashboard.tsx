import { useEffect, useState } from 'react';
import * as chakra from '@chakra-ui/react';
import { Heading } from '../components';

interface ITransport {
	id: number;
	name: string;
	type: string;
	reservation: string;
}

const fetchTransports = async () => {
	const headers = new Headers();
	headers.append("Accept","application/json");
	headers.append("Access-Control-Allow-Origin","*");
	const res = await fetch("http://127.0.0.1:8081/transport",{method:"GET",headers:headers});
	const data  = await res.json();
	return data;
};

const DashboardPage = () => {
	let [transportData,setTransportData] = useState<ITransport[]>([]);

	useEffect(() => {
		fetchTransports().then((res) => {
			setTransportData(res['data']);
		});
	},[]);

	console.log(transportData);

	return (
		<>
			<Heading>Panel Administracyjny</Heading>
			<chakra.TableRoot size="md">
				<chakra.TableHeader>
					<chakra.TableRow>
						<chakra.TableCell><chakra.Text fontWeight="bold">Nazwa</chakra.Text></chakra.TableCell>
						<chakra.TableCell><chakra.Text fontWeight="bold">Typ</chakra.Text></chakra.TableCell>
						<chakra.TableCell><chakra.Text fontWeight="bold">Rezerwacja</chakra.Text></chakra.TableCell>
					</chakra.TableRow>
				</chakra.TableHeader>
				<chakra.TableBody>
					{transportData.map((obj,i) => {
						return (
							<chakra.TableRow key={i} _hover={{bg:"gray.100"}}>
								<chakra.TableCell>{obj.name}</chakra.TableCell>
								<chakra.TableCell>{obj.type}</chakra.TableCell>
								<chakra.TableCell>{obj.reservation}</chakra.TableCell>
							</chakra.TableRow>
						);
					})}
				</chakra.TableBody>
			</chakra.TableRoot>
		</>
	);
}

export default DashboardPage;
