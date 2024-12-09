import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
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
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";
import { addCourse } from "../../connector/CourseConnector";
import ImageUploader from "../../utils/ImageUploader";

const MAX_CHAR = 500;

const AddCourse = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useRecoilValue(userAtom);
	const showToast = useShowToast();

	const [inputs, setInputs] = useState({
		title: "",
		desc: "",
		vidUrl: "",
		img: "",
		rating: null
	});
	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "desc" && value.length > MAX_CHAR) {
			setInputs((prevInputs) => ({
				...prevInputs,
				desc: value.slice(0, MAX_CHAR),
			}));
			setRemainingChar(0);
		} else {
			setInputs((prevInputs) => ({
				...prevInputs,
				[name]: value,
			}));

			if (name === "desc") {
				setRemainingChar(MAX_CHAR - value.length);
			}
		}
	};

	const handleImageUpload = (imageUrl) => {
		console.log("Image uploaded URL:", imageUrl);
		setInputs((prev) => ({ ...prev, img: imageUrl }));
	};

	const handleImageRemove = () => {
		setInputs((prev) => ({ ...prev, img: "" }));
	};

	const handleCreateCourse = async () => {
		console.log("Submitting course with data:", inputs);
		try {
			const courseData = {
				...inputs,
				userId: user.userId,
				postedBy: user.username,
			};

			const res = await addCourse(courseData);

			if (res.error) {
				showToast("Error", res.error, "error");
				return;
			}

			showToast("Success", "Course added successfully!", "success");

			setInputs({
				title: "",
				desc: "",
				vidUrl: "",
				img: "",
				rating: null
			});
			setRemainingChar(MAX_CHAR);
			window.location.reload()
			onClose();
		} catch (e) {
			console.error("Error adding course:", e);
			showToast("Error", "Failed to add course. Please try again.", "error");
		}
	};

	return (
		<>
			<Button onClick={onOpen}><AddIcon /></Button>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Course</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<FormControl>
								<Input
									placeholder="Course Title"
									name="title"
									value={inputs.title}
									onChange={handleInputChange}
								/>
							</FormControl>

							<FormControl>
								<Textarea
									placeholder="Course Description"
									name="desc"
									value={inputs.desc}
									onChange={handleInputChange}
									h="200px"
								/>
								<Text fontSize="xs" textAlign="right" color="gray.500">
									{remainingChar}/{MAX_CHAR}
								</Text>
							</FormControl>

							<FormControl>
								<Input
									placeholder="Video URL (Optional)"
									name="vidUrl"
									value={inputs.vidUrl}
									onChange={handleInputChange}
								/>
							</FormControl>

							<ImageUploader
								onImageUpload={handleImageUpload}
								onImageRemove={handleImageRemove}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleCreateCourse}>
							Create Course
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddCourse;
