import React from "react";
import { Spinner, Box, Button } from "gestalt";
import ArticleBox from "./ArticleBox";
import { TArticleStore } from "../stores";
import { useObserver } from "mobx-react-lite";

export default (props: { articleStore: TArticleStore }) => {
  const articleStore = props.articleStore;

  const Loading = () => (
    <>
      {" "}
      {articleStore.loading && (
        <Spinner
          key="loading-top"
          accessibilityLabel="Loading"
          show
          size="md"
        />
      )}
    </>
  );
  return useObserver(() => (
    <>
      <pre>{JSON.stringify(articleStore.query, null, 2)}</pre>
      <Box display="flex" direction="row">
        <Button
          text="Last Page"
          accessibilityLabel="Last Page"
          onClick={articleStore.lastPage}
          inline
        />
        <Button
          text="Next Page"
          accessibilityLabel="Next Page"
          onClick={articleStore.nextPage}
          inline
        />
      </Box>
      <Loading />
      {articleStore.articles.map((article) => (
        <ArticleBox key={article.slug} article={article} />
      ))}

      <pre>
        {articleStore.articles.length > 0 &&
          JSON.stringify(articleStore.articles[0], null, 2)}
      </pre>
    </>
  ));
};
