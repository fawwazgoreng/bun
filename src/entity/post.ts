import { globalResponse } from "./global";

export interface Post {
  id: string;
  title: string;
  content: string;
  updated_at: Date;
  created_at: Date;
  author: {
    id: string;
    name: string;
  };
}

export interface postResponse extends globalResponse {
  post: Post;
}

export type createPost = {
  title: string;
  content: string;
};

export type updatePost = {
  title?: string;
  content?: string;
};
