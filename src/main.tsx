import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import {Home} from './pages/Home.tsx'
import LoginPage from './pages/Login.tsx'
import SignupPage from './pages/Signup.tsx'
import UploadPage from './pages/Upload.tsx'
import Verify from './pages/Verify.tsx'
import {store} from './store/store.ts'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/verify',
        element: <Verify />
      },
      {
        path: '/upload',
        element: <UploadPage />
      }
    ]
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
