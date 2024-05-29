import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../store/userContext";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ExtendedNavbar: React.FC = () => {
  const { currentUser, setCurrentUser} = useUserContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setCurrentUser(null);
  };

  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await axiosInstance.get("/current-user");
          if (response.data.success) {
            setCurrentUser(response.data.user);
            console.log(currentUser);
          }
        }
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };

    fetchCurrentUser();
  }, []);


  const renderNavbarItems = () => {
    if (currentUser && currentUser.isAdmin === false) {
      return (
        <Navbar isBordered>
          <NavbarContent justify='start'>
            <NavbarBrand>
              <p className='hidden sm:block font-bold text-xl text-inherit'>
                COLLECTR.
              </p>
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
              <Link color='foreground' href='#' className='hover:underline hover:cursor-pointer'>
                HOME
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='#' color='foreground' className='hover:underline hover:cursor-pointer'>
                COLLECTIONS
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='#' color='foreground' className='hover:underline hover:cursor-pointer'>
                ABOUT
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name='Jason Hughes'
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Signed in as</p>
                    <p className='font-semibold'>{currentUser.email}</p>
                  </DropdownItem>
                  <DropdownItem key='collections'>My Collections</DropdownItem>
                  <DropdownItem key='about'>About</DropdownItem>
                  <DropdownItem
                    key='logout'
                    color='danger'
                    onClick={handleLogOut}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      );
    } else if (currentUser && currentUser.isAdmin === true) {
      return (
        <Navbar isBordered>
          <NavbarContent justify='start'>
            <NavbarBrand>
              <p className='hidden sm:block font-bold text-xl text-inherit'>
                COLLECTR.
              </p>
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
              <Link color='foreground'  className='hover:underline hover:cursor-pointer' onClick={() => navigate("/home")}>
                HOME
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link  color='foreground' className='hover:underline hover:cursor-pointer'>
                COLLECTIONS
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                
                color='foreground'
                className='hover:underline hover:cursor-pointer'
                onClick={() => navigate("/users")}
              >
                USERS
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name='Jason Hughes'
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Signed in as</p>
                    <p className='font-semibold'>{currentUser.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key='settings'
                    onClick={() => navigate("/users")}
                  >
                    Manage Users
                  </DropdownItem>
                  <DropdownItem key='collections'>Collections</DropdownItem>
                  <DropdownItem
                    key='logout'
                    color='danger'
                    onClick={handleLogOut}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      );
    } else {
      return (
        <Navbar isBordered>
          <NavbarContent justify='start'>
            <NavbarBrand>
              <p className='hidden sm:block font-bold text-xl text-inherit'>
                COLLECTR.
              </p>
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
              <Link color='foreground' className='hover:underline hover:cursor-pointer' onClick={() => navigate("/home")}>
                HOME
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color='foreground' className='hover:underline hover:cursor-pointer' onClick={() => navigate("/collections")}>
                COLLECTIONS
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color='foreground' className='hover:underline hover:cursor-pointer'>
                ABOUT
              </Link>
            </NavbarItem>
            <Button
              className='bg-[#1e1e1c] text-white'
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>
          </NavbarContent>
        </Navbar>
      );
    }
  };

  return renderNavbarItems();
};

export default ExtendedNavbar;
