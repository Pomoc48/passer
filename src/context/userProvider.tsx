import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  user: null as User | null,
  update: (user: User | null) => { },
});

export function useEmailUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User | null) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user: user, update: updateUser }}>
      {children}
    </UserContext.Provider>
  )
}
