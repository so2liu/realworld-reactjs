import React from "react";
import { reaction, autorun } from "mobx";
import { useAsObservableSource } from "mobx-react-lite"; // 6.x
import { useStore } from "./contextProvider";
import { TArticleStore } from "./stores";
import { QueryArticles } from "./Interface";
import querystring from "querystring";
import axios from "axios";

const BASE_URL = "https://conduit.productionready.io/api";

export function useFetcher<T>(resource: string, baseUrl = BASE_URL): T | null {
  const store = useStore().articleStore;
  const source = useAsObservableSource({
    url: `${baseUrl}/${resource}?${
      Boolean(store.query) && querystring.encode(store.query)
    }`,
  });
  console.log(source.url);
  const [result, setResult] = React.useState(null as any);

  const doFetch = (fetchUrl: string) => {
    console.log("hier");
    store.setLoading(true);
    axios
      .get(fetchUrl)
      .then((result) => {
        setResult(result);
        console.log(result.data);
      })
      .catch((err) => {
        store.error = err;
      })
      .finally(() => {
        store.setLoading(false);
      });
  };

  React.useEffect(() => reaction(() => `${source.url}`, doFetch), []);

  return result;
}

export function useArticles(store: TArticleStore) {
  React.useEffect(
    () =>
      autorun(() => {
        const fullUrl = `${BASE_URL}\\articles?${querystring.encode(
          store.query
        )}`;
        store.setLoading(true);
        axios
          .get(fullUrl)
          .then((res) => {
            console.log("get articles");
            store.appendArticles(res.data.articles);
          })
          .catch((err) => console.log(err.response.data))
          .finally(() => store.setLoading(false));
      }),
    []
  );
}
