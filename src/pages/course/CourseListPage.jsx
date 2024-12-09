import { Button, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { getAllCourse } from "../../connector/CourseConnector";
import AddCourse from "./AddCourse";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";

const CourseListPage = (props) => {
  const [courses, setCourses] = useState([]);
  const user = useRecoilState(userAtom)
  console.log("user in course: ", user[0])

  useEffect(() => {
    const fetchCourse = async ( ) => {
      try {
        const data = await getAllCourse();
        if (!data) {
          setCourses([])
        } else {
          setCourses(data)
        }
      } catch (e){
        console.log("Error fetching course",e)
      }
    }
    fetchCourse()
  }, [setCourses])

    return (
      <VStack align="stretch" spacing={4} w="full">
        {courses.length === 0 ? (
        <h1>No Courses Available</h1>  
        ) : (
          courses.map((course) => (
        <Link key={course.id} to={`/course/${course.courseId}`}>
            <CourseCard course={course} />
        </Link>
          )) 
        )} 
        {(user[0]?.role === 'mentor' || user[0]?.role === 'admin') && (
          <Button
            position={"fixed"}
            bottom={20}
            right={6}
            bg={useColorModeValue("gray.300", "gray.dark")}
            color={"black"}
            w={{ base: 7, sm: 8, md: 9, lg: 12 }}
            h={{ base: 7, sm: 8, md: 9, lg: 12 }}
          >
            <AddCourse />
          </Button>
        )}
        
      </VStack>
    );
};


export default CourseListPage;
