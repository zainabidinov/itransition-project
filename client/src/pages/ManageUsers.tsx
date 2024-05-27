import ExtendedNavbar from "../components/ExtendedNavbar";
import { MoonIcon } from "../components/icons/MoonIcon";
import { SunIcon } from "../components/icons/SunIcon";
import { useUserContext } from "../store/userContext";

const ManageUsers = () => {
  const {theme, setTheme} = useUserContext();
  return (
    <div>
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
      Hi from admin users!...
    </div>
  );
};

export default ManageUsers;
