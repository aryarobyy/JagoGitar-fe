import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";
import { createPost } from "../libs/Methods";
import { getUser } from "../libs/Methods";

const MAX_CHAR = 500;

const CreatePost = () => {
	const [users, setUsers] = useState(null);

	if(localStorage.getItem("user_id")){
		getUser({ "_id": localStorage.getItem("user_id") })
		.then(data => {
			setUsers(data.data[0])
		})
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const imageRef = useRef(null);
	const user = useRecoilValue(userAtom);
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useRecoilState(postsAtom);
	const { username } = useParams();
	const [inputs, setInputs] = useState({
		user_id: "",
		postedBy: "",
		text: "",
		img: "null",
	});

	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

	useEffect(() => {
		if (user && user.data && user.data[0]) {
			setInputs({
				user_id: user.data[0]._id,
				postedBy: user.data[0].username,
				text: "",
				img: "null",
			});
		}
	}, [user]);

	const handleTextChange = (e) => {
		const inputText = e.target.value;
		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setInputs((inputs) => ({ ...inputs, text: truncatedText }));
			setRemainingChar(0);
		} else {
			setInputs((inputs) => ({ ...inputs, text: inputText }));
			setRemainingChar(MAX_CHAR - inputText.length);
		}
	};

	const handleCreatePost = () => {
		setLoading(true);
		const postData = { ...inputs, img: imgUrl };
		console.log("Data yang dikirim", postData);

		createPost(postData)
			.then((data) => {
				if (data && data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				showToast("Success", "Post created successfully", "success");
				if (username === user.data[0].username) {
					setPosts([data, ...posts]);
				}
				onClose();
				setInputs({ user_id: user.data[0]._id, text: "", img: "" });
				setImgUrl("");
			})
			.catch((error) => {
				showToast("Error", "Kesalahan membuat posting", "error");
				console.error("Error creating post:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			{users && 
			<>
				<Button
					position={"fixed"}
					bottom={10}
					right={5}
					bg={useColorModeValue("gray.300", "gray.dark")}
					onClick={onOpen}
					size={{ base: "sm", sm: "md" }}
				>
					<AddIcon />
				</Button>

				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />

					<ModalContent>
						<ModalHeader>Create Post</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl>
								<Textarea
									placeholder='Post content goes here..'
									onChange={handleTextChange}
									value={inputs.text}
								/>
								<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
									{remainingChar}/{MAX_CHAR}
								</Text>

								<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

								<BsFillImageFill
									style={{ marginLeft: "5px", cursor: "pointer" }}
									size={16}
									onClick={() => imageRef.current.click()}
								/>
							</FormControl>

							{imgUrl && (
								<Flex mt={5} w={"full"} position={"relative"}>
									<Image src={imgUrl} alt='Selected img' />
									<CloseButton
										onClick={() => {
											setImgUrl("");
											setInputs((inputs) => ({ ...inputs, img: "" }));
										}}
										bg={"gray.800"}
										position={"absolute"}
										top={2}
										right={2}
									/>
								</Flex>
							)}
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
								Post
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
			}
		</>
	);
};

export default CreatePost;
