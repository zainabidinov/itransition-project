import React, { useEffect, useRef, useState } from "react";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { MoonIcon } from "../components/icons/MoonIcon";
import { PlusIcon } from "../components/icons/PlusIcon";
import { SunIcon } from "../components/icons/SunIcon";
import { collectionCatogories } from "../data/collectionCatogories";
import { useUserContext } from "../store/userContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CollectionProperties } from "../types/types";

const MyCollections = () => {
  const { theme, setTheme, currentUser } = useUserContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionCategory, setCollectionCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [myCollections, setMyCollections] = useState<CollectionProperties[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCollections = async () => {
      try {
        const response = await axiosInstance.get(
          `/my-collections/${currentUser?.id}`
        );
        if (response.data.success) {
          setMyCollections(response.data.collections);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchMyCollections();
  }, [currentUser]);

  const createCollection = async () => {
    const formData = new FormData();
    formData.append("collectionTitle", collectionTitle);
    formData.append("collectionCategory", collectionCategory);

    try {
      const response = await axiosInstance.post(
        `/create-collection/${currentUser?.id}`,
        formData
      );
      if (response.data.success) {
        onOpenChange();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFileChange = async (event, collectionId) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axiosInstance.post(
          `/upload-collection-image/${collectionId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMyCollections((prevCollections) =>
          prevCollections.map((collection) => {
            if (collection.id === collectionId) {
              return { ...collection, imageUrl: response.data.imageUrl };
            } else {
              return collection;
            }
          })
        );
      } catch (error) {
        console.error("Error uploading avatar", error);
      }
    }
  };

  return (
    <div className='h-full w-full'>
      <ExtendedNavbar />
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className='bg-default-100 hover:bg-default-200 h-9 w-9 fixed z-10 right-12 bottom-10 flex items-center justify-center rounded-lg hover:cursor-pointer'
      >
        {theme === "light" ? (
          <SunIcon className='w-5 h-5' />
        ) : (
          <MoonIcon className='w-5 h-5' />
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Add a new collection
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Collection name'
                  placeholder='Enter your collection name'
                  variant='bordered'
                  name='collectionTitle'
                  value={collectionTitle}
                  onChange={(e) => setCollectionTitle(e.target.value)}
                />
                <Select
                  items={collectionCatogories}
                  label='Collection category'
                  placeholder='Select your collection category'
                  name='category'
                  value={collectionCategory}
                  onChange={(e) => setCollectionCategory(e.target.value)}
                >
                  {(collectionCatogories) => (
                    <SelectItem key={collectionCatogories.key}>
                      {collectionCatogories.label}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  className='bg-[#1e1e1c] text-white'
                  type='submit'
                  onPress={createCollection}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-10 text-3xl text-center'>MY COLLECTIONS</h1>

        <div className='grid gap-4 grid-cols-3 grid-rows-3 mt-4 w-[980px]'>
          {myCollections &&
            myCollections.map((collection) => (
              <Card className='max-w-[400px]' key={collection.id}>
                {collection.imageUrl ? (
                  <>
                    <CardHeader className='flex gap-3'>
                      <Image
                        className="w-[350px] h-[190px]"
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
                      <input
                        name={`image-${collection.id}`}
                        id={`file-input-${collection.id}`}
                        type='file'
                        className='hidden'
                        ref={(el) => {
                          if (fileInputRef.current) {
                            fileInputRef.current[collection.id] = el;
                          }
                        }}
                        onChange={(e) => handleFileChange(e, collection.id)}
                      />
                      <label
                        htmlFor={`file-input-${collection.id}`}
                        className='inline-block border-[#1e1e1c] border-1 text-[#1e1e1c] ml-5 py-1.5 
                        px-4 cursor-pointer rounded-md shadow-md hover:bg-[#1e1e1c] hover:text-white'
                      >
                        {file ? file.name : "Set image"}
                      </label>
                      <Button size="md" className='inline-block border-1 text-white ml-5 py-1 
                        px-4 cursor-pointer bg-[#1e1e1c]' onClick={() => navigate(`/collection/${collection.id}`)}>Open Collection</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          <Card className='gap-1 border-1 p-12 flex justify-center items-center'>
            <span
              className='hover:cursor-pointer flex hover:text-[#7828C8]'
              onClick={onOpen}
            >
              Create a collection
              <PlusIcon width={undefined} height={undefined} />
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyCollections;
