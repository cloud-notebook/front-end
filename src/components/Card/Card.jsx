import { AiTwotoneMessage } from 'react-icons/ai'
import notePin from '../../assets/img/notePin.png'
import { useNavigate } from 'react-router-dom'

export default function Card({ note }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`note/${note?._id}`, { relative: 'notes' })} className='sm:col-span-6 col-span-12 my-2 border rounded-lg p-4 max-w-[500px] bg-gradient-to-l from-blue-500 dark:from-slate-800 dark:to-slate-950 to-lightblue-500 '>
            <div className='h-[200px] flex items-center justify-center'>
                <img src={notePin} alt="" className='w-[40px] h-[40px]' />
            </div>
            <div>
                <h1 className='text-xl font-bold mb-0 text-blue-800'>{note?.title}</h1>
                <i className='text-sm text-gray-500 block'>{note?.user.name}</i>
                <i className='text-sm text-gray-500 block'>Created At: {Date(note?.createdAt)}</i>
                <p className='text-sm mt-2'>{note?.description.slice(0, 100)}</p>
            </div>
            <div className='flex justify-end items-end'>
                <button className='bg-blue-500 text-white rounded-md px-2 py-1'><AiTwotoneMessage /></button>
            </div>
        </div>
    )
}
