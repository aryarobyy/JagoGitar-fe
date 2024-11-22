import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import Gitar from "../../assets/image/gitar.png";

const courses = [
  {
    id: 1,
    title: "#1 - Teori Dasar Tangga Nada Gitar",
    img: `https://img.youtube.com/vi/CyQUqs1vxpo/maxresdefault.jpg`,
    totalHours: "11:31",
    updated: "Diperbarui 5/2024",
    rating: 4.6,
    students: 297254,
    profile: "Musisi Amatiran",
    video: "", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "#2 - CEPAT BISA GITAR ITU BUKAN BELAJAR CHORD/KUNCI GAMPANG!!!",
    img: `https://img.youtube.com/vi/JbuZGT8XKhM/maxresdefault.jpg`,
    totalHours: "10:55",
    updated: "Diperbarui 6/2022",
    rating: 4.8,
    students: 23992,
    profile: "Teoakustik",
    video: "",
  },
  {
    id: 3,
    title: "#3 - BELAJAR SENAM JARI/ PENJARIAN (PART 1)",
    img: `https://img.youtube.com/vi/f1FYMeh1R3g/maxresdefault.jpg`,
    totalHours: "7:36",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/f1FYMeh1R3g?si=s9xotvteRgLfeTrE"
  },
  // Add more courses as needed
  {
    id: 4,
    title: "#4 - BELAJAR SENAM JARI/ PENJARIAN (PART 2)",
    img: `https://img.youtube.com/vi/WKJV4eHtamw/maxresdefault.jpg`,
    totalHours: "7:36",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/WKJV4eHtamw?si=q79IWypvONU1eRG0"
  },
  {
    id: 5,
    title: "#5 - PEMULA WAJIB TAU! Cara Menghafalkan Kunci Gitar Dengan Cepat",
    img: `https://img.youtube.com/vi/xDHj1EN0ASM/maxresdefault.jpg`,
    totalHours: "11:55",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/xDHj1EN0ASM?si=FjMiGz02ctVDodOT"
  },
  {
    id: 6,
    title: "#6 - Tutorial Kunci Balok/ Tegak/ Gantung ( Bentuk Major )",
    img: `https://img.youtube.com/vi/_4Ub9lDk1Pc/maxresdefault.jpg`,
    totalHours: "10:50",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/_4Ub9lDk1Pc?si=ZYdGrz62dyIh5kaJ"
  },
  {
    id: 7,
    title: "#7 - TUTORIAL TEKNIK DASAR BELAJAR MELODI GITAR",
    img: `https://img.youtube.com/vi/8r9NIeVyRzY/maxresdefault.jpg`,
    totalHours: "11:48",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/8r9NIeVyRzY?si=wz2uVx_4YGo_HI50"
  },
  {
    id: 8,
    title: "#8 - CARA CEPAT BISA BERMAIN PETIKAN",
    img: `https://img.youtube.com/vi/sEbfVXxHcmk/maxresdefault.jpg`,
    totalHours: "13:47",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "Ade Sulistio",
    video: "",
    link: "https://youtu.be/sEbfVXxHcmk?si=P-HuMavny8n-39_g"
  },
  {
    id: 9,
    title: "#9 - Family Chords",
    img: `https://img.youtube.com/vi/sBWOkMxyRMU/maxresdefault.jpg`,
    totalHours: "22:12",
    updated: "Diperbarui 3/2021",
    rating: 4.7,
    students: 89358,
    profile: "See N See Guitar",
    video: "",
    link: "https://youtu.be/sBWOkMxyRMU?si=eD9tXP7SkHV7YlBD"
  },
];

const CourseListPage = (props) => {
  return (
    <VStack align="stretch" spacing={4} w="full">
      {courses.map((course) => (
        <Link key={course.id} to={`/course/${course.id}`}>
            <CourseCard course={course} />
        </Link>
      ))}
    </VStack>
  );
};


export default CourseListPage;
