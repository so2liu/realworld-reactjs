import { User, Article, QueryArticles } from "./Interface";
import { userInfo } from "os";
import { useLocalStore } from "mobx-react-lite";
import { strict } from "assert";
import { stringify } from "querystring";
import _ from "lodash";

const diceImage = (username: string) =>
  `https://avatars.dicebear.com/v2/${
    username[0].toLowerCase() > "m" ? "male" : "female"
  }/:${username}.svg`;
const defaultImage =
  "https://static.productionready.io/images/smiley-cyrus.jpg";

export function createUserStore() {
  const leerUser: User = {
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  };
  const localUser: User = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : null;
  return {
    isSignedin: !!localUser,
    currentUser: localUser || leerUser,
    setUser(user: User) {
      this.currentUser = user;
      this.isSignedin = true;
      if (!this.currentUser.image || this.currentUser.image === defaultImage)
        this.currentUser.image = diceImage(this.currentUser.username);
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },
    logout() {
      localStorage.removeItem("currentUser");
      this.isSignedin = false;
      this.currentUser = leerUser;
    },
  };
}
export type TUserStore = ReturnType<typeof createUserStore>;

const initQuery: QueryArticles = {
  limit: 20,
  offset: 0,
  tag: "",
  author: "",
  favorited: "",
};
export const createArticleStore = () => ({
  articles: [] as Article[],
  loading: false,
  error: "",
  query: initQuery,
  appendArticles(articles: Article[]) {
    const newArticles = this.articles.concat(articles);
    const uniqueIDs = Array.from(
      new Set(newArticles.map((article) => article.slug))
    );
    this.articles = newArticles
      .filter((article) => uniqueIDs.includes(article.slug))
      .sort((A, B) => (A.updatedAt < B.updatedAt ? 1 : -1));
  },
  clearArticles() {
    this.articles = [] as Article[];
  },
  addCurrentArticle(currentAricle: Article) {
    this.articles.unshift(currentAricle);
  },
  setLoading(isLoading: boolean) {
    this.loading = isLoading;
  },
  nextPage() {
    this.query.offset += 20;
    this.articles.splice(20);
  },
  lastPage() {
    if (this.query.offset >= 20) {
      this.query.offset -= 20;
    }
  },
  loadArticles() {
    console.log("loadArticles");
    this.query.offset += 20;
  },
  setQueryInitIfDirty() {
    if (this.query.author || this.query.favorited || this.query.tag)
      this.setQueryInit();
  },
  setQueryInit() {
    if (!_.isEqual(initQuery, this.query)) {
      this.query = initQuery;
    }
  },
  setTag(tag: string) {
    this.clearArticles();
    this.query.tag = tag;
  },
  setAuthor(author: string) {
    this.setQueryInit();
    this.clearArticles();
    this.query.author = author;
  },
  setFavorated(user: string) {
    this.setQueryInit();
    this.clearArticles();
    this.query.favorited = user;
  },
});
export type TArticleStore = ReturnType<typeof createArticleStore>;
