import React, { useState, useEffect } from 'react'

import classes from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'

import { passwordValidate } from '../helper/validate'

import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Recovery() {
  const [OTP, setOTP] = useState()
  const navigate = useNavigate()
  const username = useSelector((state) => {
    return state.auth.username
  })
  const dispatch = useDispatch()
  useEffect(() => {
    generateOTP(username)
      .then((OTP) => {
        console.log(OTP)

        if (OTP) return toast.success('OTP has been send to your email')
        return toast.error('Prorblem while generating OTP')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [username])

  async function onSubmit(e) {
    e.preventDefault()
    try {
      let { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! check email again')
    }
  }
  // handler of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username)
    toast.promise(sendPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email</b>,
      error: <b> Could not send it </b>,
    })
    sendPromise.then((OTP) => {
      console.log(OTP)
    })
  }
  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={classes.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="desktop:text-4xl mobile:text-3xl font-bold font-Syne text-cyan-400">Recovery</h4>
            <span className="desktop:py-4 mobile:py-2 text-center text-slate-50 desktop:text-2xl mobile:text-1xl font-Syne">
              Enter OTP to recover password
            </span>
          </div>
          <form className="desktop:pt-10 mobile:pt-5" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center flex flex-col items-center ">
                <span className="py-4 desktop:text-lg mobile:text-sm  text-gray-500">
                  Enter 6 digit OTP sent to your email address
                </span>
                <input
                  type="text"
                  className={classes.textbox}
                  placeholder="OTP"
                  onChange={(e) => {
                    setOTP(e.target.value)
                  }}
                ></input>
              </div>

              <button className={classes.btn} type="submit">
                Recover
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className='text-slate-50'>
              Can't get OTP?
              <button className="text-red-500" onClick={resendOTP}>
                {' '}
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery
