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
    .required("An image is required")
    .test("fileExistance", "An image is required", (value) => !!value[0])
    .test("fileFormat", "Unsupported Format", checkIfFilesAreCorrectType)
    .test("fileSize", "File too large", checkIfFilesAreTooBig),
});
