import React from 'react'
import NextHead from 'next/head'

export const Head = () => {
  return (
    <NextHead>
      <title>Agenda</title>
      <meta key="title" content={'Agenda'} property="og:title" />
      <meta content={'to-do description'} property="og:description" />
      <meta content={'to-do description'} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  )
}
