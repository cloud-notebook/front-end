import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card/Card'
import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../../components/Pagination'
import { useAllPublicNotesQuery, useLazyAllPublicNotesQuery, useLazySearchNoteQuery } from '../../../services/notes.service';
import ReactPaginate from 'react-paginate'

export default function PublicNotes() {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { data, isLoading, isError, error, isSuccess, refetch } = useAllPublicNotesQuery(page);

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

    const handleChangePage = ({ selected }) => {
        setPage(selected);
        refetch();
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
            <ReactPaginate
                previousLabel={"<Previous"}
                nextLabel={"Next>"}
                pageCount={totalPages}
                onPageChange={handleChangePage}
                containerClassName={"pagination-container"}
                previousClassName={"bg-green-800 text-white px-4 py-2 rounded-md"}
                previouslinkClassName={"bg-green-800 px-4 py-2"}
                nextClassName={"bg-green-800 px-4 py-2 rounded-md text-white"}
                disabledClassName={"text-gray-300 cursor-not-allowed"}
                disabledLinkClassName={"text-gray-300 cursor-not-allowed"}
                activeClassName={"bg-green-800 border-none text-white px-4 py-2 rounded-md"}
                pageClassName={"border border-green-800 border-none  px-4 py-2 rounded-md"}
            />
        </div>
    )
}
