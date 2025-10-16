import * as chakra from '@chakra-ui/react';
import Dot from './Dot';

const Card = (props: { dotColor: string, title: string, content: number }) => {
	return (
		<chakra.CardRoot>
			<chakra.CardBody paddingX="15px" paddingY="10px">
					<chakra.Flex alignItems="center" justifyContent="start">
						<chakra.Box paddingRight="5px"><Dot colorClass={props.dotColor}/></chakra.Box>
						<chakra.CardTitle color="gray.900" fontSize="sm" fontWeight="thin">{ props.title }</chakra.CardTitle>
					</chakra.Flex>
					<chakra.CardDescription color="black" fontSize="lg" fontWeight="semibold">{ props.content }</chakra.CardDescription>
			</chakra.CardBody>
		</chakra.CardRoot>
	);
}

export default Card;
