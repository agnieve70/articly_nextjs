import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render(){
        return (
          <Html lang="en">
            <Head>
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous"
              />
              <link
                rel="stylesheet"
                href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
              />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                crossOrigin="anonymous"
                referrerpolicy="no-referrer"
              />
            </Head>
            <body>
              <Main />
              <NextScript />
              <div id="notifications"></div>
            </body>
          </Html>
        );
    };
}

export default MyDocument;