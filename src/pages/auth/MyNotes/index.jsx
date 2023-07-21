import './style.css'
import { useEffect, useState } from "react";
import { useLazyAllPrivateNotesQuery, useDeleteNoteMutation, useAllPrivateNotesQuery } from "../../../services/notes.service";
import Button from "bootstrap/js/src/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillEye, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../components/Modal";


export default function MyNotes() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const { data, isSuccess } = useAllPrivateNotesQuery();
    const [deleteNote] = useDeleteNoteMutation()
    useEffect(() => {
        if (isSuccess) {
            setNotes(data?.notes)
            console.log(data)
        }
    }, [data, isSuccess])
    function handelDeleteNote(id) {
        console.log(id);
        deleteNote(id).then(res => {
            if (res.data) {
                toast.success("Note Deleted Successfully", {
                    position: 'top-center',
                    autoClose: 5000,
                    progress: undefined,
                    closeOnClick: true,
                    closeButton: true
                })
            }
            if (res.error) {
                console.log(res.error)
            }
        })
    }
    return (
        <div className="dark:bg-slate-800">
            <div className={'flex w-[70%] mx-auto justify-between items-center mb-0 md:mt-10 mt-3 '}>
                <h1 className={'text-center self-center md:text-3xl text-lg text-green-500 '}>My Notes</h1>
                <button className={'flex dark:bg-black dark:text-white  items-center gap-2 bg-green-600 md:p-2 p-1.5 md:text-lg text-[10px] rounded text-white'} onClick={() => navigate('/create-note')}><AiOutlinePlus /> Add New Note</button>
            </div>
            <hr className={'w-[70%] mx-auto'} />
            <section className="grid grid-cols-12 gap-5 w-[90%] md:w-[70%] mx-auto">
                {
                    notes.map((note) => {
                        return <div key={note?._id} className="col-span-8 md:col-span-6 card dark:bg-black dark:text-white flex-1 md:mb-0 mb-3 relative">
                            <div className="icon">
                                <i className="fa-solid fa-book"></i>
                            </div>
                            <h3 className='dark:text-white'>{note?.title}</h3>
                            <p className='text-ellipsis dark:text-white'>
                                {note?.description.slice(0, 100)}
                            </p>
                            <div className="flex gap-2">
                                <h4>
                                    <b className="fw-bold">Tags :</b>
                                </h4>
                                <p className={'text-red-600'}>#{note?.tag}</p>
                            </div>
                            <div className={'p-2   rounded-full absolute top-[-10px] left-0 bg-red-600'}>
                                <p className={'w-1 text-white font-bold text-[10px]'}>{note?.isPublic ? 'Public' : 'Private'}</p>
                            </div>
                            <div className="absolute top-1 right-2 flex gap-2">

                                <Modal note={note}>
                                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"><AiOutlineEdit /></button>
                                </Modal>


                                <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500" onClick={() => handelDeleteNote(note?._id)}><AiFillDelete /></button>

                                <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-500" type={'button'} onClick={() => navigate(`note/${note?._id}`)}><AiFillEye /></button>
                            </div>
                        </div>
                    })
                }

            </section>
        </div>
    )
}
