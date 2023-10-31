import React, { useEffect, useState } from 'react';
import { FileWithPreview } from '../FileUploader';

interface ThumbProps {
  file: FileWithPreview;
}

export const Thumb: React.FC<ThumbProps> = ({ file }: ThumbProps) => {
  const [parsing, setParsing] = useState(false);
  const [isCat, setIsCat] = useState(undefined);
  useEffect(() => {
    const parseImage = async () => {
      const formData = new FormData();
      formData.append("img", file);
      try {
        setParsing(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/isthiscat`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        setParsing(false);
        console.log("Success:", result);
        setIsCat(result.isCat);
      } catch (error) {
        setParsing(false);
        console.error("Error:", error);
      }
    }
    parseImage();
  }, [file]);

  return (
    <div
      className="inline-flex mr-2 mb-2 w-48 h-48 p-1 border relative"
      key={file.name}
    >
      {parsing ? (
        <div className="absolute left-0 top-0 w-full h-full bg-black/30 flex justify-center items-center text-white font-bold">
          Parsing...
        </div>
      ) : null}
      {!parsing && isCat === false ? (
        <div className="absolute left-0 top-0 w-full h-full bg-black/30 flex justify-center items-center text-rose-500 font-bold">
          This is not cat.
        </div>
      ) : null}
      {!parsing && isCat === true ? (
        <div className="absolute left-0 top-0 w-full h-full bg-black/30 flex justify-center items-center text-green-500 font-bold">
          This is cat.
        </div>
      ) : null}

      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full object-contain"
          alt={`preview ${file.name}`}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  );
}