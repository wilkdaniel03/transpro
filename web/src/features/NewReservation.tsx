import { useState, useEffect } from 'react';
import * as chakra from '@chakra-ui/react';
import { useEmployeeStore, useVehicleStore } from '../stores';

interface ISelectItem {
	id: number;
	value: string;
}

const newSelectItem = (id: number, value: string): ISelectItem => {
	return { id: id, value: value};
};

const Select = (props: { data: ISelectItem[], onChange: (val: number) => void}) => {
	return(
		<chakra.NativeSelectRoot onChange={(e: any) => props.onChange(parseInt(e.target.value))}>
			<chakra.NativeSelectField>
				{props.data.map((el,key) => {
					return <option key={key} value={el.id}>{el.value}</option>;
				})}
			</chakra.NativeSelectField>
			<chakra.NativeSelectIndicator/>
		</chakra.NativeSelectRoot>
	);
};

const NewReservation = () => {
	const [ employee,setEmployee] = useState<number>(0);

	const employees = useEmployeeStore();

	useEffect(() => {
		if(employees.items.length > 0) {
			setEmployee(employees.items[0].id);
		}
	},[employees])

	if(employees.items.length == 0) {
		return <></>;
	}

	return (
		<chakra.Box paddingX="5px">
			<chakra.Heading>Nowa rezerwacja</chakra.Heading>
			<form>
				<Select data={employees.items.map((el) => newSelectItem(el.id,`${el.name} ${el.surname}`))} onChange={(val: number) => setEmployee(val)}/>
				<chakra.Button w="100%" onClick={() => window.alert(employee)}>Click!</chakra.Button>
			</form>
		</chakra.Box>
	);
};

export default NewReservation;
