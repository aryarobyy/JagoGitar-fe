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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getUser } from "../../libs/Methods";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); 

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);

        getUser(inputs)
            .then(data => {
                console.log('User login response:', data);

                if (data.status == 204) {
                    showToast("Error", data.error, "error");
                } else {
                    showToast("Success", "Logged in successfully!", "success");
                    localStorage.setItem("user_id", data.data[0]._id);
					console.log(data.data[0]._id)
                    setUser(data);
                    navigate("/"); // Navigate to the dashboard or welcome page
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                showToast("Error", "Login failed. Please try again later.", "error");
            })
            .finally(() => {
                setLoading(false);
            });
		
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
							<FormLabel>Username</FormLabel>
							<Input
								type="text"
								value={inputs.username}
								onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									value={inputs.password}
									onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
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
								onClick={handleLogin}
								isLoading={loading}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link as={RouterLink} color={"blue.400"} to="/signup">
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
