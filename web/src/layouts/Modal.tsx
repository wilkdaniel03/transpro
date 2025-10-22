import * as chakra from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NewReservation } from '../features';
import { IoMdExit } from "react-icons/io";

const Backdrop = (props: { isOpen: boolean, onClick: (arg: boolean) => void}) => {
	let hiddenClass = props.isOpen ? "visible" : "hidden";

	return (
		<chakra.Box w="100vw" h="100vh" position="fixed" zIndex="3" visibility={hiddenClass} display="flex" justifyContent="center" alignItems="center" backdropFilter="initial" backdropBlur="20px" bg="blackAlpha.600" onClick={() => props.onClick(false)}/>
	);
}

const ModalLayout = () => {
	const [isOpen,setIsOpen] = useState<boolean>(false);
	const [element,setElement] = useState<React.ReactNode>(<></>);
	let location = useLocation();
	let navigate = useNavigate();

	let hiddenClass = isOpen ? "visible" : "hidden";

	const close = (arg: boolean) => {
		navigate("/dashboard");
		setIsOpen(arg);
	}

	useEffect(() => {
		if(location.pathname == "/dashboard/newreservation") {
			setIsOpen(true);
			setElement(<NewReservation/>);
		}
	},[location]);

	return (
		<>
			<Backdrop isOpen={isOpen} onClick={close}/>
				<chakra.Box position="fixed" zIndex="4" top="50%" left="50%" translate="-50% -50%" visibility={hiddenClass} bg="gray.100" borderWidth="1px" borderColor="gray.200" borderRadius="10px" shadow="md" w="40%" h="60%">
					<chakra.Flex justifyContent="end" alignItems="center" paddingTop="10px" paddingRight="5px"><IoMdExit onClick={() => close(false)} size="28px" cursor="pointer"/></chakra.Flex>{element}
				</chakra.Box>
		</>
	);
};

export default ModalLayout;
