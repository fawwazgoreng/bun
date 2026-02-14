import { globalResponse } from "./global";

export type User = {
  id?: string;
  email: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export interface userResponse extends globalResponse {
  user? : User 
}

export type loginType = {
  email: string;
  password: string;
};

export type registerType = {
  name: string,
  password: string,
  email: string,
}

export type updateType = {
  name?: string,
  password?: string,
  email?: string,
}
