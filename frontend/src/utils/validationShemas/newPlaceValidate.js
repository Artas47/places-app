import * as yup from "yup";
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from "../imageValidator";

export const newPlaceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  address: yup.string().required("Address is required"),
  image: yup
    .mixed()
    .required("A file is required")
    .test("fileExistance", "A file is required", (value) => !!value[0])
    .test("fileFormat", "Unsupported Format", checkIfFilesAreCorrectType)
    .test("fileSize", "File too large", checkIfFilesAreTooBig),
});
