import React, { useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import classes from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/helper'

import useFetch from '../hooks/fetch.hoooks'
import { useSelector, useDispatch } from 'react-redux'
function Reset() {
  const navigate = useNavigate()
  const [{ isLoading, apiData, status, serverError }] = useFetch(
    '/createResetSession',
  )

  const username = useSelector((state) => {
    return state.auth.username
  })
  const dispatch = useDispatch()
 
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      let resetPromise = resetPassword({ username, password: values.password })
      toast.promise(resetPromise, {
        loading: 'Updating',
        success: <b> Reset Successfully...! </b>,
        error: <b> Could not Reset! </b>,
      })
      resetPromise.then(() => {
        navigate('/password')
      })
    },
  })
  if (isLoading) {
    return <h1 className="text-2xl font-bold">isLoading</h1>
  }
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message} </h1>

  if (status && status !== 201) {
    return <Navigate to={'/password'} replace={true}></Navigate>
  }
  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={classes.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-4xl mobile:text-3xl font-bold font-Syne text-cyan-400 ">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>
          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                {...formik.getFieldProps('password')}
                className={classes.textbox}
                placeholder="New Password"
              ></input>
              <input
                type="password"
                {...formik.getFieldProps('confirm_pwd')}
                className={classes.textbox}
                placeholder="Repeat Password"
              ></input>
              <button className={classes.btn} type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset
