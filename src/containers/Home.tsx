import React, { useState } from "react";
import { Heading, Box, Badge, Spinner, Button } from "gestalt";
import { Tag } from "antd";
import { Tab, Article } from "../Interface";
import { useArticles, useAllTags } from "../API";
import ArticleBox from "../components/ArticleBox";
import Tabs from "../components/Tabs";
import moment from "moment";

const HomeSlide = () => (
  <Box color="navy" padding={3}>
    <Heading size="md" color="white">
      conduit
    </Heading>
    <Heading size="sm" color="white">
      A place to share your knowledge.
    </Heading>
  </Box>
);

interface TagBox {
  tags: string[];
  onClick: (tag: string) => void;
}
const TagBox = ({ tags, onClick }: TagBox) => (
  <Box color="lightWash" marginBottom={2} marginTop={2} padding={3}>
    {tags.map((tag) => {
      return (
        <Tag.CheckableTag
          checked={false}
          key={tag}
          onChange={() => {
            onClick(tag);
          }}
        >
          #{tag}
        </Tag.CheckableTag>
      );
    })}
  </Box>
);

const useTagAsTab = () => {
  const initTab = { text: "", href: "#" };
  const [tabs, setTabs] = useState([initTab]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickTag = (tag: string) => {
    console.log(`${tag} clicked`);
    if (!tabs.find((tab) => tab.text === tag)) {
      const newTabs = [...tabs, { text: tag, href: "#" }];
      if (tabs.length < 5) {
        setTabs(newTabs);
        setActiveIndex(newTabs.length - 1);
      } else {
        setTabs([initTab, ...newTabs.splice(2)]);
        setActiveIndex(4);
      }
    }
  };
  const [articles, loading] = useArticles({
    tag: tabs[activeIndex].text,
  });
  const result: [
    { articles: Article[]; loading: boolean },
    (tag: string) => void,
    JSX.Element
  ] = [
    { articles, loading },
    handleClickTag,
    <Tabs
      tabs={tabs}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />,
  ];
  return result;
};

export default () => {
  const allTags = useAllTags();
  const [{ articles, loading }, handleAddTab, TagTabs] = useTagAsTab();
  const articleBoxes = articles.map((article) => (
    <ArticleBox key={article.slug} article={article} />
  ));

  return (
    <>
      <HomeSlide />
      <TagBox tags={allTags} onClick={handleAddTab} />
      {TagTabs}
      <Box marginTop={3}>
        {loading ? <Spinner show accessibilityLabel="Loading" /> : articleBoxes}
      </Box>
      <pre>{JSON.stringify(allTags, null, 2)}</pre>
      <pre>{JSON.stringify(articles[0], null, 2)}</pre>
    </>
  );
};
