export interface AuthPosts {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: Array<{
    createdAt: string;
    id: string;
    title: string;
    comments?: Array<{
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }>;
  }>;
}
