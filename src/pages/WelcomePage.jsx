import { Box, Button, Flex, Stack, Text, Link, Container, VStack, Heading, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Post from "../assets/image/icon.png";
import { useRecoilValue } from 'recoil';
import AdeS from "../assets/image/adeS.png"
import HarryV from "../assets/image/harryV.png"
import AryaN from "../assets/image/aryaN.png"
import userAtom from '../atoms/userAtom';
import useGetUserProfile from '../hooks/useGetUserProfile'

const WelcomePage = () => {
  const user  = useRecoilValue(userAtom);

    return (
      <>
        {/* // <Container maxW="1440px" w="full"> */}
        <Box  justifyItems={"center"} alignItems={"center"} justifyContent={"center"}>
          {/* <Flex justify="center" align="center">
            <Link as={RouterLink} to="/">
              <Image src={Logo} alt="JagoGitar Logo" />
            </Link>
          </Flex> */}
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                justify="center"
                // mt={10}
                mb={30}
            >
                <Box flex={1} p={4} textAlign={{ base: 'center', md: 'left' }} >
                    <img src={Post} alt="Post" style={{ width: '', height: '70vh' }} />
                </Box>
                <Box flex={1} p={4}>
                    <Text fontSize='2xl' mb={4} textAlign={{ base: 'center', md: 'left' }}>
                        Selamat Datang di JagoGitar
                    </Text>
                    <Text fontSize='5xl' mb={4} as='b' noOfLines={[1, 2, 3]} textAlign={{ base: 'center', md: 'left' }}>
                        Platform Terbaik untuk Belajar Gitar Online!
                    </Text>
                    <Text mb={4} noOfLines={[1, 2, 3]} textAlign={{ base: 'center', md: 'left' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorum fugiat minus numquam! Error non, aut quo sit pariatur hic eligendi id doloribus rem quis possimus quidem nemo dignissimos commodi?
                    </Text>
                    {!user && (
                        <Stack direction="row" spacing={4} justify={{ base: 'center', md: 'flex-start' }}>
                            <Link as={RouterLink} to='/login'>
                                <Button bg={"orange.medium"} color={"white"}>Login</Button>
                            </Link>
                            <Link as={RouterLink} to='/signup'>
                                <Button bg={"transparent"}>Sign up</Button>
                            </Link>
                        </Stack>
                    )}
                    {user && (
                        <Link as={RouterLink} to='/forum'>
                            <Button bg={"orange.medium"} _hover={"transparent"} color={"white"}>Forum</Button>
                        </Link>
                    )}
                </Box>
            </Flex>

          <Flex
          direction={{ base: 'column', md: 'row' }}
          p={4}
          align="center"
          justify="space-between"
          mt={10}
          mb="60px"
        >
          <Box flex={1} p={4} textAlign={{ base: 'center', md: 'left' }} maxW={{ base: '100%', md: '50%' }}>
            <Text fontSize={"2xl"} mb={4} noOfLines={[1, 2, 3]}>
              Belajar dengan kelas terstruktur dan ditemani oleh gitaris-gitaris nasional pro
            </Text>
          </Box>
          
          <Box position="relative" maxW={{ base: '100%', md: '50%' }} width={{ base: '100%', md: '600px' }} height="500px" marginLeft={{ base: 0, md: 20 }} mb="40px">
            <Box position="absolute" top="0" right="250px" zIndex="1">
              <Image src={AdeS} borderRadius="15px" width="240px" alt="Ade Sulistio" />
              <Text position="absolute" top="180px" left="70px" bg="white" padding="2px 5px" borderRadius="3px" marginTop="60px" bgColor="transparent">Ade Sulistio</Text>
            </Box>
            <Box position="absolute" top="100px" right="90px" zIndex="2">
              <Image src={HarryV} borderRadius="15px" width="200px" alt="Harry Veego" />
              <Text position="absolute" top="220px" right="50px" bg="white" padding="2px 5px" borderRadius="3px" marginTop="50px" bgColor="transparent">Harry Veego</Text>
            </Box>
            <Box position="absolute" top="320px" right="240px" zIndex="3">
              <Image src={AryaN} borderRadius="15px" width="240px" alt="Pria Bernada" />
              <Text position="absolute" top="220px" left="70px" bg="white" padding="2px 5px" borderRadius="3px" marginTop="60px" bgColor="transparent">Pria Bernada</Text>
            </Box>
          </Box>
          </Flex>

        </Box>
        <VStack spacing={8} p={8} align="center">
      <Box textAlign="center">
        <Text color="orange.400" fontWeight="bold">Our Services</Text>
        <Heading fontSize="2xl">Apa yang Bisa Kami Lakukan Untuk Mu</Heading>
      </Box>
      <Flex justify="center" wrap="wrap" spacing={8} maxW="1200px">
        <Box 
          bg="gray.50" 
          p={8} 
          borderRadius="md" 
          boxShadow="md" 
          maxW="325px" 
          minH="332px"
          textAlign="center"
          m={4}
        >
          <Heading fontSize="xl" mb={4}>Pelajaran Gitar yang Dipersonalisasi</Heading>
          <Text>
            Kami menawarkan kursus gitar yang disesuaikan dengan kebutuhan dan tujuan Anda
          </Text>
        </Box>
        <Box 
          bg="gray.50" 
          p={8} 
          borderRadius="md" 
          boxShadow="md" 
          maxW="325px" 
          minH="332px"
          textAlign="center"
          m={4}
        >
          <Heading fontSize="xl" mb={4}>Materi Pembelajaran Berkualitas</Heading>
          <Text>
            Anda dapat mengakses berbagai materi pembelajaran berkualitas tinggi, seperti lembaran musik, video tutorial, dan latihan interaktif
          </Text>
        </Box>
        <Box 
          bg="gray.50" 
          p={8} 
          borderRadius="md" 
          boxShadow="md" 
          maxW="325px" 
          minH="332px"
          textAlign="center"
          m={4}
        >
          <Heading fontSize="xl" mb={4}>Dukungan dan Komunitas</Heading>
          <Text>
            Gabung dengan komunitas gitaris kami untuk berbagi pengalaman, saran, inspirasi, dan acara.
          </Text>
        </Box>
      </Flex>
    </VStack>
        {/* // </Container> */}
        </>
    );
}

export default WelcomePage;
