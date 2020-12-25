import React, { useState, useEffect, useContext } from "react";
import "./image-upload.css";
import * as Styled from "./image-upload.styles";
import { AuthContext } from "../../../context/auth-context";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setImgDiemensions } = useContext(AuthContext);

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
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      return;
    }
  };

  return (
    <Styled.ImageUpload>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {previewUrl && (
          <Styled.ImagePreview
            large={props.large}
            src={previewUrl}
            onLoad={({ target: img }) => {
              setImgDiemensions({
                height: img.naturalHeight,
                width: img.naturalWidth,
              });
            }}
            alt="Preview"
          />
        )}
      </div>
      <Styled.UploadButton
        large={props.large}
        style={{ display: file && "none" }}
      >
        <input
          ref={props.register}
          {...props}
          id={props.id}
          type="file"
          accept=".jpg,.png,.jpeg"
          className="choose"
          onChange={pickedHandler}
        />
        {props.buttonText}
        {props.large && (
          <Styled.UploadIcon style={{ width: "6rem", height: "6rem" }} />
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
    </Styled.ImageUpload>
  );
};

export default ImageUpload;
