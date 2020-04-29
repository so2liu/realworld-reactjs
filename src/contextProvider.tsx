import React, { createContext, useContext } from "react";
import { useLocalStore } from "mobx-react-lite";

import { createUserStore, TUserStore } from "./stores";

const UserStoreContext = createContext<TUserStore | null>(null);

export const UserStoreProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const store = useLocalStore(createUserStore);
  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  const store = useContext(UserStoreContext);
  if (!store) {
    throw new Error("userStore must be used within a UserStoreProvider");
  }
  return store;
};
