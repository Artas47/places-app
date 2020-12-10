import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Valid email is required"),
  password: yup.string().required("Password is required"),
});
