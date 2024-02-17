import React, { useContext, useState } from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.scss"
import toast from 'react-hot-toast';
import axios from 'axios';
import { setCookie } from '../../../helper/cookies';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode"

function Login() {
    const { token, setUser, setToken, fetchBasketData, isLoginOpen, setIsLoginOpen, fetchWishlistData } = useContext(userContext);
    const navigate = useNavigate();

    const [changeForm, setChangeForm] = useState(true)



    // LOGIN
    const handleLogin = async (values) => {
        try {
            const res = await axios.post('http://localhost:7000/login', values)
            toast.success('Successfully Logined!')
            res.status === 200 && setToken(res.data)
            res.status === 200 && setCookie("token", res.data, "600h")
            const decoded = res.status === 200 && jwtDecode(res.data);
            setUser(decoded)
            setIsLoginOpen(!isLoginOpen)
            await fetchBasketData()
            await fetchWishlistData()
        } catch (error) {
            toast.error("Wrong Details")
        }
    }

    

    // REGİSTER
    const handleRegister = async (values) => {
        try {
            const res = await axios.post('http://localhost:7000/register', values)
            res.status === 200 && setToken(res.data)
            res.status === 200 && setCookie("token", res.data, "600h")
            const decoded = res.status === 200 && jwtDecode(res.data);
            setUser(decoded)
            setIsLoginOpen(!isLoginOpen)
            await fetchBasketData()
            await fetchWishlistData()
            toast.success('Successfully Registered!')
        } catch (error) {
            toast.error("Email already exist!! Please Try other Email")
        }
    }


    return (
        <div className='login-bg' >
            <div className="overLay" onClick={() => setIsLoginOpen(!isLoginOpen)}></div>
            <div className="login-form">
                {changeForm ? (
                    <>
                        <i onClick={() => setIsLoginOpen(!isLoginOpen)} className="fa-solid fa-xmark"></i>
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/LOGO.png?v=1613575279" alt="" />
                        <hr />
                        <h3>Great to have you back!</h3>
                        <Formik
                            initialValues={{ password: '', email: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .min(6, 'Too Short')
                                    .required('Required'),
                                password: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .min(8, 'Must be 8 characters or more')
                                    .required('Required')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleLogin(values)
                                resetForm()
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form
                            >
                                <label htmlFor="email">Email Address</label>
                                <Field name="email" type="email" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="password" />
                                </div>
                                <button type="submit">LOG IN</button>
                            </Form>
                        </Formik>
                        <p className='forgot'>Forgot your Password?</p>
                        <p className='account'>Don’t have an account? <span onClick={() => setChangeForm(!changeForm)} >Register now</span></p>
                    </>
                ) : (
                    <>
                        <i onClick={() => setIsLoginOpen(!isLoginOpen)} className="fa-solid fa-xmark"></i>
                        <h3>REGISTER</h3>
                        <Formik
                            initialValues={{ password: '', email: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .min(6, 'Too Short')
                                    .required('Required'),
                                password: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .min(8, 'Must be 8 characters or more')
                                    .required('Required')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleRegister(values)
                                resetForm()
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form
                            >
                                <label htmlFor="email">Email Address</label>
                                <Field name="email" type="email" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="password" />
                                </div>
                                <button type="submit">REGISTER</button>
                            </Form>
                        </Formik>
                        <p className='log' onClick={() => setChangeForm(true)}>Already a member? <span>Log in here.</span></p>

                    </>
                )}
            </div>
        </div>
    )
}

export default Login