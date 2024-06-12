import { SunIcon } from "../components/icons/SunIcon";
import { MoonIcon } from "../components/icons/MoonIcon";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useUserContext } from "../store/userContext";
import { CollectionProperties } from "../types/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Collections = () => {
  const { currentUser, setCurrentUser, theme, setTheme } = useUserContext();
  const [collections, setCollections] = useState<CollectionProperties[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fetch-collections"
        );
        if (response.data.success) {
          setCollections(response.data.collections);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollections();
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
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='mt-10 text-3xl'>Recent Collections</h1>

        <div className='grid gap-4 grid-cols-3 grid-rows-3 mt-4 w-[980px]'>
          {collections &&
            collections.map((collection) => (
              <Card className='max-w-[400px]' key={collection.id}>
                {collection.imageUrl ? (
                  <>
                    <CardHeader className='flex gap-3'>
                      <Image
                        className='w-[350px] h-[190px]'
                        alt='nextui logo'
                        height={350}
                        radius='sm'
                        src={collection.imageUrl}
                        width={350}
                      />
                    </CardHeader>
                    <Divider />{" "}
                  </>
                ) : null}
                <CardBody className='flex justify-center'>
                  <h1 className='pl-5'>Collection: {collection.title}</h1>
                  <h2 className='pl-5'>Category: {collection.category}</h2>
                </CardBody>
                <Divider />
                <CardFooter>
                  <div className='mb-4'>
                    <div className='mt-1 relative'>
                      <Button
                        size='md'
                        className='inline-block border-1 text-white ml-5 py-1 
                        px-4 cursor-pointer bg-[#1e1e1c]'
                        onClick={() => navigate(`/collection/${collection.id}`)}
                      >
                        Open Collection
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          {collections.length === 0 && <Card className='gap-1 border-1 p-12 flex justify-center items-center'>
            <CardHeader>
              <h1>No collections yet..</h1>
            </CardHeader>
          </Card>}
        </div>
      </div>
    </div>
  );
};

export default Collections;
