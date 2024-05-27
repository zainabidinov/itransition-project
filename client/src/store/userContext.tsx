import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "../types/types";
import { useTheme } from "next-themes";

interface UserContextProps {
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { theme, setTheme } = useTheme();

  const value = { currentUser, setCurrentUser, theme, setTheme };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
