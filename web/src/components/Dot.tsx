import * as chakra from '@chakra-ui/react';

const Dot = (props: { colorClass: string }) => {
	return <chakra.Box w="10px" h="10px" borderRadius="50%" bg={props.colorClass}/>
}

export default Dot;
