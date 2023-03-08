'use client';

import Post from '@/components/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SinglePosts } from '@/types/SinglePosts';
import CreateComment from '@/components/CreateComment';
import Image from 'next/image';

interface url {
  params: {
    slug: string;
  };
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: url) => {
  const { data, isLoading } = useQuery({
    queryKey: ['detail-post'],
    queryFn: () => fetchDetails(url.params.slug),
  });

  console.log(data.comments);

  if (isLoading) return 'loading....';

  return (
    <div>
      <Post id={data?.id} name={data?.user?.name} avatar={data.user.image} title={data.title} comments={data.comments} />
      <CreateComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image width={24} height={24} src={comment.user?.image} alt="avatar" />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
