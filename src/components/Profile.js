import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import classes from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../helper/validate'
import { useState } from 'react'
import convertToBase64 from '../helper/convert'
import extend from '../styles/Profile.module.css'
import useFetch from '../hooks/fetch.hoooks'

import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [file, setFile] = useState()
  const navigate = useNavigate()

  const [{ isLoading, apiData, serverError }] = useFetch()
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,

    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || '',
      })
      let updatePromise = updateUser(values)
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b> Update Successfully... </b>,
        error: <b> Could not Update! </b>,
      })
      console.log(values)
    },
  })

  /*formik doesnot support file upload so we need to create this handler */

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }

  //logout handler function
  function userLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) {
    return <h1 className="text-2xl font-bold">isLoading</h1>
  }
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message} </h1>
  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div
          className={`${classes.glass} ${extend.glass} `}
          
        >
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-4xl mobile:text-3xl font-bold font-Syne text-cyan-400">Profile</h4>
            <span className="desktop:py-4 mobile:py-2 text-center text-slate-50 desktop:text-2xl mobile:text-1xl font-Syne">
              You can update the details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${classes.profile_img} ${extend.profile_img}`}
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
              <div className="name  flex w-3/4 desktop:gap-10 mobile:gap-3">
                <input
                  type="text"
                  {...formik.getFieldProps('firstName')}
                  className={`${classes.textbox} ${extend.textbox}`}
                  placeholder="firstName*"
                ></input>
                <input
                  type="text"
                  {...formik.getFieldProps('lastName')}
                  className={`${classes.textbox} ${extend.textbox}`}
                  placeholder="lastName"
                ></input>
              </div>
              <div className="name  flex w-3/4  desktop:gap-10 mobile:gap-3">
                <input
                  type="text"
                  {...formik.getFieldProps('mobile')}
                  className={`${classes.textbox} ${extend.textbox}`}
                  placeholder="Mobile No."
                ></input>
                <input
                  type="text"
                  {...formik.getFieldProps('email')}
                  className={`${classes.textbox} ${extend.textbox}`}
                  placeholder="Email*"
                ></input>
              </div>

              <input
                type="text"
                {...formik.getFieldProps('address')}
                className={`${classes.textbox} ${extend.textbox}`}
                placeholder="Address"
              ></input>
              <button className={classes.btn} type="submit">
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-slate-50">
                come back later?{' '}
                <Link onClick={userLogout} className="text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
