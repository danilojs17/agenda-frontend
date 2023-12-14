import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
        <div id='spinner-portal'/>
        <div id='modal-portal'/>
      </body>
    </Html>
  )
}
