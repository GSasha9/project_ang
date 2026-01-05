import { BlogPostData } from '@shared/models/blog-post-data.model';

export const DRAFT_BLOG_POSTS: BlogPostData[] = [
  {
    id: 1,
    meta: {
      time: '11:30am',
      date: '01.01.2026',
    },
    title: 'UX review presentations',
    img: '/project_ang/post1.png',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    author: {
      name: 'Olivia Rhee',
      email: 'Olivia@gmail.com',
      pic: '/project_ang/girl.png',
    },
  },
  {
    id: 2,
    meta: {
      time: '12:30am',
      date: '03.01.2026',
    },
    title: 'Migrating to Linear 101',
    img: '/project_ang/post2.png',
    text: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    author: {
      name: 'Drew Cana',
      email: 'cana@gmail.com',
      pic: '/project_ang/boy.png',
    },
  },
];
