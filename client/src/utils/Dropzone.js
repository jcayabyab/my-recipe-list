import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Square = styled.div`
  padding: 90px 0px;
  border: 60px rgb(55, 63, 87) solid;
  border-radius: 10px;
  text-align: center;
  background-color: rgb(
    55,
    63,
    87,
    ${props => (props.isDragActive ? 0.1 : 0.0)}
  );
  transition: background-color 0.1s ease-out;
`;

const UploadIcon = styled.i`
  font-size: 100pt;
  color: rgb(55, 63, 87);
`;

const Dropzone = ({ uploadFile }) => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // TODO: fathom and fix this error
    uploadFile(acceptedFiles[0]);
    // eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Square {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      <UploadIcon className="fas fa-file-upload"></UploadIcon>
    </Square>
  );
};

export default Dropzone;
