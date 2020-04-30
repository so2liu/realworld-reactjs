import React, { createContext, useContext } from "react";
import { useLocalStore } from "mobx-react-lite";

import {
  createUserStore,
  TUserStore,
  createArticleStore,
  TArticleStore,
} from "./stores";

const UserStoreContext = createContext<TUserStore | null>(null);
const ArticleStoreContext = createContext<TArticleStore | null>(null);

export const UserStoreProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const userStore = useLocalStore(createUserStore);
  const articleStore = useLocalStore(createArticleStore);
  return (
    <UserStoreContext.Provider value={userStore}>
      <ArticleStoreContext.Provider value={articleStore}>
        {children}
      </ArticleStoreContext.Provider>
    </UserStoreContext.Provider>
  );
};

export const useStore = () => {
  const userStore = useContext(UserStoreContext);
  const articleStore = useContext(ArticleStoreContext);
  if (!userStore || !articleStore) {
    throw new Error("userStore must be used within a store provider");
  }
  return { userStore, articleStore };
};
