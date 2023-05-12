import NavbarComponent from '@/src/component/navbar'
import '@/styles/globals.css'
import { getSession,SessionProvider } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })
import { Inter } from 'next/font/google'

export default function App(props) {
  let { Component, pageProps: {session,...pageProps} } = props
  return (
    <SessionProvider>
      <main
        className={`flex min-h-screen bg-slate-300 flex-col items-center justify-between ${inter.className}`}
      >
        <NavbarComponent></NavbarComponent>
        <Component {...pageProps} session={session} />

      </main>
    </SessionProvider>

  )
}


App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const session = await getSession(ctx);

  pageProps = {
    ...pageProps,
    session
  }
  return {
    pageProps
  }
}