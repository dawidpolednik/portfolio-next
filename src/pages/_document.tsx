import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html lang={'pl'}>
        <Head />
        <body>
          <Main />
          <div id='portal' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
