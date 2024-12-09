import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import sharedCourseAtom from "../../atoms/sharedCourseAtom";
import userAtom from "../../atoms/userAtom";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { getCourse } from "../../connector/CourseConnector";

const CoursePage = () => {
  const { courseId } = useParams();
  const [user,setUser] = useState(null);
  const [course, setCourse] = useState([])
  const {user: profile} = useGetUserProfile()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourse(courseId);
        setCourse(data); 
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourses()
  }, [courseId])

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setUser({ ...profile, userId });
    }
  }, [profile]);

  if (!course) {
    return <Text>Course not found</Text>;
  }
console.log("Course data: " ,course)
  return (
    <>
    {user ? (
      <VStack spacing={4} align="stretch">
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontSize="4xl" textAlign="center" as={"b"}>{course.title}</Text>
      </Flex>
      <Box position="relative" paddingTop="56.25%" width="100%" bg="black">
        <Box position="absolute" top="0" left="0" width="100%" height="100%">
          <ReactPlayer 
            url={course.vidUrl} 
            width="100%" 
            height="100%"
            controls
            />
        </Box>
      </Box>
      <Box justifyContent={"center"} alignItems={"center"}>
        <Text as={"b"} fontSize={"3xl"} mt={20}>Dasar-Dasar Gitar</Text>
        <Text fontSize={"1xl"}>{course.desc}</Text>
      </Box>
    </VStack>
      ) : <Box position={"fixed"}>
        <VStack >
        <Flex>
          <Text>
            Belum punya akun? 
          </Text>
          <Link as={RouterLink} to="/signup" color={"orange.medium"}>Sign up</Link>
          </Flex>
        </VStack>
      <VStack spacing={4} align="stretch" filter={"blur(40px)"} pointerEvents='none' >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontSize="4xl" textAlign="center" as={"b"}>{course.title}</Text>
      </Flex>
      <Box position="relative" paddingTop="56.25%" width="100%" bg="black">
        <Box position="absolute" top="0" left="0" width="100%" height="100%">
          <ReactPlayer 
            url={course.url} 
            width="100%" 
            height="100%"
            controls
            />
        </Box>
      </Box>
      <Box justifyContent={"center"} alignItems={"center"}>
        <Text as={"b"} fontSize={"3xl"} mt={20}>Dasar-Dasar Gitar</Text>
        <Text fontSize={"1xl"}>{course.desc}</Text>
      </Box>
    </VStack>
    </Box>
    }

    </>
  );
};

export default CoursePage;
