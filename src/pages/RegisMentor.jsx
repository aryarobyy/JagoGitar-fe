import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { loginUser, regisMentor, registerUser } from "../connector/UserConnector";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function RegisMentor() {
    const user = useRecoilValue(userAtom)
    const showToast = useShowToast()
    const [inputs, setInputs] = useState({
        portoUrl: "",
        reason: ""
    }) 
    const navigate = useNavigate()
    const handleRegis = async () => {
		if (!inputs.portoUrl || !/^https?:\/\/.+\..+$/.test(inputs.portoUrl)) {
			showToast("Error", "Please provide a valid portfolio URL", "error");
			return;
		}
		if (!inputs.reason || inputs.reason.length < 10) {
			showToast("Error", "Reason must be at least 10 characters long", "error");
			return;
		}
	
		const userId = user.userId;
		try {
			const res = await regisMentor({ userId, portoUrl: inputs.portoUrl, reason: inputs.reason });
			console.log("Sended data for mentor", res);
			navigate('/course/list');
		} catch (e) {
			console.error(e);
			showToast("Error", "Something went wrong, please try again", "error");
		}
	};
	

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					p={8}
					w={{
						base: "full",
						sm: "400px",
					}}
				>
					<Stack spacing={4}>
						<FormControl isRequired>
							<FormLabel>Link Portofolio</FormLabel>
							<Input
								type="text"
								value={inputs.portoUrl}
								onChange={(e) => setInputs((inputs) => ({ ...inputs, portoUrl: e.target.value }))}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Alasan ingin menjadi mentor</FormLabel>
							<Input
								type="text"
								value={inputs.reason}
								onChange={(e) => setInputs((inputs) => ({ ...inputs, reason: e.target.value }))}
							/>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Logging in"
								size="lg"
								bg={useColorModeValue("#E87B3DB2")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("orange.medium"),
								}}
								onClick={handleRegis}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

export default RegisMentor