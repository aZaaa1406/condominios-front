"use client";

interface PDFViewerProps {
  url: string;
  titulo: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, titulo }) => {
  return (
    <div className="flex flex-col items-center justify-start h-screen p-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4 text-center drop-shadow-md">
        {titulo}
      </h1>
      <div className="w-full flex-1 overflow-hidden rounded-lg shadow-lg border border-gray-300">
        <embed
          src={url}
          type="application/pdf"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
