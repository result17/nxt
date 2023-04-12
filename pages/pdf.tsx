import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";

import type { PDFDocumentProxy } from ".pnpm/pdfjs-dist@2.16.105/node_modules/pdfjs-dist/types/src/display/api";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFPATH =
  "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

export default function ReactPdf() {
  const [numPages, setNumPages] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(document.body.clientWidth);
  }, []);

  const onLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  return (
    <main className="min-h-screen">
      <Document file={PDFPATH} onLoadSuccess={onLoadSuccess}>
        {[...Array(numPages).keys()].map((k) => (
          <Page key={k} pageNumber={k + 1} width={screenWidth} />
        ))}
      </Document>
    </main>
  );
}
