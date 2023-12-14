import { ReactNode } from 'react'
import '@styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { fontMono, fontSans } from '../shared/fonts/fonts'
import AxiosState from '@context/axios/AxiosState'
import DefaultLayout from '../shared/components/base/layouts/default'
import { ToastContainer, Zoom } from 'react-toastify'
import QuoteState from '@context/quotes/QuotesState'

export default function App ({ Component, pageProps }: AppProps) {
  const getLayout = pageProps.getLayout ?? ((page: ReactNode) => {
    return (
      <DefaultLayout>
        {page}
      </DefaultLayout>
    )
  })

  return (
    <NextUIProvider>
      <NextThemesProvider>
        <>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            transition={Zoom}
            hideProgressBar={true}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            theme={'colored'}
            limit={1}
          />
          <AxiosState>
            <QuoteState>
              {getLayout(<Component {...pageProps} />)}
            </QuoteState>
          </AxiosState>
        </>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily
}
