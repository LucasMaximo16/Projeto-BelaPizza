import '../../styles/global.sass'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '../contexts/userContext/userContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </UserProvider>
  
  )
}
