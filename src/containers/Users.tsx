import React, { useState } from "react";
import { useStore } from "../contextProvider";
import { useParams } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import ArticleList from "../components/ArticleList";
import { useArticles } from "../agent";
import { Tabs } from "gestalt";

export default () => {
  const tabs = [
    { text: "Wrote", href: "#" },
    { text: "Liked", href: "#" },
  ];
  const { username } = useParams();
  const articleStore = useStore().articleStore;
  useArticles(articleStore);

  const [activeIndex, setActiveIndex] = useState(0);
  if (tabs[activeIndex].text === "Wrote") articleStore.setAuthor(username);
  if (tabs[activeIndex].text === "Liked") articleStore.setFavorated(username);

  const handleTabChange = ({
    activeTabIndex,
    event,
  }: {
    activeTabIndex: number;
    event: React.SyntheticEvent<React.MouseEvent<Element, MouseEvent>, Event>;
  }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex);
  };
  return (
    <>
      <h2>User Profile</h2>
      <Tabs
        tabs={tabs}
        activeTabIndex={activeIndex}
        onChange={handleTabChange}
      />
      <ArticleList articleStore={articleStore} />
    </>
  );
};
