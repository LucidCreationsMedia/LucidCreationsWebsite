import Head from 'next/head'
import React, { Fragment } from 'react'

const IndexPage = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Lucid Creations Media</title>
      </Head>
      <Fragment>
        <div>
          <span>
            Hello world!!
          </span>
        </div>
      </Fragment>
    </div>
  )
}

export default IndexPage;
