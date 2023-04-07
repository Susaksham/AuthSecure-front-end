import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Username from './components/Username'
import Password from './components/Password'
import Register from './components/Register'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Reset from './components/Reset'
import PageNotFound from './components/PageNotFound'
import { Provider } from 'react-redux'
import store from './store/reducer'
/** auth middle ware */
import { AuthorizerUser, ProtectRoute } from './components/middleware/auth'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        {' '}
        <Password></Password>
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizerUser>
        {' '}
        <Profile></Profile>
      </AuthorizerUser>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/reset',
    element: <Reset></Reset>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
])
function App() {
  return (
    <main>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </main>
  )
}

export default App
