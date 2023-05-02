import { UserCredential } from "firebase/auth";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<UserCredential | null>(null);
const UserUpdateContext = createContext<((user: UserCredential | null) => void)>(() => {});

export function useGoogleUser() {
  return useContext(UserContext);
}

export function useGoogleUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({children} : any) {
  const [user, setUser] = useState<UserCredential | null>(null);

  function updateUser(user: UserCredential | null) {
    console.log("setting user");
    setUser(user);
  }

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}
