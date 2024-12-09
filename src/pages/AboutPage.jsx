import { Box, Flex, Image, Text, Heading, Stack, Icon, IconButton } from '@chakra-ui/react';
import { FaInstagram } from "react-icons/fa";
import React from 'react';
import Roby from "../assets/image/roby.png"

const teamMembers = [
    {
        name: "Roby Aryanata",
        role: "Full Stack Developer",
        image: Roby,
        description: "",
        instagram: "https://instagram.com/aryarobyy/"
    },
];

const handleInstagramClick = (url) => {
    window.open(url, "_blank");
};

const AboutPage = () => {
    return (
        <Box p={4}>
            <Heading as="h1" textAlign="center" mb={10}>
                About Us
            </Heading>
            <Text textAlign={"center"}>
                Web yang belum 100% rampung karena masih banyak bug
            </Text>
            <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center">
                {teamMembers.map((member, index) => (
                    <Box
                        key={index}
                        flex={1}
                        p={4}
                        m={4}
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        textAlign="center"
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            borderRadius="full"
                            boxSize="150px"
                            mx="auto"
                        />
                        <Heading as="h3" size="lg" mt={4}>
                            {member.name}
                        </Heading>
                        <Text fontSize="xl" color="gray.500">
                            {member.role}
                        </Text>
                        <Text mt={4}>
                            {member.description}
                        </Text>
                        <Icon 
                        as={FaInstagram}
                        cursor={"pointer"}
                        m={5}
                        w={6}
                        h={6} 
                        onClick={() => handleInstagramClick(member.instagram)}/>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default AboutPage;
