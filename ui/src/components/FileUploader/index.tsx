import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Thumb } from '../Thumb';

export interface FileWithPreview extends File {
  preview: string;
}

export const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps()} className="flex flex-col items-center rounded-sm border-2 border-dashed bg-gray-100 p-5 border-gray-300">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className="flex mt-4">
        {files.map(file => <Thumb file={file} key={file.name} />)}
      </aside>
    </section>
  );
}
