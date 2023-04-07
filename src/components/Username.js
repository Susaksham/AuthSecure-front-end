import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import classes from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'

import { useDispatch, useSelector } from 'react-redux'
import {reducerAction} from '../store/store'

function Username() {
  const navigate = useNavigate()
  const username = useSelector((state) => {
    return state.auth.username
  })
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(reducerAction.setUsername(`${values.username}`))
      console.log(values)
      navigate('/password')
    },
  })
  return (
    <div className="container  mx-auto font-bebas ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
      
      
        <div className={classes.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-5xl mobile:text-3xl font-bold font-Syne text-cyan-400">Hello Again</h4>
            <span className="desktop:py-4 mobile:py-2 desktop:text-xl mobile:text-sm w-2/3 text-center text-slate-50 font-Syne">
              Explore more by connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={avatar}
                className={classes.profile_img}
                alt="avatar"
              ></img>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                {...formik.getFieldProps('username')}
                className={classes.textbox}
                placeholder="Username"
              ></input>
              <button className={classes.btn} type="submit">
                Let's go
              </button>
            </div>
            <div className="text-center py-4">
              <span className='text-slate-50'>
                Not a Member?{' '}
                <Link className="text-red-500" to="/register">
                  Register now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Username
