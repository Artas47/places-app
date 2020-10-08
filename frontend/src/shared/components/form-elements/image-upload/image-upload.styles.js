import styled, { css } from "styled-components";
import BackupIcon from "@material-ui/icons/Backup";
import ClearIcon from "@material-ui/icons/Clear";

export const ImageUpload = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ImagePreview = styled.img`
  ${(props) =>
    props.large
      ? css`
          border-radius: 0;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid #d1d1d1;
        `
      : css`
          min-width: 15rem;
          min-height: 15rem;
          max-width: 15rem;
          max-height: 15rem;
          border-radius: 50%;
        `}
`;

export const UploadButton = styled.label`
  color: white;
  display: inline-block;
  background-color: #51519e;
  border: none;
  text-align: center;
  width: 100%;
  padding: 7px 15px;
  margin: 0 auto;
  font-weight: 700;
  border-radius: 3px;
  /* white-space: nowrap; */
  cursor: pointer;
  font-size: 10pt;
  transition: all 0.2s;
  position: relative;
  ${(props) =>
    props.large &&
    css`
      display: flex;
      flex-direction: column;
      font-size: 2rem;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.25);
      height: 40rem;
    `};
`;

export const UploadIcon = styled(BackupIcon)``;

export const Clear = styled(ClearIcon)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;
