import { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Profile,
  Article,
  NewArticle,
  Comment,
  NewComment,
  User,
  QueryArticles,
} from "./Interface";

const baseURL = "https://conduit.productionready.io/api";
const instance = axios.create({
  baseURL,
  timeout: 3000,
});
if (localStorage.getItem("currentUser")) {
  instance.defaults.headers.Authorization = `Token ${
    JSON.parse(localStorage.getItem("currentUser") as string).token
  }`;
}

const handleError = (error: { errors: string[] }) => {
  console.log(error.errors);
};

export const useArticles = (queries?: QueryArticles) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  let queryURL = "/articles";
  if (queries)
    for (let [key, value] of Object.entries(queries)) {
      if (value) queryURL = queryURL.concat(`?${key}=${value}`);
    }

  useEffect(() => {
    console.log("Start fetching articles from", queryURL);
    setLoading(true);
    instance
      .get(queryURL)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .then(() => console.log("End fetching articles"))
      .then(() => setLoading(false))
      .catch((err) => console.error(err.message));
  }, [queryURL, instance]);

  const result: [Article[], boolean] = [articles, loading];
  return result;
};

export const useHotTags = () => {
  const [allTags, setAllTags] = useState([] as string[]);
  useEffect(() => {
    instance
      .get("/tags")
      .then((res) => setAllTags(res.data.tags))
      .then(() => console.log("fetch tags"))
      .catch((err) => console.error(err.message));
  }, [instance]);
  return allTags;
};

export const useComments = (slug: string) => {
  const initComments: Comment[] = [];
  const [comments, setComments] = useState(initComments);
  useEffect(() => {
    instance
      .get(`articles/${slug}/comments`)
      .then((res) => setComments(res.data.comments))
      .then(() => console.log("Get comments of", slug))
      .catch((err) => handleError(err.response.data));
  }, [slug]);
  return comments;
};

export const signup = async (values: {
  username: string;
  email: string;
  password: string;
}) => {
  const { username, email, password } = values;
  const body = {
    user: {
      username,
      email,
      password,
    },
  };
  console.log(body);
  try {
    const res = await instance.post("/users", body);
    console.log("signup finished");
    instance.defaults.headers.common[
      "Authorization"
    ] = `Token ${res.data.user.token}`;
    return res.data.user as AxiosResponse<User>;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const login = async (user: { username: string; password: string }) => {
  const body = { user };
  try {
    const res = await instance.post("/users/login", body);
    console.log("Login finished");
    return res.data.user as AxiosResponse<User>;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const updateUser = async (values: Partial<Profile>) => {
  const copyValues: Partial<Profile> = { ...values };
  (Object.keys(copyValues) as Array<keyof typeof copyValues>).forEach((key) => {
    if (!copyValues[key]) delete copyValues[key];
  });
  const body = {
    user: copyValues,
  };
  try {
    const res = await instance.put("/user", body);
    console.log("update settings finished");
    return res.data;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const createArticle = async (
  article: NewArticle
): Promise<void | Article> => {
  const body = {
    article,
  };
  try {
    const res = await instance.post("/articles", body);
    console.log("New Post finished");
    return res.data.article;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const follow = async (username: string) => {
  try {
    const res = await instance.post(`/profiles/${username}/follow`);
    console.log("Follow", username);
    return res.data.profile as Profile;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const unfollow = async (username: string) => {
  try {
    const res = await instance.delete(`/profiles/${username}/follow`);
    console.log("Unfollow", username);
    return res.data.profile as Profile;
  } catch (err) {
    return handleError(err.response.data);
  }
};

export const sendComment = async (slug: string, comment: NewComment) => {
  const body = { comment };
  try {
    const res = await instance.post(`/articles/${slug}/comments`, body);
    console.log("Add comment in", slug);
    return res.data.comment as Comment;
  } catch (err) {
    return handleError(err.response.data);
  }
};
