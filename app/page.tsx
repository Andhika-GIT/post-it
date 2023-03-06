'use client';
import axios from 'axios';
import CreatePost from './components/CreatePost';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';
import { PostType } from './types/Posts';

// fetch all posts

const allPosts = async () => {
  const response = await axios.get('api/posts/getPosts');
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ['posts'] });

  if (error) return error;
  if (isLoading) return 'loading...';

  console.log(data);

  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Post key={post.id} id={post.id} postTitle={post.title} name={post.user.name} avatar={post.user.image} comments={post.comments} />
      ))}
    </main>
  );
}
