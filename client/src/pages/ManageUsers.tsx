import ExtendedNavbar from "../components/ExtendedNavbar";
import { MoonIcon } from "../components/icons/MoonIcon";
import { SunIcon } from "../components/icons/SunIcon";
import { useUserContext } from "../store/userContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";

// import { columns, users, statusOptions } from "../data/data";
import { capitalize } from "../utils/capitalize";
import React, { useEffect } from "react";
import { SearchIcon } from "../components/icons/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { LockIcon } from "../components/icons/LockIcon";
import { UnlockIcon } from "../components/icons/UnlockIcon";
import { UserProfile } from "../types/types";
import axiosInstance from "../api/axiosInstance";
import { ArrowUpIcon } from "../components/icons/ArrowUpIcon";
import { CloseIcon } from "../components/icons/CloseIcon";
import { ArrowDownIcon } from "../components/icons/ArrowDownIcon";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  blocked: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = UserProfile;

const ManageUsers = () => {
  const { theme, setTheme, users, setUsers } = useUserContext();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Blocked", uid: "blocked" },
  ];

  const pages = Math.ceil((users ? users.length : 0) / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers: UserProfile[] = users ? [...users] : [];

    if (hasSearchFilter) {
      // filteredUsers = filteredUsers.filter((user) =>
      //   user.firstName.toLowerCase().includes(filterValue.toLowerCase())
      // );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(String(user.isActive))
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  console.log(users);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof User
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            // avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={`${user.firstName} ${user.lastName}`}
          >
            {`${user.firstName} ${user.lastName}`}
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>{cellValue}</p>
            <p className='text-bold text-tiny capitalize text-default-500'>
              {user.isAdmin ? "admin" : "user"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className='capitalize border-none gap-1  text-white'
            color={statusColorMap[user.isActive ? "active" : "blocked"]}
            size='sm'
          >
            {user.isActive ? "Active" : "Blocked"}
          </Chip>
        );
      case "actions":
        return (
          <div className='relative flex justify-start items-center gap-1'>
            {user.isAdmin ? (
              <Tooltip color='success' className="text-white" content='Dismiss as admin'>
                <span className='text-lg cursor-pointer active:opacity-50 mr-1 mt-[2px]'>
                  <ArrowDownIcon onClick={() => handleDemoteUser(user.id)} />
                </span>
              </Tooltip>
            ) : (
              <Tooltip color='success' className="text-white" content='Promote as admin'>
                <span className='text-lg cursor-pointer active:opacity-50 mt-2'>
                  <ArrowUpIcon onClick={() => handlePromoteUser(user.id)} />
                </span>
              </Tooltip>
            )}

            {user.isActive ? (
              <Tooltip color='secondary' content='Block user'>
                <span className='text-lg text-secondary cursor-pointer active:opacity-50'>
                  <LockIcon onClick={() => handleBlockUser(user.id)} />
                </span>
              </Tooltip>
            ) : (
              <Tooltip color='secondary' content='Unblock user'>
                <span className='text-lg text-secondary cursor-pointer active:opacity-50'>
                  <UnlockIcon onClick={() => handleUnblockUser(user.id)} />
                </span>
              </Tooltip>
            )}

            <Tooltip color='danger' content='Delete user'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50 ml-1'>
                <DeleteIcon onClick={() => handleDeleteUser(user.id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col-reverse gap-4 mt-4 max-w-[980px]  mx-auto w-full'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder='Search by name...'
            size='sm'
            startContent={<SearchIcon className='text-default-300' />}
            value={filterValue}
            variant='bordered'
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  size='sm'
                  variant='flat'
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  size='sm'
                  variant='flat'
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='flex justify-between items-center'></div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    users ? users.length : 0,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex  justify-evenly items-center'>
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color='default'
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant='light'
          onChange={setPage}
        />
        {/* <span className='text-small text-default-400'>
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
        <span className='text-default-400 text-small'>
          Total {users && users.length} users
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[550px]", "max-w-[980px]", "mx-auto"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  const handleBlockUser = async (userId) => {
    try {
      const response = await axiosInstance.put(`/block-user/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => {
          if (prevUsers) {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, isActive: false } : user
            );
          }
          return prevUsers;
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const response = await axiosInstance.put(`/unblock-user/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => {
          if (prevUsers) {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, isActive: true } : user
            );
          }
          return prevUsers;
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/delete-user/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => {
          if (prevUsers) {
            return prevUsers.filter((user) => user.id !== userId);
          }
          return prevUsers;
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };

  const handleDemoteUser = async (userId) => {
    try {
      const response = await axiosInstance.put(`/demote-user/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => {
          if (prevUsers) {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, isAdmin: false } : user
            );
          }
          return prevUsers;
        });
      }
    } catch (error) {
      console.error("Error demoting user from admin", error);
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      const response = await axiosInstance.put(`/promote-user/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => {
          if (prevUsers) {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, isAdmin: true } : user
            );
          }
          return prevUsers;
        });
      }
    } catch (error) {
      console.error("Error promoting user to admin", error);
    }
  };

  return (
    <div>
      <ExtendedNavbar />
      <div
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className='bg-default-100 hover:bg-default-200 h-9 w-9 fixed z-10 right-12 bottom-10 flex items-center justify-center rounded-lg'
      >
        {theme === "light" ? (
          <SunIcon className='w-5 h-5' />
        ) : (
          <MoonIcon className='w-5 h-5' />
        )}
      </div>
      <Table
        isCompact
        aria-label='Example table with custom cells, pagination and sorting'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.email}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
