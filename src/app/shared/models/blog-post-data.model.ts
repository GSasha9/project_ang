import { UserData } from './user-data.model';

export type BlogPostData = {
  id: number;
  postTime: string;
  postDate: string;
  img: string;
  title: string;
  text: string;
  author: Pick<UserData, 'name'> & { pic: string };
};
