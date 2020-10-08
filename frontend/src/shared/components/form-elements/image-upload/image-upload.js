import React, { useState, useEffect } from "react";
import "./image-upload.css";
import * as Styled from "./image-upload.styles";
import ClearIcon from "@material-ui/icons/Clear";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  console.log("file", file);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      return;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };
  console.log("file", file);
  return (
    <Styled.ImageUpload>
      <div style={{ width: "100%" }}>
        {previewUrl && (
          <Styled.ImagePreview
            // style={{ width: "100%", height: "100%", margin: "2rem 0" }}Z
            large={props.large}
            src={previewUrl}
            alt="Preview"
          />
        )}
      </div>
      <Styled.UploadButton
        large={props.large}
        style={{ display: file && "none" }}
      >
        <input
          // ref={inputRef}
          ref={props.register}
          {...props}
          id={props.id}
          // style={{ display: 'none' }}
          type="file"
          accept=".jpg,.png,.jpeg"
          className="choose"
          // onClick={pickImageHandler}
          onChange={pickedHandler}
        />
        {props.buttonText}
        {props.large && (
          <>
            <Styled.UploadIcon style={{ width: "6rem", height: "6rem" }} />
          </>
        )}
      </Styled.UploadButton>
      {file && (
        <Styled.Clear
          onClick={() => {
            setFile(null);
            setPreviewUrl(null);
          }}
          style={{ width: "3rem", height: "3rem" }}
        />
      )}
      <div>
        {/* <button stype='button' onClick={pickImageHandler}>
          Pick image
        </button> */}
      </div>
      {/* {!isValid && 'error kurwaa'} */}
    </Styled.ImageUpload>
  );
};

export default ImageUpload;
