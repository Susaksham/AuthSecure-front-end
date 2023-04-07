import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import classes from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidation } from '../helper/validate'
import { useState } from 'react'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'
function Register() {
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues: {
      email: 'mail@cnogs.com',
      username: 'example123',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' })
      let registerPromise = registerUser(values)

      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfull...! </b>,
        error: <b>Could not Register </b>,
      })
      registerPromise.then(() => {
        navigate('/')
      })
    },
  })

  /*formik doesnot support file upload so we need to create this handler */

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className={classes.glass} style={{height:'95vh', paddingTop:'3rem'}} >
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-5xl mobile:text-3xl font-bold font-Syne text-cyan-400">Register</h4>
            <span className="desktop:py-4 mobile:py-2 desktop:text-xl mobile:text-sm w-2/3 text-center text-slate-50 font-Syne">
              Happy to join you!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={classes.profile_img}
                  alt="avatar"
                ></img>
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              ></input>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                {...formik.getFieldProps('email')}
                className={classes.textbox}
                placeholder="Email*"
              ></input>
              <input
                type="text"
                {...formik.getFieldProps('username')}
                className={classes.textbox}
                placeholder="Username*"
              ></input>
              <input
                type="text"
                {...formik.getFieldProps('password')}
                className={classes.textbox}
                placeholder="Password*"
              ></input>
              <button className={classes.btn} type="submit">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className='text-slate-50'>
                Already Register?{' '}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
