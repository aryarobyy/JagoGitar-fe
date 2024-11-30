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
import { postForum } from "../connector/ForumConnector";

const MAX_CHAR = 500;

const CreatePost = () => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const imageRef = useRef(null);
	const user = useRecoilValue(userAtom);
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const { username } = useParams();
	const [inputs, setInputs] = useState({
		userId: user.userId,
		postedBy: "",
		text: "",
		img: "",
	});
	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

	useEffect(() => {
		if (user) {
			setInputs((inputs) => ({
				...inputs,
				userId: user.userId,
				postedBy: user.username,
			}));
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

	const handleCreatePost = async () => {
		const postData = { ...inputs, img: imgUrl };
		console.log("Data send: ", postData);

		try{
			const res = postForum(postData)
			if (res.error) {
				showToast("Error", res.error, "error");
				return;
			}
			if(username === user.username){
				setInputs({ userId: user.userId, postedBy: user.username, text: "", img: "" });
				setImgUrl("");
			}
			onClose()
		} catch (e){
			console.log(e)
			return
		}
	};

	return (
		<>
			<>
				<Button
					position={"fixed"}
					bottom={20}
					right={6}
					bg={useColorModeValue("gray.300", "gray.dark")}
					onClick={onOpen}
					color={"black"}
					w={{ base: 7, sm: 8, md: 9, lg: 12 }}
					h={{ base: 7, sm: 8, md: 9, lg: 12 }}
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
							<Button colorScheme='blue' mr={3} onClick={handleCreatePost} >
								Post
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		</>
	);
};

export default CreatePost;
