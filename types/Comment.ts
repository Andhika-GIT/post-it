export type Comment = {
  createdAt?: string;
  id: string;
  postId: string;
  title: string;
  userId: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
};
