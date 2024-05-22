import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SearchIcon } from "../components/SearchIcon";
import { SunIcon } from "../components/SunIcon";
import { MoonIcon } from "../components/MoonIcon";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className='h-screen w-screen'>
      <Navbar isBordered>
        <NavbarContent justify='start'>
          <NavbarBrand>
            <p className='hidden sm:block font-bold text-xl text-inherit'>COLLECTR.</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as='div' justify='start'>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[15rem] h-8 mr-5",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchIcon size={15} />}
            type='search'
          />
        </NavbarContent>

        <NavbarContent as='div' justify='end'>
          <NavbarItem>
            <Link color='foreground' href='#'>
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' color='foreground'>
              COLLECTIONS
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' color='foreground'>
              ABOUT
            </Link>
          </NavbarItem>
          <Button
            className='bg-[#1e1e1c] text-white '
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        </NavbarContent>
      </Navbar>

      <h1>Home...</h1>
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className='bg-default-100 hover:bg-default-200 h-9 w-9 fixed right-12 bottom-10 flex items-center justify-center rounded-lg'
      >
        {theme === "light" ? <SunIcon className='w-5 h-5' /> : <MoonIcon className='w-5 h-5' />}
      </div>
    </div>
  );
};

export default Home;
