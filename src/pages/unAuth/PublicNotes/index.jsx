import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card/Card'
import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../../components/Pagination'
import { useAllPublicNotesQuery, useLazyAllPublicNotesQuery, useLazySearchNoteQuery } from '../../../services/notes.service';

export default function PublicNotes() {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { data, isLoading, isError, error, isSuccess } = useAllPublicNotesQuery(page);

    const [publicNotesQuery] = useLazyAllPublicNotesQuery()

    const [searchNotes] = useLazySearchNoteQuery();



    useEffect(() => {

        if (isSuccess) {
            setNotes(data.notes);
            setTotalPages(data.totalPages);
            setPage(data.currentPage);
            console.log(data);
        }

        if (isError) {
            console.log(error);
        }

    }, [page, isLoading, isError, error, isSuccess]);

    const handleSearchOnChange = (e) => {
        if (e.target.value === '') {
            publicNotesQuery().then(res => {
                if (res.isSuccess) {
                    setNotes(res.data.notes);
                    setTotalPages(res.data.totalPages);
                    setPage(res.data.currentPage);
                    console.log(res.data);
                }
                if (res.isError) {
                    console.log(res.error);
                }
            })
            return;
        }
        searchNotes(e.target.value).then(res => {
            if (res.isSuccess) {
                setNotes(res.data.notes);
                setTotalPages(res.data.totalPages);
                setPage(res.data.currentPage);
                console.log(res.data);
            }
            if (res.isError) {
                console.log(res.error);
            }
        })
    }

    return (
        <div className='w-[80%] mx-auto py-5 dark:text-white dark:bg-slate-800'>
            <div className="flex sm:justify-between justify-center flex-col sm:flex-row ">
                <h1 className='sm:text-2xl text-sm font-bold text-center'>All Public Notes Here</h1>
                <div className='w-[40%] relative'>
                    <input onChange={handleSearchOnChange} className='w-full rounded-md p-2 dark:text-black border border-gray-300 relative' type="search" name="search" id="search" />
                    <button className='absolute top-0.5 outline-none hover:border-blue-700 right-0 p-2.5 text-blue-700 text-lg rounded-md'><AiOutlineSearch /></button>
                </div>
            </div>
            <hr />
            <div className="grid grid-cols-12 gap-2">

                {
                    notes?.map((note, index) => {
                        return <Card note={note} key={index} />
                    })
                }
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={() => { }} />
        </div>
    )
}
