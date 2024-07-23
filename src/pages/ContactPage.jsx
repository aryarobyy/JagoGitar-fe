import React from 'react';
import { Box, Container, Flex, Heading, Text, VStack, Input, Textarea, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Contact Us
      </Heading>
      <Flex direction={["column", "row"]} justify="space-between">
        <VStack align="stretch" spacing={4} w={["full", "45%"]}>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Our Office
            </Heading>
            <Text>
              <Icon as={FaMapMarkerAlt} mr={2} />
              unsikuyyyyyyy
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Phone
            </Heading>
            <Text>
              <Icon as={FaPhone} mr={2} />
              08928927293878372897329873878327832
            </Text>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Email
            </Heading>
            <Text>
              <Icon as={FaEnvelope} mr={2} />
              akuganteg@nigga.com
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch" spacing={4} w={["full", "50%"]} mt={[8, 0]}>
          <Heading as="h2" size="md" mb={4}>
            Get in Touch
          </Heading>
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Textarea placeholder="Your Message" />
          <Button
								loadingText="Logging in"
								size="lg"
								bg={"orange.pale"}
								color={"white"}
								_hover={{
									bg:"orange.medium",
								}}
							>Send Message</Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default ContactUs;
