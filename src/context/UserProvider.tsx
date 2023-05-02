import { UserCredential } from "firebase/auth";
import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  user: null as UserCredential | null,
  update: (user: UserCredential | null) => {},
});

export function useGoogleUser() {
  return useContext(UserContext);
}

export function UserProvider({children} : any) {
  const [user, setUser] = useState<UserCredential | null>(null);

  function updateUser(user: UserCredential | null) {
    console.log("setting user");
    setUser(user);
  }

  return (
    <UserContext.Provider value={{user: user, update: updateUser}}>
      {children}
    </UserContext.Provider>
  )
}
