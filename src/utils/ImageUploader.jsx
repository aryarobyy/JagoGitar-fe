import {
  Box,
  CloseButton,
  FormControl,
  Image,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

const ImageUploader = ({ onImageUpload, onImageRemove }) => {
  const [imgUrl, setImgUrl] = useState(null); // Holds the uploaded image URL
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      onImageUpload(imgUrl); // Notify parent of the uploaded image URL
    }
  }, [imgUrl, onImageUpload]);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setImgUrl(null);
    if (onImageRemove) {
      onImageRemove(); // Notify parent of image removal
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageChange({ target: { files } }); // Trigger image change
    }
  };

  return (
    <FormControl>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        hidden
      />
      <Box
        border="2px dashed"
        borderColor={dragOver ? "blue.500" : "gray.300"}
        borderRadius="md"
        p={4}
        textAlign="center"
        cursor="pointer"
        position="relative"
        h="300px"
        w="full"
        overflow="hidden"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        bg={useColorModeValue("gray.100", "gray.700")}
        _hover={{
          borderColor: "blue.500",
          bg: useColorModeValue("gray.200", "gray.600"),
        }}
      >
        {imgUrl ? (
          <>
            <Image
              src={imgUrl}
              alt="Uploaded image"
              objectFit="cover"
              w="full"
              h="full"
              position="absolute"
              top="0"
              left="0"
            />
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              bg="gray.500"
              color="white"
              size="sm"
            />
          </>
        ) : (
          <VStack spacing={4} justify="center" h="full">
            <BsFillImageFill size={48} />
            <Text>Drag and drop or click to upload an image</Text>
            <Text fontSize="sm" color="gray.500">
              Supports: PNG, JPG, JPEG, GIF
            </Text>
          </VStack>
        )}
      </Box>
    </FormControl>
  );
};

export default ImageUploader;
