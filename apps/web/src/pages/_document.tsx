import { ThemeProvider, lightTheme } from '@zoralabs/zord'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/pt-root-ui_bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/pt-root-ui_medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/pt-root-ui_regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <ThemeProvider as="body" theme={lightTheme} m="x0">
          <Main />
          <NextScript />
        </ThemeProvider>
      </Html>
    )
  }
}
