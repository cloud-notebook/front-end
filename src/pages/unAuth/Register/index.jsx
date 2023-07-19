import { useFormik } from 'formik'
import './register.css'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../services/auth.service'
import { toast } from 'react-toastify'
import { login } from '../../../states/login.state'
import { setUser } from '../../../states/user.state'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function Register() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const dispatch = useDispatch();

    const [registerApi] = useRegisterMutation();

    const Formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: values => {
            registerApi(values).then(res => {
                if (res.data) {
                    toast.success(res.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    });
                    dispatch(login({ token: res.data.token, expiresAt: res.data.expiresAt }));
                    dispatch(setUser(res.data.user));
                    navigate('/', { replace: true })
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }
                if (res.error) {
                    toast.error(res.error.data.error, {
                        position: "top-center",
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    });
                }
            }).catch(err => {
                console.log(err)
            })
        },
        validationSchema: yup.object({
            name: yup.string().required('required'),
            username: yup.string().required('required'),
            email: yup.string().email('invalid email').required('required'),
            password: yup.string().required('required'),
            confirmPassword: yup.string().required('required').oneOf([yup.ref('password')], 'passwords do not match'),
        })
    })


    return (
        <section class="flex justify-center mt-5 border-none">
            <div class="form login dark:bg-black dark:text-white  flex justify-center items-center">
                <div class="form-content">
                    <header className='dark:text-white'>Register</header>
                    <form onSubmit={Formik.handleSubmit}>
                        <div class="field input-field">
                            <input
                                type="text"
                                placeholder="Enter Name "
                                class="input"
                                {...Formik.getFieldProps('name')}
                            />
                            {Formik.errors.name && Formik.touched.name && <p class="error">{Formik.errors.name}</p>}
                        </div>
                        <div class="field input-field">
                            <input
                                type="text"
                                placeholder="Enter Username "
                                class="input"
                                {...Formik.getFieldProps('username')}
                            />
                            {Formik.errors.username && Formik.touched.username && <p class="error">{Formik.errors.username}</p>}
                        </div>
                        <div class="field input-field">
                            <input
                                type="email"
                                placeholder="Enter Email "
                                class="input"
                                {...Formik.getFieldProps('email')}
                            />
                            {Formik.errors.email && Formik.touched.email && <p class="error">{Formik.errors.email}</p>}
                        </div>

                        <div class="field input-field">
                            <input
                                type={show ? 'text' : "password"}
                                placeholder="Enter Password"
                                {...Formik.getFieldProps('password')}
                            />
                            <i class="bx bx-hide eye-icon"></i>
                            {Formik.errors.password && Formik.touched.password && <p class="error">{Formik.errors.password}</p>}
                        </div>
                        <button type='button' onClick={() => setShow(!show)} style={{ marginTop: "5px" }}>{show ? 'hide' : 'show'}</button>
                        <div class="field input-field">
                            <input
                                type={show ? 'text' : "password"}
                                placeholder="Confirm Password"
                                {...Formik.getFieldProps('confirmPassword')}
                            />
                            <i class="bx bx-hide eye-icon"></i>
                            {Formik.errors.confirmPassword && Formik.touched.confirmPassword && <p class="error">{Formik.errors.confirmPassword}</p>}
                        </div>

                        <div class="field button-field">
                            <button type="submit">Register</button>
                        </div>
                    </form>

                    <div class="form-link">
                        <span class=" signup-link dark:text-white mt-2">
                            Have an account ?
                            <Link to={'/login'} className='text-blue-500' id="cursor">
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

