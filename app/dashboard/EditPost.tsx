'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SinglePosts } from '@/types/SinglePosts';
import Toggle from '@/components/Toggle';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast, Toast } from 'react-hot-toast';
import axios from 'axios';

const EditPost = <T extends SinglePosts>({ avatar, name, title, comments, id }: T): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false);
  let deleteToastID: string;
  const QueryClient = useQueryClient();

  // delete post
  const { mutate } = useMutation(async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }), {
    onError: (error) => {
      console.log(error);
      toast.error('error deleting that post', { id: deleteToastID });
    },
    onSuccess: (data) => {
      toast.success('post has been deleted', { id: deleteToastID });
      QueryClient.invalidateQueries(['auth-posts']);
    },
  });

  const deletePost = () => {
    deleteToastID = toast.loading('Deleting your post.', { id: deleteToastID });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image width={32} height={32} src={avatar} alt="avatar" className="rounded-full" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">{comments?.length} comments</p>
          <button onClick={(e) => setToggle(true)} className="text-sm font-bold text-red-500">
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;
