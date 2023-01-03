/* eslint-disable import/prefer-default-export */
import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Invalid email"),
    password: yup.string().required("Password is required").trim(),
});

export const signUpSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required("Email is required"),
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Invalid email"),
    mobile_number: yup
        .string()
        .trim()
        .required("Mobile number is required")
        .max(10, "Maximum length is 10")
        .test("len", "Maximum length is 10", (val) => val?.length === 10),
    password: yup.string().required("Password is required").trim(),
    passwordConfirm: yup
        .string()
        .trim()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), null], "Both password should match")
        .required("Please type password again"),
});