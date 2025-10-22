import * as chakra from '@chakra-ui/react';
import { TableField } from '../components';

const TableRow = (props: { data: Object }) => {
	return (
		<chakra.TableRow _hover={{bg:"gray.100"}}>
			{Object.values(props.data).map((el,key) => {
				return <chakra.TableCell key={key}>{el}</chakra.TableCell>;
			})}
		</chakra.TableRow>
	);
}

const Table = (props: { data: Object[] }) => {
	const cellsEnable: boolean[] = Object.keys(props.data[0]).map(_el => true);
	console.log(cellsEnable);

	if(props.data.length > 0) {
		return (
			<chakra.TableRoot size="md">
				<TableField data={Object.keys(props.data[0]).map(el => el)}/>
				<chakra.TableBody>
					{props.data.map((el,key) => {
						return <TableRow key={key} data={el}/>
					})}
				</chakra.TableBody>
			</chakra.TableRoot>
		);
	}

	return <></>;
}

export default Table;
