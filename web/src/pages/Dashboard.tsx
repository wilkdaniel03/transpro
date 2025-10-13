import * as chakra from '@chakra-ui/react';
import { Heading } from '../components';

interface ITransport {
	name: string;
	type: string;
	date: string;
}

const transportData: ITransport[] = [
	{
		name: "PKS Krakow",
		type: "Autobus",
		date: "2025-10-20"
	},
	{
		name: "LOT",
		type: "Samolot",
		date: "2025-11-03"
	},
	{
		name: "Intercity",
		type: "Pociąg",
		date: "2025-10-22"
	},
	{
		name: "Uber",
		type: "Taksówka",
		date: "2025-10-14"
	},
	{
		name: "FlixBus",
		type: "Autobus",
		date: "2025-10-25"
	}
];

const DashboardPage = () => {
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
							<chakra.TableRow key={i}>
								<chakra.TableCell>{obj.name}</chakra.TableCell>
								<chakra.TableCell>{obj.type}</chakra.TableCell>
								<chakra.TableCell>{obj.date}</chakra.TableCell>
							</chakra.TableRow>
						);
					})}
				</chakra.TableBody>
			</chakra.TableRoot>
		</>
	);
}

export default DashboardPage;
