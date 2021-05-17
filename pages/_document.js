import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx)
//     return { ...initialProps }
//   }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// _app.js 는 글로벌 css를 적용하거나
// 레이아웃을 잡음
// 모든 페이지에 적용 되어야 하는 내용은 여기에 사용해야 함.

// _document.js는 서버에서만 렌더링 되고, onclick같은 이벤트 핸들러는 작동하지 않음. css도 적용 안됨
// 스태틱한 html 태그가 들어간다?

// document에서 사용하는 Head와 app에서 사용하는 Head는 다름.
// <title> 같은 속성은 document에서 하면 안되고 _app에서 하거나 각 페이지에서 Head를 import 해서 사용해야 함.