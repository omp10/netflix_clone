import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { WatchPage } from "./pages/WatchPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SearchHistory from "./pages/SearchHistory.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]); // Ensure authCheck is stable or adjust based on its definition

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user?<Login />:<Navigate to={"/"}/>} />
        <Route path="/signup" element={!user?<Signup />:<Navigate to={"/"}/>} />
        <Route path="/watch/:id" element={user?<WatchPage />:<Navigate to={"/login"}/>} />
        <Route path="/search" element={user?<SearchPage />:<Navigate to={"/login"}/>} />
        <Route path="/history" element={user?<SearchHistory/>:<Navigate to={"/login"}/>} />
        <Route path="/*" element={user?<ErrorPage/>:<Navigate to={"/login"}/>} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
