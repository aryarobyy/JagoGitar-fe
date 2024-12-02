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
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { changeUser } from "../connector/UserConnector";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePage() {
    const { user, loading } = useGetUserProfile();
	const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        password: "",
    });
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();
    const { handleImageChange, imgUrl } = usePreviewImg();

	useEffect(() => {
        if (user) {
            setInputs({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                bio: user.bio || "",
                password: "",
            });
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updating) return;
        setUpdating(true);

        try {
            const res = await changeUser(user.userId, inputs);
			console.log("Response: ", res)
            showToast("Success", "Profile updated successfully", "success");
            localStorage.setItem("user_id", res.userId);
            localStorage.setItem("user_data", JSON.stringify(res));
			navigate(`/user/${res.username}`);
        } catch (e) {
            console.error("Error updating profile:", e);
            showToast("Error updating profile", "error");
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
					<FormControl id='userName'>
						<Stack direction={["column", "row"]} spacing={6}>
							<Center>
								<Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
							</Center>
							<Center w='full'>
								<Button w='full' onClick={() => fileRef.current.click()}>
									Change Avatar
								</Button>
								<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
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
