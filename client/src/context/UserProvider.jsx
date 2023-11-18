import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUser must be used within a UserContextProvider"
    );
  }
  return context;
};
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const updateUser = async (rol) => {
    setUserData({rol});
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
