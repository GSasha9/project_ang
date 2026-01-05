import { UserData } from './user-data.model';

export type BlogPostData = {
  id: number;
  meta: {
    time: string;
    date: string;
  };
  img: string;
  title: string;
  text: string;
  author: Pick<UserData, 'name' | 'email'> & { pic: string };
};
