import './style.css'
import { useFormik } from "formik";
import * as yup from 'yup';
import { useAddNoteMutation } from "../../../services/notes.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddNote = () => {
    const [addNote] = useAddNoteMutation();
    const navigate = useNavigate()
    const Formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            tag: '',
            isPublic: false
        },
        onSubmit: (values, actions) => {
            console.log(values);
            addNote(values).then(res => {
                if (res.data) {
                    toast.success("success Added", {
                        position: 'top-center',
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    })
                    actions.resetForm();
                    navigate('/notes', { replace: true })
                }
                if (res.error) {
                    toast.error(res.error.data.error, {
                        position: 'top-center',
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        validationSchema: yup.object({
            title: yup.string().required(),
            description: yup.string().required(),
            tag: yup.string().required(),
            isPublic: yup.boolean()
        })
    })


    return (
        <div className="shadow dark:text-white flex justify-center flex-col w-[40%] mx-auto border-2 rounded mt-10 pb-6">
            <h2 className="text-center dark:bg-black text-white text-2xl bg-green-500 p-4 rounded">Add a Note</h2>
            <form className='flex flex-col gap-2' onSubmit={Formik.handleSubmit}>
                <div className="flex flex-col w-[80%] mx-auto">
                    <label htmlFor="" className={'mb-1 font-bold'}>Title</label>
                    <input className={`p-2 border-2 rounded ${Formik.touched.title && Formik.errors.title ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('title')} required />
                    {Formik.touched.title && Formik.errors.title && <div className="text-uppercase text-[10px] mt-1 italic text-red-500">{Formik.errors.title}</div>}
                </div>
                <div className="flex flex-col w-[80%] mx-auto">
                    <label htmlFor="" className={'mb-1 font-bold'}>Description</label>
                    <textarea cols={4} rows={4} className={`p-2 border-2 rounded ${Formik.touched.description && Formik.errors.description ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('description')} required />
                    {Formik.touched.description && Formik.errors.description && <div className="text-uppercase text-[10px] mt-1 italic text-red-500">{Formik.errors.description}</div>}
                </div>
                <div className="flex flex-col w-[80%] mx-auto">
                    <label htmlFor="" className={'mb-1 font-bold'}>Tag</label>
                    <input className={`p-2 border-2 rounded ${Formik.touched.tag && Formik.errors.tag ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('tag')} required />
                    {Formik.touched.tag && Formik.errors.tag && <div className="text-uppercase text-[10px] mt-1 italic text-red-500">{Formik.errors.tag}</div>}
                </div>
                <div className="flex w-[80%] gap-2 mx-auto">
                    <input className={`bg-blue-800 p-2 w-4 border-2 rounded ${Formik.touched.isPublic && Formik.errors.isPublic ? 'border-red-500' : 'border-gray-400 '}`} type="checkbox" value={Formik.values.isPublic} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name={'isPublic'} />
                    <label htmlFor="" className={'mb-1 font-bold'}>isPublic</label>
                </div>

                <div className="flex flex-col w-[80%] mx-auto">
                    <input className={'w-full dark:bg-black p-2 rounded text-white bg-green-600'} type="submit" value="Add Note" />
                </div>
            </form>
        </div>
    )
}
