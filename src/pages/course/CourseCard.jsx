import { Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { FaStar, FaShare, FaUser, FaRegEye } from "react-icons/fa";
import { useRecoilState } from "recoil";
import sharedCourseAtom from "../../atoms/sharedCourseAtom";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [sharedCourse, setSharedCourse] = useRecoilState(sharedCourseAtom);

  const handleShare = () => {
    setSharedCourse(course);
    alert("Course shared!");
  };

  return (
    <Box 
      maxW={"1440px"}
      _hover={{ backgroundColor: "#FFCD90" }}
      p={4}
      borderRadius="md"
      transition="background-color 0.3s"
    >
      <Flex justify="space-between" align="center" p={4} borderBottom="1px solid #e2e8f0">
        <Image src={course.imgUrl} alt={course.title} boxSize="100px" width="200px" objectFit="cover" borderRadius="md" />
        <Box flex="1" mx={4} ml={12}>
          <Text fontWeight="bold">{course.title}</Text>
          {course.tag && (
            <Text fontSize="sm" color="green.500" fontWeight="bold">
              {course.tag}
            </Text>
          )}
          <Text fontSize="sm">{course.totalHours} • {course.updated}</Text>
          <Flex alignItems="center">
            <Icon as={FaUser} />
            <Text fontWeight="bold" ml={2}>{course.postedBy}</Text>
          </Flex>
          <Flex align="center" mt={3}>
            <Icon as={FaStar} color="yellow.500" />
            <Text ml={1}>{course.rating}</Text>
            <Icon as={FaRegEye} ml={5} />
            <Text ml={1}>{course.students}</Text>
          </Flex>
        </Box>
        <Flex direction="column" align="flex-end">
          <Button size="sm" variant="ghost" colorScheme="gray" onClick={handleShare}>
            <FaShare />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CourseCard;
