import { UserData } from './user-data.model';

export type RegisterForm = UserData & {
  ['repeat password']: string;
};
