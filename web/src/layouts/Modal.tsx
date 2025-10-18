import * as chakra from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Backdrop = (props: { onClick: (arg: boolean) => void}) => {
	return (
		<chakra.Box position="fixed" zIndex="3" backdropFilter="initial" backdropBlur="20px" bg="blackAlpha.600" w="100%" h="100%" onClick={() => props.onClick(false)}/>
	);
}

const ModalLayout = () => {
	const [isOpen,setIsOpen] = useState<boolean>(false);
	let location = useLocation();
	let navigate = useNavigate();

	const close = (arg: boolean) => {
		navigate("/dashboard");
		setIsOpen(arg);
	}

	useEffect(() => {
		if(location.pathname == "/dashboard/newreservation") {
			setIsOpen(true);
		}
	},[location]);

	return (
		<>
			{ isOpen ? (
				<>
					<Backdrop onClick={close}/>
					<chakra.Box position="fixed" zIndex="4" bg="gray.100" borderWidth="1px" borderColor="gray.200" borderRadius="10px" shadow="md" top="50%" left="50%" w="40%" h="60%" translate="auto" translateX="-50%" translateY="-50%">
					</chakra.Box>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default ModalLayout;
