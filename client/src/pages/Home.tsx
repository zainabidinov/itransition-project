import { SunIcon } from "../components/icons/SunIcon";
import { MoonIcon } from "../components/icons/MoonIcon";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useUserContext } from "../store/userContext";

const Home = () => {
  const { currentUser, setCurrentUser, theme, setTheme } = useUserContext();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await axiosInstance.get("/current-user");
          if (response.data.success) {
            setCurrentUser(response.data.user);
          }
        }
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className='h-screen w-screen'>
      <ExtendedNavbar />
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className='bg-default-100 hover:bg-default-200 h-9 w-9 fixed right-12 bottom-10 flex items-center justify-center rounded-lg'
      >
        {theme === "light" ? (
          <SunIcon className='w-5 h-5' />
        ) : (
          <MoonIcon className='w-5 h-5' />
        )}
      </div>
      <div className='w-full flex justify-center'>
        <h1 className='mt-10 text-3xl'>Latest Collections By Our Users</h1>
      </div>
    </div>
  );
};

export default Home;
