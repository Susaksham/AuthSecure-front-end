import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log(process.env.REACT_APP_SERVER_DOMAIN)
// axios.defaults.baseURL = 'http://localhost:8080'

/* Make Api requests */

/** authenticate function */

/* To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem('token')
  if (!token) return Promise.reject('Cannot find the Token')
  let decode = jwt_decode(token)
  return decode
}

export async function authenticate(username) {
  try {
    return await axios.post('/api/authenticate', {
      username,
    })
  } catch (error) {
    return { error: "Username doesn't exist...!" }
  }
}

/** get User details */
export async function getUser(username) {
  try {
    const { data } = await axios.get(`/api/user/${username}`)

    return data
  } catch (error) {
    return { error: 'Password does not match' }
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials)
    let { username, email } = credentials
    /* send mail */
    if (status === 201) {
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text: msg,
      })
    }
    return Promise.resolve(msg)
  } catch (error) {
    return Promise.reject({ error })
  }
}

/**login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password })
      return Promise.resolve({ data })
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match" })
  }
}

/* update user function */

export async function updateUser(response) {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const data = await axios.put('/api/updateuser', response, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    return Promise.resolve({ data })
  } catch (error) {
    return Promise.reject({ error: "Couldn't update Profile...! " })
  }
}

/* generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`/api/generateOTP?username=${username}`)

    // send mail with the OTP
    if (status === 201) {
      let data = await getUser(username)
      const email = data.email

      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`

      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP',
      })
    }
    return Promise.resolve(code)
  } catch (error) {
    return Promise.reject({ error })
  }
}

/* verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', {
      params: { username, code },
    })
    return { data, status }
  } catch (error) {
    return Promise.reject(error)
  }
}

/* reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', {
      username,
      password,
    })
    return Promise.resolve({ data, status })
  } catch (err) {}
}
