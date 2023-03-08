'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const CreateComment = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastID: string;

  const { mutate } = useMutation(async (data: { title: string; postId: string }) => axios.post(`/api/posts/addComment`, { data }), {
    onSuccess: (res) => {
      setIsDisabled(false);
      toast.success('added your comment', { id: commentToastID });
    },
    onError: (error) => {
      setIsDisabled(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, { id: commentToastID });
      } else {
        toast.error('something wrong', { id: commentToastID });
      }
    },
  });

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastID = toast.loading('Adding your comment...', { id: commentToastID });

    mutate({ title, postId: id });
  };
  return (
    <div>
      <form onSubmit={submitComment} className="my-8">
        <h3>Add a comment</h3>
        <div className="flex flex-col my-2">
          <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} className="p-4 text-lg rounded-md my-2" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-600'}`}>{`${title.length}/300`}</p>
          <button disabled={isDisabled} className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" type="submit">
            Create comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
