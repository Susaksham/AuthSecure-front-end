import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import classes from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hoooks'

import { verifyPassword } from '../helper/helper'
import { useSelector} from 'react-redux'
function Password() {
  const navigate = useNavigate()

  const username = useSelector((state) => {
    return state.auth.username
  })
  
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({ username, password: values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b> Login Successfully </b>,
        error: <b> Password Not Match </b>,
      })
      loginPromise.then((res) => {
        let { token } = res.data
        localStorage.setItem('token', token)
        navigate('/profile')
      })
    },
  })
  if (isLoading) {
    return <h1 className="text-2xl font-bold">isLoading</h1>
  }
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message} </h1>
  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={classes.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-4xl mobile:text-3xl font-bold font-Syne text-cyan-400">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="desktop:py-4 mobile:py-2   w-2/3 text-center text-slate-50 desktop:text-2xl mobile:text-1xl font-Syne ">
              Explore more by connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={classes.profile_img}
                alt="avatar"
              ></img>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                {...formik.getFieldProps('password')}
                className={classes.textbox}
                placeholder="Password"
              ></input>
              <button className={classes.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className='text-slate-50 mobile:text-1xl'>
                Forget Password{' '}? 
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password
