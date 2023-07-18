import { useFormik } from 'formik';
import './style.css'
import { usePostRatingMutation } from '../../services/rating.service';
import { toast } from 'react-toastify';

const Rating = ({ noteId }) => {

    const [postRating] = usePostRatingMutation();

    const Formik = useFormik({
        initialValues: {
            rating: [false, false, false, false, false],
            comment: '',
            rate: ''
        },
        onSubmit: (values, action) => {
            const body = {
                noteId,
                star: parseInt(values.rate),
                comment: values.comment,
            }
            console.log(body);
            postRating(body).then(res => {
                if (res.data) {
                    toast.success("success Rate the Note", {
                        autoClose: 5000,
                        position: 'top-center',
                        progress: undefined,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    })
                    action.resetForm();
                }
                if (res.error) {
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
    })
    return (
        <>
            <div className="container dark:bg-slate-800 dark:text-white">
                <form onSubmit={Formik.handleSubmit}>
                    <h2 className="text-center">Rate This Note</h2>
                    <div className="rate ">
                        {
                            Formik.values.rating.map((item, index) => {
                                return <>
                                    <input type="radio" {...Formik.getFieldProps(`rating[${index}]`)} id={`star${5 - index}`} name="rate" value={5 - index} />
                                    <label htmlFor={`star${5 - index}`} title="text">{5 - index} stars</label>
                                </>
                            })
                        }
                    </div>
                    <textarea {...Formik.getFieldProps('comment')} className='border dark:text-black border-gray-500 px-4 py-3' cols="40" rows="5" placeholder="Enter Your feedback here ..."></textarea>
                    <button className="btn-submit" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Rating;
