import { useState } from "react";

export const useLoginFormValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const validateForm = (user: string, pwd: string) => {
    const errors: { [key: string]: string } = {};

    const emailError = validateEmail(user);
    if (emailError) {
      errors.email = emailError;
    }

    const passwordError = validatePassword(pwd);
    if (passwordError) {
      errors.password = passwordError;
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return { errors, validateForm };
};
