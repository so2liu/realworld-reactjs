export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export type NewArticle = Pick<
  Article,
  "title" | "description" | "body" | "tagList"
>;

export type NewComment = Pick<Comment, "body">;

export interface Tab {
  text: string;
  href: string;
}

export type QueryArticles = {
  tag: string;
  author: string;
  favorited: string;
  limit: number;
  offset: number;
};
