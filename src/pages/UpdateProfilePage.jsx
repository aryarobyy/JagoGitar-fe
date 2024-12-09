import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
	Link,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import { changeUser } from "../connector/UserConnector";

export default function UpdateProfilePage() {
    const { user, loading } = useGetUserProfile();
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        password: "",
        userPP: "",
    });
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

    useEffect(() => {
        if (user) {
            setInputs({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                bio: user.bio || "",
                password: "",
                userPP: user.userPP || "",
            });
            setImgUrl(user.userPP || "");
        }
    }, [user, setImgUrl]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (updating) return;
		setUpdating(true);
	
		try {
			const data = { ...inputs, userPP: imgUrl };
			console.log("Sending Data:", data);
			const res = await changeUser(user.userId, data);
			console.log("Response:", res);
			showToast("Success", "Profile updated successfully", "success");
			localStorage.setItem("user_id", res.userId);
			localStorage.setItem("user_data", JSON.stringify(res));
			navigate(`/user/${res.username}`);
		} catch (e) {
			console.error("Error updating profile:", e);
			showToast("Error", "Failed to update profile", "error");
		} finally {
			setUpdating(false);
		}
	};
	
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex align={"center"} justify={"center"} my={6}>
                <Stack
                    spacing={4}
                    w={"full"}
                    maxW={"md"}
                    bg={useColorModeValue("white", "gray.dark")}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id='userPP'>
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar size='xl' boxShadow={"md"} src={imgUrl || inputs.userPP} />
                            </Center>
                            <Center w='full'>
                                <Button w='full' onClick={() => fileRef.current.click()}>
                                    Change Avatar
                                </Button>
                                <Input
									type="file"
									hidden
									ref={fileRef}
									onChange={(e) => {
										handleImageChange(e);
										console.log("Selected Image URL:", imgUrl);
									}}
								/>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder='John Doe'
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder='johndoe'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder='your-email@example.com'
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='email'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder='Your bio.'
                            value={inputs.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder='password'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            _placeholder={{ color: "gray.500" }}
                            type='password'
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Link as={RouterLink} to={`/user/${user.username}`} w={"full"}>
							<Button
								bg={"red.400"}
								color={"white"}
								w='full'
								_hover={{
									bg: "red.500",
								}}
							>
								Cancel
							</Button>
						</Link>
                        <Button
                            bg={"green.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "green.500",
                            }}
                            type='submit'
                            isLoading={updating}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}
