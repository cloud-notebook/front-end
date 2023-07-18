import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import { useUpdateNoteMutation } from "../services/notes.service";


export default function Modal({ children, note, }) {
    console.log(note);
    const [openModal, setOpenModal] = useState(false);
    const [updateNote] = useUpdateNoteMutation();
    const Formik = useFormik({
        initialValues: {
            title: note.title,
            description: note.description,
            tag: note.tag,
            isPublic: note.isPublic
        },
        onSubmit: (values, actions) => {
            console.log({
                id: note._id,
                body: values
            });

            updateNote({
                id: note._id,
                body: values
            }).then(res => {
                if (res.data) {
                    console.log(res)
                    toast.success("success Updated", {
                        position: 'top-center',
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    })
                    actions.resetForm();
                    setOpenModal(false)
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
            isPublic: yup.boolean().required()
        })
    })

    function onOpen() {
        setOpenModal(true)
    }
    function onClose() {
        setOpenModal(false)
    }


    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <div className={`relative z-10 ${openModal ? 'block' : 'hidden'}`} >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto" >
                    <form onSubmit={Formik.handleSubmit}>
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4" >
                                    <div className="sm:flex sm:items-start">
                                        <div className={'flex gap-3 flex-col w-[80%] mx-auto'}>
                                            <h1 className="text-2xl font-bold text-center">Update Note</h1>
                                            <div className="flex flex-col w-[80%] mx-auto">
                                                <label htmlFor="" className={'mb-1 font-bold'}>Title</label>
                                                <input className={`p-2 border-2 rounded ${Formik.touched.title && Formik.errors.title ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('title')} required />

                                            </div>
                                            <div className="flex flex-col w-[80%] mx-auto">
                                                <label htmlFor="" className={'mb-1 font-bold'}>Description</label>
                                                <textarea cols={4} rows={4} className={`p-2 border-2 rounded ${Formik.touched.description && Formik.errors.description ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('description')} required />

                                            </div>
                                            <div className="flex flex-col w-[80%] mx-auto">
                                                <label htmlFor="" className={'mb-1 font-bold'}>Tag</label>
                                                <input className={`p-2 border-2 rounded ${Formik.touched.tag && Formik.errors.tag ? 'border-red-500' : 'border-gray-400 '}`} type="text" {...Formik.getFieldProps('tag')} required />
                                            </div>

                                            <div className="flex w-[80%] mt-1 gap-2 mx-auto">
                                                <input className={`bg-blue-800 p-2 w-4 border-2 rounded ${Formik.touched.isPublic && Formik.errors.isPublic ? 'border-red-500' : 'border-gray-400 '}`} type="checkbox" value={Formik.values.isPublic} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name={'isPublic'} checked={Formik.values.isPublic} />
                                                <label htmlFor="" className={'mb-1 font-bold'}>isPublic</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className=" mt-3 space-x-1 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" className="bg-green-600 px-2 rounded text-white mx-3">Update</button>
                                    <button type="button"
                                        className="inline-flex border-2 border-green-600 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
