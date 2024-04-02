/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useState } from "react";

// regex
const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const useAuthFormValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }
    if (!EMAIL_REGEX.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    }
    if (!PWD_REGEX.test(password)) {
      return "Password must contain at least 8 characters, including uppercase, lowercase, and special characters";
    }
    return "";
  };

  const validateMatchPassword = (password: string, matchPassword: string) => {
    if (password !== matchPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateForm = (user: string, pwd: string, matchPwd: string) => {
    const errors: { [key: string]: string } = {};

    const emailError = validateEmail(user);
    if (emailError) {
      errors.user = emailError;
    }

    const passwordError = validatePassword(pwd);
    if (passwordError) {
      errors.pwd = passwordError;
    }

    const matchPasswordError = validateMatchPassword(pwd, matchPwd);
    if (matchPasswordError) {
      errors.matchPwd = matchPasswordError;
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return { errors, validateForm };
};
