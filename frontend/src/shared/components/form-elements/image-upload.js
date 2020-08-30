import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef();

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

  const pickImageHandler = () => {
    inputRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    console.log('e.target.', e.target.files);
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
    console.log('e.target.', e.target);
  };

  return (
    <div>
      <input
        // ref={inputRef}
        ref={props.register}
        {...props}
        id={props.id}
        // style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div>
        <div>
          {previewUrl ? (
            <img src={previewUrl} alt='Preview' />
          ) : (
            'Please pick an image'
          )}
        </div>
        {/* <button stype='button' onClick={pickImageHandler}>
          Pick image
        </button> */}
      </div>
      {!isValid && 'error kurwaa'}
    </div>
  );
};

export default ImageUpload;
