import { useEffect, useState } from "react";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { MoonIcon } from "../components/icons/MoonIcon";
import { SunIcon } from "../components/icons/SunIcon";
import { UserProvider, useUserContext } from "../store/userContext";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import { CollectionProperties, ItemProperties } from "../types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { itemTags } from "../data/itemTags";

const Collection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme, setTheme, currentUser } = useUserContext();
  const params = useParams();
  const [currentCollection, setCurrentCollection] =
    useState<CollectionProperties | null>(null);
  const [itemTag, setItemTag] = useState<string>("");
  const [itemTitle, setItemTitle] = useState<string>("");
  const [userItems, setUserItems] = useState<ItemProperties[]>([]);
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      title: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "title",
      label: "Item",
    },
    {
      key: "itemTag",
      label: "Tag",
    },
    {
      key: "likes",
      label: "Likes",
    },
    {
      key: "comments",
      label: "Comments",
    },
  ];

  useEffect(() => {
    const fetchCurrentCollection = async () => {
      try {
        const response = await axiosInstance.get(
          `collection/${params.collectionId}`
        );
        setCurrentCollection((prevCollection) => response.data.collection);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchCurrentCollection();
  }, []);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await axiosInstance.get(
          `fetch-items/${params.collectionId}`
        );
        if (response.data.success) {
          setUserItems((prevItems) => response.data.data);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchUserItems();
  }, []);

  const createItem = async () => {
    const formData = {
      title: itemTitle,
      itemTag,
      userId: currentUser?.id,
    }
    

    try {
      const response = await axiosInstance.post(
        `/create-item/${params.collectionId}`, formData
      );
      if (response.data.success) {
        setItemTitle("");
        setItemTag("");
        onOpenChange();
        setUserItems((prevItems) => [...prevItems, response.data.data]);


      }
    } catch (error) {
      console.error(error);
      throw error;
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
                  label='Item name'
                  placeholder='Enter your item name'
                  variant='bordered'
                  name='itemTitle'
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
                <Select
                  items={itemTags}
                  label='Item tags'
                  placeholder='Select your item tag'
                  name='itemTag'
                  value={itemTag}
                  onChange={(e) => setItemTag(e.target.value)}
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
                  onPress={createItem}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-10 text-3xl text-center'>
          {currentCollection && currentCollection.title}
        </h1>

        <div className='flex justify-end max-w-[980px] w-full'>
          <Button
            className='mt-4 bg-[#1e1e1c] text-white rounded-md mr-2'
            onClick={onOpen}
          >
            Add Item
          </Button>
        </div>
        <Table
          aria-label='Example table with dynamic content'
          className='mt-2 max-w-[980px]'
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={userItems}>
            {(userItem) => (
              <TableRow key={userItem.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(userItem, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='mt-4 w-[980px]'></div>
    </div>
  );
};

export default Collection;
