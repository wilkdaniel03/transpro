import * as chakra from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

enum CellState {
	disabled = 0,
	up = 1,
	down = 2
}

const TableFieldCell = (props: { children: React.ReactNode }) => {
	const [state,setState] = useState<CellState>(CellState.disabled);
	
	const getIcon = () => {
		if(state == CellState.disabled) {
			return <FaChevronUp visibility="hidden"/>
		} else if(state == CellState.up) {
			return <FaChevronUp/>
		} else {
			return <FaChevronDown/>
		}
	};
	
	return (
		<chakra.TableCell cursor="pointer" userSelect="none" onClick={() => setState((state + 1) % 3)}>
			<chakra.Text fontWeight="bold" display="flex">{props.children}{getIcon()}</chakra.Text>
		</chakra.TableCell>
	);
}

const TableField = (props: { data: string[] }) => {
	return (
		<chakra.TableHeader>
			<chakra.TableRow>
				{props.data.map((el,key) => {
					return (
						<TableFieldCell key={key}>{el}</TableFieldCell>
					);
				})}
			</chakra.TableRow>
		</chakra.TableHeader>
	);
};

export default TableField;
