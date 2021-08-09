import Document, { Html, Main, NextScript, Head } from 'next/document'
import Footer from '../components/layout/Footer'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="The new and improved Lucid Creations Media website." />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/logo/favicon/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Footer />
      </Html>
    )
  }
}

export default MyDocument