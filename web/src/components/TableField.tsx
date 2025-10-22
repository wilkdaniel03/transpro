import * as chakra from '@chakra-ui/react';
import { useState, useEffect, useReducer } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

enum CellState {
	disabled = 0,
	up = 1,
	down = 2
}

const TableFieldCell = (props: { children: React.ReactNode, enable: boolean, onClick: () => void }) => {
	const [state,setState] = useState<CellState>(CellState.disabled);

	useEffect(() => {
		if(!props.enable) setState(CellState.disabled);
	},[props.enable]);
	
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
		<chakra.TableCell cursor="pointer" userSelect="none" onClick={() => {
			if(state == CellState.down) {
				setState(CellState.up);
			} else {
				setState((state + 1) % 3);
			}
			props.onClick();
		}}>
			<chakra.Text fontWeight="bold" display="flex">{props.children}<chakra.Box marginLeft="5px">{getIcon()}</chakra.Box></chakra.Text>
		</chakra.TableCell>
	);
}

const reducer = (state: boolean[], index: number) => {
	return state.map((_el,idx) => {
		if(idx == index) return true;
		else return false;
	})
};

const TableField = (props: { data: string[] }) => {
	const [state,dispatch] = useReducer(reducer,props.data.map(_el => false));

	return (
		<chakra.TableHeader>
			<chakra.TableRow>
				{props.data.map((el,key) => {
					return (
						<TableFieldCell key={key} enable={state[key]} onClick={() => dispatch(key)}>{el}</TableFieldCell>
					);
				})}
			</chakra.TableRow>
		</chakra.TableHeader>
	);
};

export default TableField;
