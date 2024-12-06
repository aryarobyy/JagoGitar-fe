import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Navbar from "./components/Navbar";
import ForumPage from "./pages/ForumPage";
import { useRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CourseListPage from './pages/course/CourseListPage'
import CoursePage from "./pages/course/CoursePage";
import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import LightDark from "./components/LightDark";
import DashBoard from './admin/Dashboard';
import AdminNavbar from "./admin/components/AdminNavbar";
import AddCourse from "./pages/course/AddCourse";
import RegisMentor from "./pages/RegisMentor";

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const location = useLocation();

  const handleLogout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user_data");
      localStorage.removeItem("user_id");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <Box position={"relative"} w="full">
      {!isAdminRoute && (
        <Container maxW="1440px">
          <Navbar handleLogout={handleLogout} />
          <Routes>
            <Route path='/update/:userId' element={user ? <UpdateProfilePage /> : <Navigate to='/login' />} />
            <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/forum' element={<ForumPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/' element={<WelcomePage />} />
            <Route path='/user/:username' element={<UserPage />} />
            <Route path='/:username/forum/:forumId' element={<PostPage />} />
            <Route path='/course/list' element={<CourseListPage />} />
            <Route path='/course/mentor' element={<RegisMentor />} />
            <Route path='/course/:courseId' element={<CoursePage />} />
            <Route path='/add/course' element={<AddCourse /> } />
          </Routes>
          <LightDark />
        </Container>
      )}
      {isAdminRoute && (
    <Box display="flex">
      <Box flex="1" px={6} py={4}>
        <AdminNavbar />
        <Routes>
          <Route path="/admin" element={<DashBoard />} />
        </Routes>
      </Box>
	  </Box>
      )}
    </Box>
  );
}

export default App;
