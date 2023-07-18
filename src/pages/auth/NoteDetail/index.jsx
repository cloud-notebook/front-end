import './style.css'
import { useParams } from "react-router-dom";
import { useFindNoteQuery } from "../../../services/notes.service";
import { useEffect, useState } from "react";
import Rating from "../../../components/Rating";
import { useGetRatingQuery } from '../../../services/rating.service';
import CommentBox from '../../../components/CommentBox';
import notePin from '../../../assets/img/notePin.png'

const NoteDetail = () => {
    const [notes, setNotes] = useState(null);
    const [paragraph, setParagraph] = useState([]);
    const [ratings, setRatings] = useState([])
    const params = useParams();
    const { data, isLoading, isError, error, isSuccess } = useFindNoteQuery({ id: params.id });
    const { data: ratingData, isLoading: ratingIsLoading, isError: ratingIsError, error: ratingError, isSuccess: ratingIsSuccess } = useGetRatingQuery(params.id)
    useEffect(() => {
        if (isSuccess) {
            setNotes(data.note)
            setParagraph(data.note.description.split('\n'))
        }
    }, [data, isLoading, isError, error, isSuccess]);

    useEffect(() => {
        if (ratingIsSuccess) {
            setRatings(ratingData.ratings)
            console.log(ratingData)
        }
    }, [ratingData, ratingIsLoading, ratingIsError, ratingError, ratingIsSuccess])

    return (
        <div className='w-[90%] mx-auto mb-0'>
            <div className="row">
                <h1 className='dark:text-white'>Complete Note Below</h1>
            </div>
            <hr />
            <div className="w-[90%] mx-auto complete_____note">
                <div className="w-full single_notepage dark:text-white" >
                    <h3 className="single_note_page_title">
                        <b>{notes?.title}</b>
                    </h3>
                    <p className="single_note_page_desc"> {
                        paragraph.map((para, index) => {
                            return <span key={index}><br />{para}</span>

                        })
                    }
                    </p>
                    <h6>
                        <b>Tags :</b>{notes?.tag}
                    </h6>
                    <div className="notepage_box" id="icon">
                        <img
                            src={notePin}
                            alt="pin pic"
                            width="40px"
                            height="40px"
                            className="icon"
                        />
                    </div>
                </div>
            </div>
            {notes?.isPublic && <>
                <Rating noteId={params.id} />
                <div className='w-[80%] m-auto my-4 p-4 border border-dashed border-gray-500'>
                    {
                        ratings.map((rating, index) => {
                            return <div key={rating._id}>
                                <CommentBox rating={rating} />
                                {index === ratings.length - 1 ? null : <hr className='dark:text-white' />}
                            </div>

                        })
                    }
                </div>
            </>}
        </div>
    )
}


export default NoteDetail
