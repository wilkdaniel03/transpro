import * as chakra from '@chakra-ui/react';
import { useState, useEffect, useReducer } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { SortDirection } from '../interfaces';
import { BiSort } from 'react-icons/bi';

enum CellState {
	disabled = 0,
	up = 1,
	down = 2
}

const TableFieldCell = (props: { enable: boolean, name: string, onClick: () => void, sort: (key: any, direction: SortDirection) => void }) => {
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
			let nextState: CellState;

			if(state == CellState.down) {
				setState(CellState.up);
				nextState = CellState.up;
			} else {
				setState((state + 1) % 3);
				nextState = (state + 1) % 3;
			}

			if(nextState == CellState.up) {
				props.sort(props.name,SortDirection.ascending);
			} else if(nextState == CellState.down) {
				props.sort(props.name,SortDirection.descending);
			}

			props.onClick();
		}}>
			<chakra.Text fontWeight="bold" display="flex">{props.name}{getIcon()}</chakra.Text>
		</chakra.TableCell>
	);
}

const reducer = (state: boolean[], index: number) => {
	return state.map((_el,idx) => {
		if(idx == index) return true;
		else return false;
	})
};

const TableField = (props: { data: string[], sort: (key: any, direction: SortDirection) => void }) => {
	const [state,dispatch] = useReducer(reducer,props.data.map(_el => false));

	return (
		<chakra.TableHeader>
			<chakra.TableRow>
				{props.data.map((el,key) => {
					return (
						<TableFieldCell key={key} name={el} enable={state[key]} onClick={() => dispatch(key)} sort={props.sort}/>
					);
				})}
			</chakra.TableRow>
		</chakra.TableHeader>
	);
};

export default TableField;
