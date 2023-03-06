export interface SinglePosts {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: Array<{
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }>;
}
