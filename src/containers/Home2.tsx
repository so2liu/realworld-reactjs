import React, { useEffect, useState } from "react";
import { TagBox, HomeSlide } from "./Home";
import { useFetcher } from "../agent";
import { useStore } from "../contextProvider";
import { Article } from "../Interface";
import { useArticles } from "../agent";
import { useObserver } from "mobx-react-lite";
import ArticleBox from "../components/ArticleBox";
import { Spinner, Button, Box } from "gestalt";
import { useHotTags } from "../API";
import ArticleList from "../components/ArticleList";

export default () => {
  const hotTags = useHotTags();
  const articleStore = useStore().articleStore;
  articleStore.setQueryInitIfDirty();
  useArticles(articleStore);

  const [scoll, setScoll] = useState({ iH: 0, sT: "0", sH: 0 });
  const handleScoll = () => {
    setScoll({
      iH: window.innerHeight,
      sT: document.documentElement.scrollTop.toFixed(0),
      sH: document.documentElement.scrollHeight,
    });
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.scrollHeight * 0.7
    ) {
      console.log("load art");
      articleStore.loadArticles();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScoll);
    return () => {
      window.removeEventListener("scroll", handleScoll);
    };
  }, [handleScoll]);
  return (
    <>
      <TagBox tags={hotTags} onClick={articleStore.setTag} />
      <div
        style={{
          position: "fixed",
          backgroundColor: "blue",
          color: "white",
          right: "20px",
        }}
      >
        <pre>{JSON.stringify(scoll, null, 2)}</pre>
      </div>
      <ArticleList articleStore={articleStore} />
    </>
  );
};
