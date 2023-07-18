import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDeleteRatingMutation } from '../services/rating.service';
import { toast } from 'react-toastify';

export default function CommentBox({ rating }) {
  const { user } = useSelector(state => state.user);

  const [deleteRating] = useDeleteRatingMutation();
  const handleDelete = (id) => {
    deleteRating(id).then((res) => {
      if (res.data) {
        toast.success(res.data.message, {
          autoClose: 5000,
          position: 'top-center',
          progress: undefined,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        })
      }
      if (res.error) {
        console.log(res.error)
        toast.error(res.error.data.error, {
          autoClose: 5000,
          position: 'top-center',
          progress: undefined,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        })
      }
    })
  }
  return (
    <div className='flex gap-2 w-full dark:text-white'>
      <div className="flex-[4]">
        <h3 className='text-2xl font-bold'>{rating?.user.name}</h3>
        <h4 className='text-sm italic'>{rating?.star} star</h4>
        <p>{rating?.comment}</p>
        {user._id === rating?.user._id && <button onClick={() => handleDelete(rating?._id)} className='text-red-500'><AiFillDelete /></button>}
      </div>
      <div className="flex-1">
        <p className='text-sm font-semibold italic text-gray-500'>{Date(rating?.createdAt).slice(0, 21)}</p>
      </div>
    </div>
  )
}
