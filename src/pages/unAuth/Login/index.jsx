import { useFormik } from 'formik'
import * as yup from 'yup'
import './login.css'
import { useLoginMutation } from '../../../services/auth.service'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { login } from '../../../states/login.state'
import { setUser } from '../../../states/user.state'
import { Link, useNavigate, redirect } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [loginApi] = useLoginMutation();

    const Formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            loginApi(values).then(res => {
                if (res.data) {
                    console.log(res.data)
                    toast.success(res.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        progress: undefined,
                        closeOnClick: true,
                        closeButton: true
                    });
                    dispatch(login({ token: res.data.token, expiresAt: res.data.expiresAt }));
                    dispatch(setUser(res.data.user));
                    navigate('/')

                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }
                if (res.error) {
                    console.log(res.error)
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
            email: yup.string().email('Invalid email address').required('Required'),
            password: yup.string().required('Required')
        })
    })


    return (
        <section className="container_login forms">
            <div className="form login dark:bg-black dark:text-white">
                <div className="form-content">
                    <header className='dark:text-white'>Login</header>
                    <form onSubmit={Formik.handleSubmit}>
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="Email"
                                className="Input"
                                {...Formik.getFieldProps('email')}
                            />
                        </div>
                        {Formik.touched.email && Formik.errors.email && <p className="error">{Formik.errors.email}</p>}
                        <div className="field input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                {...Formik.getFieldProps('password')}
                                className="password"
                            />
                            <i className="bx bx-hide eye-icon"></i>
                            {Formik.touched.password && Formik.errors.password && <p className="error">{Formik.errors.password}</p>}
                        </div>
                        <div className="field button-field">
                            <button type="submit">Login</button>
                        </div>
                    </form>

                    <div className="form-link">
                        <span className=" signup-link dark:text-white">
                            Don't have an account?
                            <Link to={'/register'} className="dark_login">
                                SignUp
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
