import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import sharedCourseAtom from "../../atoms/sharedCourseAtom";
import userAtom from "../../atoms/userAtom";
import { getUser } from "../../libs/Methods";
const courses = [
  {
    id: 1,
    title: "Teori Dasar Tangga Nada Gitar",
    url: "https://youtu.be/CyQUqs1vxpo?si=mSW5yfqn0hUdrmNT",
    description: "Tangga nada adalah urutan nada yang disusun berdasarkan interval tertentu dan berfungsi sebagai dasar dalam pembentukan melodi dan harmoni. Dalam konteks gitar, memahami teori dasar tangga nada sangat penting untuk meningkatkan kemampuan bermain dan improvisasi.",
  },
  {
    id: 2,
    title: "CEPAT BISA GITAR ITU BUKAN BELAJAR CHORD/KUNCI GAMPANG!!!",
    url: "https://youtu.be/JbuZGT8XKhM?si=I7_DgrZQ-P09lSPu",
    description: "Penguatan tangan kiri dalam bermain gitar sangat penting untuk meningkatkan kecepatan, kekuatan, ketepatan, dan fleksibilitas jari. Tangan kiri bertanggung jawab untuk menekan senar di fretboard, dan penguatan tangan kiri dapat membantu gitaris memainkan not dengan jelas dan cepat. ",
  },
  {
    id: 3,
    title: "BELAJAR SENAM JARI/ PENJARIAN (PART 1)",
    url: "https://youtu.be/f1FYMeh1R3g?si=s9xotvteRgLfeTrE",
    description: "Senam jari untuk bermain gitar adalah serangkaian latihan yang bertujuan untuk meningkatkan kelincahan, kekuatan, fleksibilitas, dan koordinasi jari-jari yang digunakan dalam bermain gitar. Latihan-latihan ini sangat penting bagi gitaris, baik pemula maupun profesional, untuk memastikan jari-jari mereka siap untuk bermain dengan teknik yang benar dan mencegah cedera.",
  },
  {
    id: 4,
    title: "BELAJAR SENAM JARI/ PENJARIAN (PART 2)",
    url: "https://youtu.be/WKJV4eHtamw?si=q79IWypvONU1eRG0",
    description: "Senam jari untuk bermain gitar adalah serangkaian latihan yang bertujuan untuk meningkatkan kelincahan, kekuatan, fleksibilitas, dan koordinasi jari-jari yang digunakan dalam bermain gitar. Latihan-latihan ini sangat penting bagi gitaris, baik pemula maupun profesional, untuk memastikan jari-jari mereka siap untuk bermain dengan teknik yang benar dan mencegah cedera.",
  },
  {
    id: 5,
    title: "Menghafalkan Kunci Gitar Dengan Cepat",
    url: "https://youtu.be/xDHj1EN0ASM?si=FjMiGz02ctVDodOT",
    description: "Bass pada gitar adalah instrumen yang memainkan peran penting dalam membentuk ritme dan harmoni dalam sebuah band atau ansambel musik. Secara umum, bass gitar memiliki senar yang lebih tebal dan panjang leher yang lebih panjang dibandingkan dengan gitar biasa. Hal ini memberikan bass gitar nada yang lebih rendah dan dalam.Ada beberapa teknik dasar dalam bermain bass, termasuk teknik memetik (fingerstyle), slap, dan pop. Teknik memetik menggunakan jari untuk memetik senar secara individual, sementara teknik slap melibatkan pemukulan senar dengan ibu jari dan menarik senar dengan jari-jari lain untuk menciptakan suara yang perkusif. Teknik pop biasanya digunakan bersamaan dengan slap untuk menambahkan variasi dalam permainan.",
  },
  {
    id: 6,
    title: "Tutorial Kunci Balok/ Tegak/ Gantung ( Bentuk Major )",
    url: "https://youtu.be/_4Ub9lDk1Pc?si=ZYdGrz62dyIh5kaJ",
    description: "Kunci balok atau kunci gantung (barre chords) adalah salah satu teknik fundamental dalam bermain gitar yang memungkinkan pemain untuk memainkan akord dengan cara menekan beberapa senar sekaligus menggunakan satu jari. Ini sangat berguna untuk memainkan akord mayor di berbagai posisi pada leher gitar, memberikan fleksibilitas dan variasi dalam permainan. Untuk memainkan kunci balok mayor, jari telunjuk digunakan untuk menekan semua senar di satu fret, sementara jari-jari lainnya membentuk pola akord yang sama seperti akord E atau A di fret yang lebih tinggi.",
  },
  {
    id: 7,
    title: "TUTORIAL TEKNIK DASAR BELAJAR MELODI GITAR",
    url: "https://youtu.be/8r9NIeVyRzY?si=wz2uVx_4YGo_HI50",
    description: "Teknik bermain melodi pada gitar melibatkan penggunaan berbagai teknik seperti hammer-ons, pull-offs, bends, slides, dan vibrato untuk menciptakan frase musik yang halus dan ekspresif. Hammer-ons dan pull-offs memungkinkan transisi antar nada yang cepat dan efisien, sementara bends mengubah pitch dengan menarik atau mendorong senar. Slides memungkinkan perpindahan yang mulus antara fret, dan vibrato menambahkan nuansa emosional dengan sedikit menggetarkan senar. Menguasai teknik-teknik ini memungkinkan gitaris untuk memainkan melodi dengan dinamika dan ekspresi yang kaya, serta menciptakan suara yang khas dan pribadi.",
  },
  {
    id: 8,
    title: "CARA CEPAT BISA BERMAIN PETIKAN",
    url: "https://youtu.be/sEbfVXxHcmk?si=Nsm48vcbPBGAvlBS",
    description: "Petikan pada gitar, atau fingerstyle, adalah teknik bermain di mana jari-jari tangan memetik senar secara individual, menciptakan melodi, harmoni, dan ritme secara simultan. Dalam teknik ini, jari-jari yang paling sering digunakan adalah ibu jari, telunjuk, tengah, dan manis. Ibu jari biasanya memetik senar bass (E, A, dan D), sementara jari-jari lainnya bertanggung jawab untuk senar yang lebih tinggi (G, B, dan E). Fingerstyle memungkinkan pemain untuk menghasilkan suara yang lebih kompleks dan dinamis dibandingkan dengan teknik strumming, karena setiap senar dapat dimainkan dengan tekanan dan ritme yang berbeda-beda. Teknik ini banyak digunakan dalam berbagai genre musik, mulai dari folk, klasik, hingga pop, dan membutuhkan latihan yang konsisten untuk mengembangkan koordinasi dan ketepatan jari.",
  },
  {
    id: 9,
    title: "Family Chords",
    url: "https://youtu.be/sBWOkMxyRMU?si=eD9tXP7SkHV7YlBD",
    description: "Menggunakan family chords memungkinkan musisi untuk menciptakan progresi akord yang harmonis dan koheren. Dalam banyak lagu pop, rock, dan folk, progresi akord sering kali menggunakan kombinasi dari family chords ini untuk menciptakan pola yang enak didengar dan mudah diingat. Memahami dan mengenali family chords dalam berbagai kunci adalah keterampilan penting bagi setiap musisi, karena ini membantu dalam penulisan lagu, improvisasi, dan memahami struktur musik secara keseluruhan.",
  }
];

const CoursePage = () => {
  const { id } = useParams();
  const [user,setUser] = useState(null);
  const sharedCourse = useRecoilValue(sharedCourseAtom);
  const course = courses.find(course => course.id === parseInt(id)) || sharedCourse;

  if(localStorage.getItem("user_id")){
    getUser({ "_id": localStorage.getItem("user_id") })
    .then(data => {
      setUser(data.data[0])
    })
  }

  if (!course) {
    return <Text>Course not found</Text>;
  }

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
            url={course.url} 
            width="100%" 
            height="100%"
            controls
            />
        </Box>
      </Box>
      <Box justifyContent={"center"} alignItems={"center"}>
        <Text as={"b"} fontSize={"3xl"} mt={20}>Dasar-Dasar Gitar</Text>
        <Text fontSize={"1xl"}>{course.description}</Text>
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
        <Text fontSize={"1xl"}>{course.description}</Text>
      </Box>
    </VStack>
    </Box>
    }

    </>
  );
};

export default CoursePage;
